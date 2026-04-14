console.log('ClassCharts Improver: Service Worker loaded.');

const SUPABASE_URL = 'https://izcixahquohigrzghyqv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_a7GOW5zpj5YQp-nXJ6KyQA_NGkNyWFh';
const SESSION_STORAGE_KEY = 'cc_improver_supabase_session_v1';
const PKCE_VERIFIER_KEY = 'cc_improver_supabase_pkce_verifier_v1';

function base64UrlEncode(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  return await crypto.subtle.digest('SHA-256', data);
}

function randomString(len = 64) {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ('0' + b.toString(16)).slice(-2)).join('');
}

async function storageGet(key) {
  return await new Promise((resolve) => chrome.storage.local.get([key], resolve));
}

async function storageSet(obj) {
  return await new Promise((resolve) => chrome.storage.local.set(obj, resolve));
}

async function storageRemove(key) {
  return await new Promise((resolve) => chrome.storage.local.remove([key], resolve));
}

async function getSession() {
  const res = await storageGet(SESSION_STORAGE_KEY);
  return res[SESSION_STORAGE_KEY] || null;
}

async function setSession(session) {
  await storageSet({ [SESSION_STORAGE_KEY]: session });
}

async function clearSession() {
  await storageRemove(SESSION_STORAGE_KEY);
}

async function supabaseFetch(path, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('apikey', SUPABASE_ANON_KEY);
  headers.set('Content-Type', headers.get('Content-Type') || 'application/json');
  return await fetch(`${SUPABASE_URL}${path}`, { ...init, headers });
}

async function exchangeCodeForSession(code, codeVerifier, redirectTo) {
  const resp = await supabaseFetch(`/auth/v1/token?grant_type=pkce`, {
    method: 'POST',
    body: JSON.stringify({
      auth_code: code,
      code_verifier: codeVerifier,
      redirect_to: redirectTo,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Token exchange failed: ${resp.status} ${text}`);
  }

  const data = await resp.json();
  await setSession(data);
  return data;
}

async function refreshSession(refreshToken) {
  const resp = await supabaseFetch(`/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Refresh failed: ${resp.status} ${text}`);
  }
  const data = await resp.json();
  await setSession(data);
  return data;
}

async function signInWithOAuthGithub() {
  const redirectTo = chrome.identity.getRedirectURL('supabase');
  const codeVerifier = randomString(64);
  const codeChallenge = base64UrlEncode(await sha256(codeVerifier));

  await storageSet({ [PKCE_VERIFIER_KEY]: { codeVerifier, redirectTo, createdAt: Date.now() } });

  const authUrl = new URL(`${SUPABASE_URL}/auth/v1/authorize`);
  authUrl.searchParams.set('provider', 'github');
  authUrl.searchParams.set('redirect_to', redirectTo);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  const redirectUri = await new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      { url: authUrl.toString(), interactive: true },
      (responseUrl) => {
        if (chrome.runtime.lastError) return reject(new Error(chrome.runtime.lastError.message));
        resolve(responseUrl);
      }
    );
  });

  const returned = new URL(redirectUri);
  const code = returned.searchParams.get('code');
  if (!code) throw new Error('Missing auth code in redirect URL');

  const pkce = (await storageGet(PKCE_VERIFIER_KEY))[PKCE_VERIFIER_KEY];
  if (!pkce?.codeVerifier) throw new Error('Missing PKCE verifier');

  const session = await exchangeCodeForSession(code, pkce.codeVerifier, pkce.redirectTo);
  await storageRemove(PKCE_VERIFIER_KEY);
  return session;
}

async function signInWithJamesAuth(jamesAuthId, email) {
  // Generate a simple password for James Auth user
  const jamesAuthPassword = `james_auth_${jamesAuthId}`;
  
  try {
    // First try to sign in
    const signInResp = await supabaseFetch(`/auth/v1/token?grant_type=password`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: jamesAuthPassword
      }),
    });
    
    if (signInResp.ok) {
      const signInData = await signInResp.json();
      await setSession(signInData);
      return { session: signInData };
    }
    
    // If sign in fails, create new account
    const signUpResp = await supabaseFetch(`/auth/v1/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: jamesAuthPassword
      }),
    });
    
    if (!signUpResp.ok) {
      const text = await signUpResp.text();
      throw new Error(`James Auth account creation failed: ${signUpResp.status} ${text}`);
    }
    
    const signUpData = await signUpResp.json();
    if (signUpData?.access_token) {
      await setSession(signUpData);
      return { session: signUpData };
    }
    
    // Try sign in after account creation
    const retrySignInResp = await supabaseFetch(`/auth/v1/token?grant_type=password`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: jamesAuthPassword
      }),
    });
    
    if (!retrySignInResp.ok) {
      const text = await retrySignInResp.text();
      throw new Error(`James Auth sign in failed: ${retrySignInResp.status} ${text}`);
    }
    
    const retrySignInData = await retrySignInResp.json();
    await setSession(retrySignInData);
    return { session: retrySignInData };
    
  } catch (error) {
    throw new Error(`James Auth integration failed: ${error.message}`);
  }
}

async function signInWithOAuthGoogle() {
  const redirectTo = chrome.identity.getRedirectURL('supabase');
  const codeVerifier = randomString(64);
  const codeChallenge = base64UrlEncode(await sha256(codeVerifier));

  await storageSet({ [PKCE_VERIFIER_KEY]: { codeVerifier, redirectTo, createdAt: Date.now() } });

  const authUrl = new URL(`${SUPABASE_URL}/auth/v1/authorize`);
  authUrl.searchParams.set('provider', 'google');
  authUrl.searchParams.set('redirect_to', redirectTo);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  const redirectUri = await new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      { url: authUrl.toString(), interactive: true },
      (responseUrl) => {
        if (chrome.runtime.lastError) return reject(new Error(chrome.runtime.lastError.message));
        resolve(responseUrl);
      }
    );
  });

  const returned = new URL(redirectUri);
  const code = returned.searchParams.get('code');
  if (!code) throw new Error('Missing auth code in redirect URL');

  const pkce = (await storageGet(PKCE_VERIFIER_KEY))[PKCE_VERIFIER_KEY];
  if (!pkce?.codeVerifier) throw new Error('Missing PKCE verifier');

  const session = await exchangeCodeForSession(code, pkce.codeVerifier, pkce.redirectTo);
  await storageRemove(PKCE_VERIFIER_KEY);
  return session;
}

async function sendMagicLink(email) {
  const redirectTo = chrome.identity.getRedirectURL('supabase');
  const codeVerifier = randomString(64);
  const codeChallenge = base64UrlEncode(await sha256(codeVerifier));

  await storageSet({ [PKCE_VERIFIER_KEY]: { codeVerifier, redirectTo, createdAt: Date.now() } });

  const resp = await supabaseFetch(`/auth/v1/otp`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      create_user: true,
      redirect_to: redirectTo,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`OTP request failed: ${resp.status} ${text}`);
  }

  return { ok: true };
}

async function signInWithPassword(email, password) {
  const resp = await supabaseFetch(`/auth/v1/token?grant_type=password`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Password sign-in failed: ${resp.status} ${text}`);
  }
  const data = await resp.json();
  await setSession(data);
  return data;
}

async function signUpWithPassword(email, password) {
  const resp = await supabaseFetch(`/auth/v1/signup`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Sign-up failed: ${resp.status} ${text}`);
  }
  const data = await resp.json();
  // If email confirmations are enabled, session may be null until confirmed.
  if (data?.access_token) await setSession(data);
  return data;
}

async function completeMagicLinkFromRedirect(redirectUrl) {
  const returned = new URL(redirectUrl);
  const code = returned.searchParams.get('code');
  if (!code) throw new Error('Missing auth code in redirect URL');

  const pkce = (await storageGet(PKCE_VERIFIER_KEY))[PKCE_VERIFIER_KEY];
  if (!pkce?.codeVerifier) throw new Error('Missing PKCE verifier');

  const session = await exchangeCodeForSession(code, pkce.codeVerifier, pkce.redirectTo);
  await storageRemove(PKCE_VERIFIER_KEY);
  return session;
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    switch (message?.type) {
      case 'SUPABASE_GET_SESSION': {
        sendResponse({ session: await getSession() });
        return;
      }
      case 'SUPABASE_SIGN_OUT': {
        await clearSession();
        sendResponse({ ok: true });
        return;
      }
      case 'SUPABASE_REFRESH': {
        const session = await getSession();
        if (!session?.refresh_token) throw new Error('No refresh token');
        sendResponse({ session: await refreshSession(session.refresh_token) });
        return;
      }
      case 'SUPABASE_SIGN_IN_GITHUB': {
        sendResponse({ session: await signInWithOAuthGithub() });
        return;
      }
      case 'SUPABASE_SIGN_IN_GOOGLE': {
        sendResponse({ session: await signInWithOAuthGoogle() });
        return;
      }
      case 'SUPABASE_SIGN_IN_JAMES_AUTH': {
        const { jamesAuthId, email } = message;
        if (!jamesAuthId || !email) {
          throw new Error('James Auth ID and email required');
        }
        
        const result = await signInWithJamesAuth(jamesAuthId, email);
        
        // Store JAMES_AUTH_ID in user_settings table after successful authentication
        if (result.session?.access_token) {
          try {
            await supabaseFetch(`/rest/v1/user_settings`, {
              method: 'POST',
              headers: {
                apikey: 'sb_publishable_a7GOW5zpj5YQp-nXJ6KyQA_NGkNyWFh',
                Authorization: `Bearer ${result.session.access_token}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify({
                user_id: result.session.user.id,
                james_auth_id: jamesAuthId,
                updated_at: new Date().toISOString()
              })
            });
          } catch (error) {
            console.warn('Failed to store JAMES_AUTH_ID:', error);
          }
        }
        
        sendResponse(result);
        return;
      }
      case 'SUPABASE_RESET_PASSWORD': {
        const redirectTo = chrome.identity.getRedirectURL('supabase');
        const resp = await supabaseFetch(`/auth/v1/recover`, {
          method: 'POST',
          body: JSON.stringify({ 
            email: message.email,
            gotrue_meta_security: {
              redirect_to: redirectTo
            }
          }),
        });
        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(`Password reset failed: ${resp.status} ${text}`);
        }
        sendResponse({ ok: true });
        return;
      }
      case 'SUPABASE_DELETE_ACCOUNT': {
        const session = await getSession();
        
        // Try to get James Auth data if no Supabase session
        let jamesAuthData = null;
        if (!session?.access_token) {
            const storageRes = await storageGet('classcharts_improver_james_auth_user');
            jamesAuthData = storageRes.classcharts_improver_james_auth_user;
        }
        
        // Check if authenticated via James Auth or has Supabase session
        if (!session?.access_token && (!jamesAuthData || !jamesAuthData.isAuthenticated)) {
            throw new Error('Not authenticated');
        }
        
        // Use James Auth token if available, otherwise use Supabase session
        const authToken = jamesAuthData?.token || session.access_token;
        
        const resp = await supabaseFetch(`/auth/v1/user`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(`Account deletion failed: ${resp.status} ${text}`);
        }
        await clearSession();
        sendResponse({ ok: true });
        return;
      }
      case 'SUPABASE_SIGN_IN_PASSWORD': {
        sendResponse({ session: await signInWithPassword(message.email, message.password) });
        return;
      }
      case 'SUPABASE_SIGN_IN_WITH_TOKEN': {
        const session = await getSession();
        if (session?.access_token) {
          // Already signed in, return current session
          sendResponse({ session });
          return;
        }
        
        if (!message.email) {
          throw new Error('No email provided for authentication');
        }
        
        // For James Auth integration, use password reset approach for existing users
        const jamesAuthPassword = `james_auth_${message.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
        
        try {
          // First try to sign in with our standard password
          const signInResp = await supabaseFetch(`/auth/v1/token?grant_type=password`, {
            method: 'POST',
            body: JSON.stringify({
              email: message.email,
              password: jamesAuthPassword
            }),
          });
          
          if (signInResp.ok) {
            // Sign in successful
            const signInData = await signInResp.json();
            await setSession(signInData);
            sendResponse({ session: signInData });
            return;
          }
          
          // If sign in fails, user might exist with different password
          const signInErrorText = await signInResp.text();
          const signInError = JSON.parse(signInErrorText);
          
          if (signInError?.error_code === 'invalid_credentials') {
            // Send password reset email to user
            const resetResp = await supabaseFetch(`/auth/v1/recover`, {
              method: 'POST',
              body: JSON.stringify({
                email: message.email,
                gotrue_meta_security: {
                  redirect_to: chrome.identity.getRedirectURL('supabase')
                }
              }),
            });
            
            if (resetResp.ok) {
              throw new Error(`James Auth account exists but password mismatch. A password reset email has been sent. Please check your email and try again.`);
            } else {
              const resetErrorText = await resetResp.text();
              throw new Error(`James Auth account exists but password mismatch. Failed to send reset email: ${resetResp.status} ${resetErrorText}`);
            }
          }
          
          const signInErrorTextRaw = await signInResp.text();
          throw new Error(`James Auth sign in failed: ${signInResp.status} ${signInErrorTextRaw}`);
          
        } catch (error) {
          throw new Error(`James Auth integration failed: ${error.message}`);
        }
      }
      case 'SUPABASE_SEND_MAGIC_LINK': {
        sendResponse(await sendMagicLink(message.email));
        return;
      }
      case 'SUPABASE_COMPLETE_MAGIC_LINK': {
        sendResponse({ session: await completeMagicLinkFromRedirect(message.redirectUrl) });
        return;
      }
      default:
        sendResponse({ error: 'Unknown message type' });
    }
  })()
    .catch((e) => sendResponse({ error: e?.message || String(e) }));
  return true;
});
