const NOTES_STORAGE_KEY = 'classcharts_personal_notes';
const GOALS_STORAGE_KEY = 'classcharts_personal_goals';
const PROFILE_PHOTO_STORAGE_KEY = 'classcharts_custom_profile_photo';
const CURRENT_VERSION_KEY = 'classcharts_improver_version_v5_4';
const WELCOME_SHOWN_KEY = `classcharts_improver_welcome_shown_${CURRENT_VERSION_KEY}`;
const REVIEW_SHOWN_KEY = `classcharts_improver_review_shown_${CURRENT_VERSION_KEY}`;
const IMPROVED_UI_KEY = 'classcharts_improver_improved_ui_enabled';
const PLUS_ONE_ICON_KEY = 'classcharts_improver_plus_one_icon';
const HOMEWORK_DATE_HINT_KEY = 'classcharts_improver_homework_date_hint_enabled';
const HOMEWORK_REDESIGN_KEY = 'classcharts_improver_homework_redesign_enabled';
const ACCENT_COLOR_KEY = 'classcharts_improver_accent_color';
const MESSAGE_MENU_SELECTOR = '.MuiButtonBase-root.MuiListItem-root.desktop-drawer-pupil-menu-item:last-child';
const DEFAULT_ACCENT_BLUE = '#039BE5';
// Backwards-compat constant used throughout injected CSS.
const PRIMARY_BLUE = 'var(--cc-improver-accent, #039BE5)';
const LIGHT_GREY = '#f5f5f5';
const POSITIVE_GREEN = '#4CAF50';
const NOTES_ICON_FILE = 'edit-3.svg';
const GOALS_ICON_FILE = 'target.svg';
const INFO_ICON_FILE = 'info.svg';
const CAMERA_ICON_FILE = 'camera.svg';
const SETTINGS_ICON_FILE = 'settings.svg';
const POSITIVE_ICON_FILE = 'smile.svg';
const MONITOR_ICON_FILE = 'monitor.svg';
const PROFILE_IMAGE_DEFAULT_SRC_PATTERN = 'faces/';
const CLASSCHARTS_DEFAULT_PHOTO_URL = 'https://195ec04504ea0272771e-7c2c6dacbab7a2b2d574b53c70c1fe31.ssl.cf3.rackcdn.com/29.67.5-52f0ea22/img/faces/default.png';
const CONFETTI_IMAGE_URL = 'https://img.icons8.com/color/1200/confetti.jpg';

const SUPABASE_URL = 'https://izcixahquohigrzghyqv.supabase.co';
const SUPABASE_REGION_LABEL = 'Stockholm, Sweden';

function getAccentColor() {
    return localStorage.getItem(ACCENT_COLOR_KEY) || DEFAULT_ACCENT_BLUE;
}

function setAccentColor(hex) {
    localStorage.setItem(ACCENT_COLOR_KEY, hex);
    applyAccentColor();
    scheduleCloudSync();
}

function applyAccentColor() {
    const accent = getAccentColor();
    document.documentElement.style.setProperty('--cc-improver-accent', accent);
    document.documentElement.style.setProperty('--cc-improver-accent-rgb', hexToRgbCss(accent));
}

function hexToRgbCss(hex) {
    const clean = (hex || '').replace('#', '').trim();
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) return '3,155,229';
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `${r},${g},${b}`;
}

function bgMessage(message) {
    return new Promise((resolve) => {
        if (typeof chrome === 'undefined' || !chrome.runtime?.sendMessage) return resolve({ error: 'Background messaging unavailable' });
        chrome.runtime.sendMessage(message, (resp) => resolve(resp));
    });
}

async function getCloudSession() {
    const resp = await bgMessage({ type: 'SUPABASE_GET_SESSION' });
    return resp?.session || null;
}

async function ensureFreshSession() {
    const session = await getCloudSession();
    if (!session?.access_token) return null;
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = session.expires_at || (session.expires_in ? now + session.expires_in : null);
    if (expiresAt && expiresAt - now < 60) {
        const refreshed = await bgMessage({ type: 'SUPABASE_REFRESH' });
        if (refreshed?.session?.access_token) return refreshed.session;
    }
    return session;
}

function collectLocalSettings() {
    return {
        notes: loadNotes(),
        goals: loadGoals(),
        profile_photo: loadCustomProfilePhoto(),
        accent_color: getAccentColor(),
        plus_one_icon: getPlusOneIcon(),
        homework_date_hint_enabled: getHomeworkDateHintStatus(),
        homework_redesign_enabled: getHomeworkRedesignStatus(),
        updated_at: new Date().toISOString(),
    };
}

async function upsertSettingsToCloud() {
    const session = await ensureFreshSession();
    if (!session?.access_token || !session?.user?.id) return { ok: false, reason: 'not_connected' };

    const body = { user_id: session.user.id, ...collectLocalSettings() };
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/user_settings?on_conflict=user_id`, {
        method: 'POST',
        headers: {
            apikey: 'sb_publishable_a7GOW5zpj5YQp-nXJ6KyQA_NGkNyWFh',
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
            Prefer: 'resolution=merge-duplicates,return=minimal',
        },
        body: JSON.stringify(body),
    });

    if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        return { ok: false, reason: `http_${resp.status}`, details: text };
    }
    return { ok: true };
}

async function pullSettingsFromCloud() {
    const session = await ensureFreshSession();
    if (!session?.access_token || !session?.user?.id) return { ok: false, reason: 'not_connected' };

    const url = `${SUPABASE_URL}/rest/v1/user_settings?select=*&user_id=eq.${encodeURIComponent(session.user.id)}&limit=1`;
    const resp = await fetch(url, {
        headers: {
            apikey: 'sb_publishable_a7GOW5zpj5YQp-nXJ6KyQA_NGkNyWFh',
            Authorization: `Bearer ${session.access_token}`,
        },
    });
    if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        return { ok: false, reason: `http_${resp.status}`, details: text };
    }
    const rows = await resp.json();
    const row = rows?.[0];
    if (!row) return { ok: true, empty: true };

    if (typeof row.notes === 'string') saveNotes(row.notes);
    if (Array.isArray(row.goals)) saveGoals(row.goals);
    if (typeof row.profile_photo === 'string' || row.profile_photo === null) {
        if (row.profile_photo) localStorage.setItem(PROFILE_PHOTO_STORAGE_KEY, row.profile_photo);
        else localStorage.removeItem(PROFILE_PHOTO_STORAGE_KEY);
    }
    if (typeof row.accent_color === 'string') localStorage.setItem(ACCENT_COLOR_KEY, row.accent_color);
    if (typeof row.plus_one_icon === 'string') localStorage.setItem(PLUS_ONE_ICON_KEY, row.plus_one_icon);
    if (typeof row.homework_date_hint_enabled === 'boolean') localStorage.setItem(HOMEWORK_DATE_HINT_KEY, row.homework_date_hint_enabled ? 'true' : 'false');
    if (typeof row.homework_redesign_enabled === 'boolean') localStorage.setItem(HOMEWORK_REDESIGN_KEY, row.homework_redesign_enabled ? 'true' : 'false');

    applyAccentColor();
    applyCustomProfilePhoto();
    updateCustomIcons();
    applyHomeworkRedesign();
    injectHomeworkDateHint();

    return { ok: true };
}

let cloudSyncTimer = null;
function scheduleCloudSync() {
    if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
    cloudSyncTimer = setTimeout(() => {
        upsertSettingsToCloud().catch(() => {});
    }, 800);
}

let autoSyncInterval = null;
function startAutoCloudSync() {
    if (autoSyncInterval) return;
    autoSyncInterval = setInterval(async () => {
        const session = await getCloudSession();
        if (!session?.access_token) return;
        await upsertSettingsToCloud().catch(() => {});
    }, 30_000);

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            getCloudSession().then((session) => {
                if (session?.access_token) {
                    pullSettingsFromCloud().catch(() => {});
                    upsertSettingsToCloud().catch(() => {});
                }
            });
        }
    });
}

const DEFAULT_MENU_MAPPING = {
    0: 'home.svg',
    1: 'share-2.svg',
    2: 'clipboard.svg',
    3: 'clock.svg',
    4: 'smile.svg',
    5: 'calendar.svg',
    6: 'bar-chart-2.svg',
    7: 'alert-triangle.svg',
    8: 'message-square.svg'
};
const DEFAULT_MENU_TEXT_MAPPING = {
    0: 'Overview',
    2: 'Homework',
    4: 'Wellbeing',
    5: 'Timetable',
    8: 'Messages'
};

function loadNotes() {
    return localStorage.getItem(NOTES_STORAGE_KEY) || '';
}

function saveNotes(notes) {
    localStorage.setItem(NOTES_STORAGE_KEY, notes);
    scheduleCloudSync();
}

function loadGoals() {
    try {
        const stored = localStorage.getItem(GOALS_STORAGE_KEY);
        const goals = stored ? JSON.parse(stored) : [];
        return goals.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            return b.createdAt - a.createdAt;
        });
    } catch (e) {
        return [];
    }
}

function saveGoals(goals) {
    try {
        localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals || []));
    } catch (e) {
    }
    scheduleCloudSync();
}

function loadCustomProfilePhoto() {
    return localStorage.getItem(PROFILE_PHOTO_STORAGE_KEY);
}

function getImprovedUIStatus() {
    return true;
}

function getPlusOneIcon() {
    return localStorage.getItem(PLUS_ONE_ICON_KEY) || 'smile.svg';
}

function setPlusOneIcon(icon) {
    localStorage.setItem(PLUS_ONE_ICON_KEY, icon);
    scheduleCloudSync();
}

function getHomeworkDateHintStatus() {
    return localStorage.getItem(HOMEWORK_DATE_HINT_KEY) === 'true';
}

function setHomeworkDateHintStatus(enabled) {
    localStorage.setItem(HOMEWORK_DATE_HINT_KEY, enabled ? 'true' : 'false');
    scheduleCloudSync();
}

function getHomeworkRedesignStatus() {
    return localStorage.getItem(HOMEWORK_REDESIGN_KEY) === 'true';
}

function setHomeworkRedesignStatus(enabled) {
    localStorage.setItem(HOMEWORK_REDESIGN_KEY, enabled ? 'true' : 'false');
    scheduleCloudSync();
}

function updateAllMenuIcons() {
    updateDefaultIcons();
    const menuItems = document.querySelectorAll('.desktop-drawer-pupil-menu-item');
    const noteItem = Array.from(menuItems).find(item => item.querySelector('.MuiListItemText-primary')?.textContent === 'Personal Notes');
    const goalsItem = Array.from(menuItems).find(item => item.querySelector('.MuiListItemText-primary')?.textContent === 'Goals Tracker');
    const settingsHubItem = Array.from(menuItems).find(item => item.querySelector('.MuiListItemText-primary')?.textContent === 'Settings & Customization');
    const aboutItem = Array.from(menuItems).find(item => item.querySelector('.MuiListItemText-primary')?.textContent === 'About');

    if (noteItem) replaceIcon(noteItem, NOTES_ICON_FILE);
    if (goalsItem) replaceIcon(goalsItem, GOALS_ICON_FILE);
    if (settingsHubItem) replaceIcon(settingsHubItem, SETTINGS_ICON_FILE);
    if (aboutItem) replaceIcon(aboutItem, INFO_ICON_FILE);
}

const getAssetUrl = (filename) => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL && chrome.runtime.id) {
        if (filename === 'customlogo.png' || filename === 'threadtutorial.png' || filename === 'mini_car_game.html') {
             return chrome.runtime.getURL(`assets/${filename}`);
        }
        return chrome.runtime.getURL(`assets/feather/${filename}`);
    }
    return filename;
};

function replaceClassChartsLogo() {
    const mainLogo = document.querySelector('img[src*="CC_logo.png"], img[alt="Logo"]');
    if (mainLogo) {
        mainLogo.src = getAssetUrl('customlogo.png');
        mainLogo.alt = 'ClassCharts Improver Logo';
    }
}

function applyImprovedUI(enabled) {
    const body = document.body;
    if (enabled) {
        body.classList.add('cc-improver-improved-ui');
        const style = document.createElement('style');
        style.id = 'cc-improver-ui-styles';
        style.textContent = `
            .cc-improver-improved-ui .MuiPaper-root {
                border-radius: 12px !important;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            }
            .cc-improver-improved-ui .MuiAppBar-root {
                box-shadow: none !important;
                border-bottom: 1px solid #ddd;
            }
            .cc-improver-improved-ui .MuiCardHeader-root {
                border-bottom: 1px solid #f0f0f0;
            }
            .cc-improver-improved-ui .calendar-header-open-button,
            .cc-improver-improved-ui button[class*="calendar-"] {
                background-color: ${PRIMARY_BLUE} !important;
                color: white !important;
                box-shadow: 0 2px 4px rgba(3,155,229,0.4) !important;
            }
            .cc-improver-improved-ui .calendar-header-open-button:hover,
            .cc-improver-improved-ui button[class*="calendar-"]:hover {
                background-color: #0277BD !important;
            }
            .cc-new-badge {
                background-color: #f44336;
                color: white;
                font-size: 0.6rem;
                padding: 1px 5px;
                border-radius: 4px;
                margin-left: 6px;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                display: inline-block;
                vertical-align: middle;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                white-space: nowrap;
            }
        `;
        document.head.appendChild(style);
    } else {
        body.classList.remove('cc-improver-improved-ui');
        const style = document.getElementById('cc-improver-ui-styles');
        if (style) style.remove();
    }
}

function applyHomeworkRedesign() {
    const enabled = getHomeworkRedesignStatus();
    const existingStyle = document.getElementById('cc-homework-redesign-styles');
    
    if (enabled) {
        if (existingStyle) return;
        const style = document.createElement('style');
        style.id = 'cc-homework-redesign-styles';
        style.textContent = `
            .homework-page {
                background-color: #f8fafc !important;
                padding: 32px !important;
            }

            div[class*="meta-badge"] {
                background-color: white !important;
                border-radius: 12px !important;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06) !important;
                border: 1px solid #e2e8f0 !important;
                padding: 20px !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: flex-start !important;
                justify-content: center !important;
                height: auto !important;
                min-height: 100px !important;
                margin: 0 !important;
                position: relative !important;
                overflow: hidden !important;
                transition: transform 0.2s !important;
            }

            div[class*="meta-badge"]:hover {
                transform: translateY(-2px) !important;
            }

            div[class*="meta-badge"] b {
                font-size: 2.5rem !important;
                line-height: 1 !important;
                color: #1e293b !important;
                margin-bottom: 8px !important;
                display: block !important;
                font-weight: 800 !important;
            }

            div[class*="meta-badge"] span {
                font-size: 0.85rem !important;
                text-transform: uppercase !important;
                letter-spacing: 0.5px !important;
                font-weight: 600 !important;
                color: #64748b !important;
            }

            .meta-badge-tasks-due { border-left: 5px solid ${PRIMARY_BLUE} !important; }
            .meta-badge-tasks-completed { border-left: 5px solid ${POSITIVE_GREEN} !important; }
            .meta-badge-tasks-remaining { border-left: 5px solid #f44336 !important; }
            
            .meta-badge-requires-submission {
                background-color: white !important;
                border-left: 5px solid #00BCD4 !important;
                align-items: center !important;
                flex-direction: row !important;
            }
            
            .meta-badge-requires-submission .MuiIconButton-root {
                padding: 12px !important;
                margin-right: 10px !important;
                background: #e0f7fa !important;
                border-radius: 8px !important;
                color: #006064 !important;
            }

            .homework-page > div:nth-child(2) {
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
                gap: 20px !important;
                margin-bottom: 40px !important;
            }
            
            .MuiDialog-paper {
                border-radius: 16px !important;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
                overflow: visible !important;
            }

            .homework-details {
                padding: 10px !important;
            }

            .homework-details h4 { 
                font-size: 1.5rem !important;
                font-weight: 800 !important;
                color: #111827 !important;
                margin-bottom: 8px !important;
                line-height: 1.3 !important;
            }

            .homework-details h5 { 
                font-size: 0.95rem !important;
                color: #6b7280 !important;
                font-weight: 500 !important;
                border-bottom: 1px solid #e5e7eb !important;
                padding-bottom: 15px !important;
                margin-bottom: 20px !important;
            }

            .homework-group-header-badge {
                border-radius: 999px !important;
                padding: 6px 16px !important;
                font-size: 0.75rem !important;
                font-weight: 700 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.05em !important;
                display: inline-block !important;
                margin-bottom: 15px !important;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
            }

            .homework-details > div:nth-of-type(2) {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 12px !important;
                background: #f8fafc !important;
                padding: 16px !important;
                border-radius: 12px !important;
                margin-bottom: 20px !important;
                border: 1px solid #f1f5f9 !important;
            }
            
            .homework-details > div:nth-of-type(2) div {
                font-size: 0.9rem !important;
                color: #475569 !important;
            }
            
            .homework-details > div:nth-of-type(2) b {
                color: #1e293b !important;
                display: block !important;
                font-size: 0.75rem !important;
                text-transform: uppercase !important;
                opacity: 0.7 !important;
                margin-bottom: 4px !important;
            }

            .homework-details p {
                font-size: 1rem !important;
                line-height: 1.6 !important;
                color: #334155 !important;
                margin-bottom: 12px !important;
            }
            
            .homework-details fieldset {
                margin: 20px 0 !important;
                padding: 15px !important;
                border: 2px solid #e2e8f0 !important;
                border-radius: 12px !important;
                background: white !important;
                transition: border-color 0.2s !important;
            }
            
            .homework-details fieldset:hover {
                border-color: ${PRIMARY_BLUE} !important;
            }

            .homework-details ul a {
                border: 1px solid #e2e8f0 !important;
                border-radius: 8px !important;
                margin-top: 8px !important;
                transition: all 0.2s !important;
            }
            
            .homework-details ul a:hover {
                background-color: #f0f9ff !important;
                border-color: ${PRIMARY_BLUE} !important;
                color: ${PRIMARY_BLUE} !important;
            }

            .calendar-header {
                background: transparent !important;
                padding: 12px 0 !important;
                border: none !important;
                box-shadow: none !important;
                margin-bottom: 24px !important;
            }

            .calendar-header-open-button {
                border-radius: 10px !important;
                background-color: ${PRIMARY_BLUE} !important;
                padding: 12px !important;
            }
            
            .homework-card {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                border: 1px solid #e2e8f0 !important;
                border-radius: 16px !important;
                margin-bottom: 20px !important;
            }

            .homework-card:hover {
                transform: translateY(-4px) !important;
                box-shadow: 0 12px 24px -8px rgba(0,0,0,0.15) !important;
                border-color: ${PRIMARY_BLUE} !important;
            }
        `;
        document.head.appendChild(style);
        
        const calendarIconContainer = document.querySelector('.calendar-header .MuiButton-label');
        if (calendarIconContainer && !calendarIconContainer.querySelector('.cc-feather-icon')) {
            calendarIconContainer.innerHTML = `<img src="${getAssetUrl('calendar.svg')}" class="cc-feather-icon" style="width:20px; height:20px; filter:brightness(0) invert(1);">`;
        }

        const expandButtons = document.querySelectorAll('.expand-button .MuiIconButton-label');
        expandButtons.forEach(btn => {
            if (!btn.querySelector('.cc-feather-icon')) {
                btn.innerHTML = `<img src="${getAssetUrl('chevron-down.svg')}" class="cc-feather-icon" style="width:24px; height:24px; opacity:0.6;">`;
            }
        });
    } else {
        if (existingStyle) existingStyle.remove();
    }
}

function replaceIcon(element, iconFile) {
    const iconContainer = element.querySelector('.MuiListItemIcon-root');
    if (!iconContainer) return;
    const injectedIconSelector = '.cc-improver-icon-img';
    let injectedIcon = iconContainer.querySelector(injectedIconSelector);
    const originalIcon = iconContainer.querySelector(':scope > *:not(' + injectedIconSelector + ')');

    if (getImprovedUIStatus()) {
        if (originalIcon) {
             if (originalIcon.style.display !== 'none') {
                originalIcon.setAttribute('data-cc-improver-original-display', originalIcon.style.display || '');
                originalIcon.style.display = 'none';
             }
        }
        if (!injectedIcon) {
            const iconUrl = getAssetUrl(iconFile);
            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'icon';
            img.className = 'cc-improver-icon-img';
            img.style.cssText = 'width:24px;height:24px; color: currentColor;';
            iconContainer.appendChild(img);
        } else {
            injectedIcon.src = getAssetUrl(iconFile);
            injectedIcon.style.display = '';
        }
    } else {
        if (injectedIcon) {
            injectedIcon.remove();
        }
        if (originalIcon && originalIcon.hasAttribute('data-cc-improver-original-display')) {
            originalIcon.style.display = originalIcon.getAttribute('data-cc-improver-original-display');
            originalIcon.removeAttribute('data-cc-improver-original-display');
        }
    }
}

function updateDefaultIcons() {
    const defaultMenuItems = document.querySelectorAll('.MuiButtonBase-root.MuiListItem-root.desktop-drawer-pupil-menu-item');
    defaultMenuItems.forEach((item, index) => {
        const iconFile = DEFAULT_MENU_MAPPING[index];
        const newText = DEFAULT_MENU_TEXT_MAPPING[index];
        if (iconFile) {
            replaceIcon(item, iconFile);
        }
        if (newText) {
            const textSpan = item.querySelector('.MuiListItemText-primary');
            if (textSpan) {
                textSpan.textContent = newText;
            }
        }
    });
}

function createMenuItem() {
    const messagesItem = document.querySelector(MESSAGE_MENU_SELECTOR);
    if (!messagesItem) {
        return false;
    }

    const createItem = (text, iconFile, clickHandler, id) => {
        const item = messagesItem.cloneNode(true);
        item.id = id;
        const textSpan = item.querySelector('.MuiListItemText-primary');
        if (textSpan) {
            textSpan.textContent = text;
            item.style.backgroundColor = 'transparent';
            item.style.color = 'rgba(0, 0, 0, 0.87)';
            item.addEventListener('mouseover', () => {
                item.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
            });
            item.addEventListener('mouseout', () => {
                item.style.backgroundColor = 'transparent';
            });
            replaceIcon(item, iconFile);
            item.removeEventListener('click', item.click);
            item.addEventListener('click', clickHandler);
        }
        return item;
    };

    const notesItem = createItem('Personal Notes', NOTES_ICON_FILE, (event) => {
        event.preventDefault();
        event.stopPropagation();
        showNotesModal();
    }, 'cc-improver-notes-menu-item');

    const goalsItem = createItem('Goals Tracker', GOALS_ICON_FILE, (event) => {
        event.preventDefault();
        event.stopPropagation();
        showGoalsModal();
    }, 'cc-improver-goals-menu-item');

    const settingsHubItem = createItem('Settings & Customization', SETTINGS_ICON_FILE, (event) => {
        event.preventDefault();
        event.stopPropagation();
        showAllSettingsModal();
    }, 'cc-improver-settings-hub-menu-item');

    const aboutItem = createItem('About', INFO_ICON_FILE, (event) => {
        event.preventDefault();
        event.stopPropagation();
        showAboutModal();
    }, 'cc-improver-about-menu-item');

    const improverHeaderHtml = `
        <div class="cc-improver-header" style="padding: 16px; padding-bottom: 8px; font-weight: 700; color: rgba(0, 0, 0, 0.54); font-size: 0.875rem; text-transform: uppercase;">
            ClassCharts Improver
        </div>
        <div class="cc-improver-divider" style="height: 1px; background-color: rgba(0, 0, 0, 0.12); margin: 0 16px;"></div>
    `;

    const finalDividerHtml = `<div class="cc-improver-divider" style="height: 1px; background-color: rgba(0, 0, 0, 0.12); margin: 0 16px;"></div>`;

    messagesItem.after(notesItem);
    notesItem.after(goalsItem);
    notesItem.insertAdjacentHTML('beforebegin', improverHeaderHtml);

    goalsItem.after(settingsHubItem);
    
    settingsHubItem.style.position = 'relative';
    settingsHubItem.style.overflow = 'visible';

    const badge = document.createElement('div');
    badge.className = 'cc-improver-new-func-label';
    badge.textContent = 'New Functionality';
    badge.style.cssText = `
        position: absolute;
        top: -6px;
        right: 10px;
        background-color: ${PRIMARY_BLUE};
        color: white;
        font-size: 0.6rem;
        font-weight: 800;
        padding: 2px 6px;
        border-radius: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        z-index: 10;
        pointer-events: none;
    `;
    settingsHubItem.appendChild(badge);

    settingsHubItem.after(aboutItem);
    aboutItem.insertAdjacentHTML('afterend', finalDividerHtml);

    return true;
}

function createBaseModal(idPrefix, title, bodyHtml, maxWidth = '500px') {
    const wrappedTitle = `<span class="${idPrefix}-modal-title-text">${title}</span>`;
    const modalHtml = `
        <style>
            .${idPrefix}-modal-card {
                background-color: white;
                border-radius: 12px;
                width: 90%;
                max-width: ${maxWidth};
                box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
                font-family: Inter, Roboto, "Helvetica Neue", Arial, sans-serif;
                overflow: hidden;
            }
            .${idPrefix}-modal-header {
                padding: 18px 24px;
                font-size: 1.5rem;
                font-weight: 600;
                color: #212121;
                border-bottom: 1px solid #e0e0e0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #f7f7f7;
            }
            .${idPrefix}-modal-title-text {
                flex-shrink: 1;
                min-width: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .${idPrefix}-modal-body {
                padding: 24px;
            }
            .${idPrefix}-close-x {
                 background: none;
                 border: none;
                 font-size: 2rem;
                 cursor: pointer;
                 color: rgba(0, 0, 0, 0.54);
                 line-height: 1;
                 transition: color 0.2s;
            }
            .${idPrefix}-close-x:hover {
                 color: rgba(0, 0, 0, 0.87);
            }
            .${idPrefix}-button {
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                transition: background-color 0.2s, box-shadow 0.2s, transform 0.1s;
                min-width: 100px;
            }
            .${idPrefix}-button:active {
                transform: scale(0.98);
            }
            .${idPrefix}-save-btn {
                background-color: ${PRIMARY_BLUE};
                color: white;
                box-shadow: 0 4px 8px rgba(3,155,229,0.4);
            }
            .${idPrefix}-save-btn:hover {
                background-color: #0277BD;
            }
            .${idPrefix}-cancel-btn {
                background-color: #e0e0e0;
                color: rgba(0, 0, 0, 0.87);
            }
            .${idPrefix}-cancel-btn:hover {
                background-color: #bdbdbd;
            }
            .cc-notes-textarea, .cc-notes-display-content, .cc-add-goal-input {
                width: 100%;
                min-height: 250px;
                border: 2px solid #ddd;
                border-radius: 8px;
                padding: 16px;
                margin-bottom: 20px;
                font-family: inherit;
                font-size: 1rem;
                outline: none;
                transition: border-color 0.3s, box-shadow 0.3s;
                box-sizing: border-box;
                white-space: pre-wrap;
            }
            .cc-notes-textarea:focus, .cc-add-goal-input:focus {
                border-color: ${PRIMARY_BLUE};
                box-shadow: 0 0 0 3px rgba(3,155,229,0.2);
            }
            .cc-notes-display-content {
                min-height: 150px;
                background-color: ${LIGHT_GREY};
            }
            .cc-goal-list {
                list-style: none;
                padding: 0;
                max-height: 300px;
                overflow-y: auto;
                margin-bottom: 20px;
                border: 1px solid #f0f0f0;
                border-radius: 8px;
                background-color: #fff;
            }
            .cc-goal-item {
                display: flex;
                align-items: center;
                padding: 12px 16px;
                border-bottom: 1px solid #eee;
            }
            .cc-goal-item:last-child {
                border-bottom: none;
            }
            .cc-goal-item.completed {
                color: rgba(0, 0, 0, 0.4);
                text-decoration: line-through;
            }
            .cc-goal-checkbox {
                appearance: none;
                -webkit-appearance: none;
                width: 20px;
                height: 20px;
                border: 2px solid ${PRIMARY_BLUE};
                border-radius: 4px;
                margin-right: 15px;
                cursor: pointer;
                position: relative;
                transition: background-color 0.2s, border-color 0.2s;
                min-width: 20px;
            }
            .cc-goal-checkbox:checked {
                background-color: ${PRIMARY_BLUE};
                border-color: ${PRIMARY_BLUE};
            }
            .cc-goal-checkbox:checked::after {
                content: '';
                position: absolute;
                left: 6px;
                top: 2px;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 3px 3px 0;
                transform: rotate(45deg);
            }
            .cc-goal-text {
                flex-grow: 1;
                font-size: 1rem;
            }
            .cc-add-goal-container {
                display: flex;
                gap: 10px;
                margin-top: 16px;
            }
            .cc-add-goal-input {
                flex-grow: 1;
                min-height: unset;
                height: 48px;
                padding: 10px 16px;
                margin-bottom: 0;
            }
            .cc-switch {
              position: relative;
              display: inline-block;
              width: 48px;
              height: 28px;
            }

            .cc-switch input { 
              opacity: 0;
              width: 0;
              height: 0;
            }

            .cc-slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: #ccc;
              -webkit-transition: .4s;
              transition: .4s;
            }

            .cc-slider:before {
              position: absolute;
              content: "";
              height: 20px;
              width: 20px;
              left: 4px;
              bottom: 4px;
              background-color: white;
              -webkit-transition: .4s;
              transition: .4s;
            }

            input:checked + .cc-slider {
              background-color: ${PRIMARY_BLUE};
            }

            input:focus + .cc-slider {
              box-shadow: 0 0 1px ${PRIMARY_BLUE};
            }

            input:checked + .cc-slider:before {
              -webkit-transform: translateX(20px);
              -ms-transform: translateX(20px);
              transform: translateX(20px);
            }

            .cc-slider.round {
              border-radius: 28px;
            }

            .cc-slider.round:before {
              border-radius: 50%;
            }
        </style>
        <div id="${idPrefix}-modal-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); z-index: 1300; display: flex; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s;">
            <div id="${idPrefix}-modal-content" class="${idPrefix}-modal-card">
                <div class="${idPrefix}-modal-header">
                    ${wrappedTitle}
                    <button id="${idPrefix}-close-x" class="${idPrefix}-close-x">&times;</button>
                </div>
                <div class="${idPrefix}-modal-body">
                    ${bodyHtml}
                </div>
            </div>
        </div>
    `;
    const existingModal = document.getElementById(`${idPrefix}-modal-backdrop`);
    if (existingModal) existingModal.remove();
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const backdrop = document.getElementById(`${idPrefix}-modal-backdrop`);
    const closeXBtn = document.getElementById(`${idPrefix}-close-x`);

    setTimeout(() => {
        backdrop.style.opacity = '1';
    }, 10);

    const closeModal = () => {
        backdrop.style.opacity = '0';
        setTimeout(() => {
            backdrop.remove();
        }, 300);
    };

    closeXBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (event) => {
        if (event.target === backdrop) {
            closeModal();
        }
    });
    return { closeModal };
}

function showAllSettingsModal() {
    const bodyHtml = `
        <p style="font-size: 1rem; color: #444; margin-bottom: 25px;">
            Manage all ClassCharts Improver settings and customizations in one place.
        </p>
        <div style="display: flex; flex-direction: column; gap: 15px;">
            <button id="cc-open-photo-modal" class="cc-settings-hub-button" style="
                background-color: #E3F2FD;
                color: ${PRIMARY_BLUE};
                border: 1px solid ${PRIMARY_BLUE};
                padding: 15px;
                border-radius: 8px;
                font-weight: 600;
                text-align: left;
                cursor: pointer;
                transition: background-color 0.2s, box-shadow 0.2s;
                display: flex;
                align-items: center;
                justify-content: space-between;
            ">
                Custom Profile Photo
                <span style="font-size: 1.5rem; line-height: 1;">&rarr;</span>
            </button>
            <button id="cc-open-appearance-modal" class="cc-settings-hub-button" style="
                background-color: #E8F5E9;
                color: ${POSITIVE_GREEN};
                border: 1px solid ${POSITIVE_GREEN};
                padding: 15px;
                border-radius: 8px;
                font-weight: 600;
                text-align: left;
                cursor: pointer;
                transition: background-color 0.2s, box-shadow 0.2s;
                display: flex;
                align-items: center;
                justify-content: space-between;
            ">
                More Appearance Settings
                <span style="font-size: 1.5rem; line-height: 1;">&rarr;</span>
            </button>
            <button id="cc-open-ui-tweaks-modal" class="cc-settings-hub-button" style="
                background-color: #FFF3E0;
                color: #EF6C00;
                border: 1px solid #EF6C00;
                padding: 15px;
                border-radius: 8px;
                font-weight: 600;
                text-align: left;
                cursor: pointer;
                transition: background-color 0.2s, box-shadow 0.2s;
                display: flex;
                align-items: center;
                justify-content: space-between;
            ">
                UI Tweaks
                <span style="font-size: 1.5rem; line-height: 1;">&rarr;</span>
            </button>
            <button id="cc-open-account-sync-modal" class="cc-settings-hub-button" style="
                background-color: #E0F2F1;
                color: #00695C;
                border: 1px solid #00695C;
                padding: 15px;
                border-radius: 8px;
                font-weight: 600;
                text-align: left;
                cursor: pointer;
                transition: background-color 0.2s, box-shadow 0.2s;
                display: flex;
                align-items: center;
                justify-content: space-between;
            ">
                Account & Sync
                <span style="font-size: 1.5rem; line-height: 1;">&rarr;</span>
            </button>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 30px;">
            <button id="cc-settings-hub-close-btn" class="cc-notes-button cc-notes-cancel-btn">Close</button>
        </div>
        <style>
             .cc-settings-hub-button:hover {
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
             }
        </style>
    `;

    const { closeModal } = createBaseModal('cc-settings-hub', 'Settings & Customization', bodyHtml, '450px');
    document.getElementById('cc-settings-hub-close-btn').addEventListener('click', closeModal);

    document.getElementById('cc-open-photo-modal').addEventListener('click', () => {
        closeModal();
        showProfilePhotoModal();
    });

    document.getElementById('cc-open-appearance-modal').addEventListener('click', () => {
        closeModal();
        showAppearanceSettingsModal();
    });

    document.getElementById('cc-open-ui-tweaks-modal').addEventListener('click', () => {
        closeModal();
        showUITweaksModal();
    });

    document.getElementById('cc-open-account-sync-modal').addEventListener('click', () => {
        closeModal();
        showAccountSyncModal();
    });
}

function showUITweaksModal() {
    const isRedesignEnabled = getHomeworkRedesignStatus();

    const bodyHtml = `
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <p style="font-size: 0.9rem; color: #666;">Fine-tune the look and feel of the student portal.</p>
            
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; transition: border-color 0.2s;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-weight: 600; color: #111827;">Homework Tab Redesign</span>
                    <span style="font-size: 0.75rem; color: #6b7280;">Enable a cleaner, more modern layout for homework cards.</span>
                </div>
                <label class="cc-switch">
                    <input type="checkbox" id="cc-homework-redesign-toggle" ${isRedesignEnabled ? 'checked' : ''}>
                    <span class="cc-slider round"></span>
                </label>
            </div>
            
            <div style="padding: 10px 0;">
                <div class="cc-improver-new-func-label" style="font-size: 0.75rem; color: #9ca3af; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px; margin-bottom: 12px;">New Functionality</div>
                <p style="font-size: 0.85rem; color: #4b5563;">Additional customization options are added here as they are developed.</p>
            </div>
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 32px;">
            <button id="cc-ui-tweaks-close-btn" class="cc-notes-button cc-notes-save-btn">Done</button>
        </div>
    `;

    const { closeModal } = createBaseModal('cc-ui-tweaks', 'UI Tweaks', bodyHtml, '450px');
    
    document.getElementById('cc-ui-tweaks-close-btn').addEventListener('click', closeModal);
    
    document.getElementById('cc-homework-redesign-toggle').addEventListener('change', (e) => {
        const enabled = e.target.checked;
        setHomeworkRedesignStatus(enabled);
        applyHomeworkRedesign();
    });
}

function showAccountSyncModal() {
    const bodyHtml = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="padding: 14px; border-radius: 14px; border: 1px solid #e5e7eb; background: linear-gradient(135deg, #f8fafc, #ffffff);">
                <div style="font-weight: 800; color: #111827; margin-bottom: 6px; font-size: 1rem;">Cloud Sync</div>
                <div style="font-size: 0.88rem; color: #4b5563; line-height: 1.4;">
                    Your settings are stored locally on this device by default. When connected, they sync automatically to Supabase (server region: ${SUPABASE_REGION_LABEL}). Please ensure you have read and you agree to <a href="https://classchartsimprover.pages.dev/privacy" class="text-blue-600 hover:text-blue-800 underline decoration-blue-600 hover:decoration-blue-800 transition-colors duration-200">
        our privacy policy
    </a> before you link your account.
                </div>
            </div>

            <div id="cc-sync-status" style="padding: 12px; border-radius: 12px; border: 1px solid #e5e7eb; background: #f9fafb; font-size: 0.85rem; color: #374151;">
                Checking connection…
            </div>

            <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                <button id="cc-sync-connect-github" class="cc-notes-button cc-notes-save-btn" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <img src="${getAssetUrl('github.svg')}" alt="" style="width: 18px; height: 18px;">
                    Connect with GitHub
                </button>
            </div>

            <div style="padding: 14px; border: 1px solid #e5e7eb; border-radius: 14px; background: white;">
                <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 10px;">
                    <div style="font-weight: 800; color: #111827;">Email sign-in</div>
                    <div style="font-size: 0.75rem; color: #6b7280;">Email + password</div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <input id="cc-sync-email" type="email" placeholder="Email" class="cc-add-goal-input" style="width: 100%;">
                    <input id="cc-sync-password" type="password" placeholder="Password" class="cc-add-goal-input" style="width: 100%;">
                    <div style="display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
                        <button id="cc-sync-email-signin" class="cc-notes-button cc-notes-save-btn">Sign in</button>
                        <button id="cc-sync-email-signup" class="cc-notes-button cc-goals-cancel-btn">Sign up</button>
                    </div>
                    <div style="font-size: 0.75rem; color: #6b7280;">
                        After you create your account, you must confirm your email before you can use cross-device sync.
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
                <button id="cc-sync-pull" class="cc-notes-button cc-goals-cancel-btn">Pull</button>
                <button id="cc-sync-push" class="cc-notes-button cc-notes-save-btn">Sync now</button>
                <button id="cc-sync-disconnect" class="cc-notes-button cc-goals-cancel-btn" style="background: #fee2e2; border: 1px solid #ef4444; color: #991b1b;">Disconnect</button>
            </div>
        </div>
    `;

    const { closeModal } = createBaseModal('cc-account-sync', 'Account & Sync', bodyHtml, '520px');

    const statusEl = document.getElementById('cc-sync-status');
    const setStatus = (text, kind = 'info') => {
        const colors = {
            info: { bg: '#f9fafb', border: '#e5e7eb', color: '#374151' },
            ok: { bg: '#ecfdf5', border: '#10b981', color: '#065f46' },
            warn: { bg: '#fffbeb', border: '#f59e0b', color: '#92400e' },
            err: { bg: '#fef2f2', border: '#ef4444', color: '#991b1b' },
        };
        const c = colors[kind] || colors.info;
        statusEl.textContent = text;
        statusEl.style.background = c.bg;
        statusEl.style.borderColor = c.border;
        statusEl.style.color = c.color;
    };

    const refreshStatus = async () => {
        const session = await getCloudSession();
        if (session?.user?.email) setStatus(`Connected as ${session.user.email}. Cloud sync is enabled.`, 'ok');
        else setStatus('Not connected. Your settings are stored locally on this device.', 'warn');
    };

    refreshStatus();

    document.getElementById('cc-sync-connect-github').addEventListener('click', async () => {
        setStatus('Opening GitHub sign-in…', 'info');
        const resp = await bgMessage({ type: 'SUPABASE_SIGN_IN_GITHUB' });
        if (resp?.error) return setStatus(resp.error, 'err');
        await pullSettingsFromCloud().catch(() => {});
        await upsertSettingsToCloud().catch(() => {});
        startAutoCloudSync();
        await refreshStatus();
        closeModal();
    });

    document.getElementById('cc-sync-email-signin').addEventListener('click', async () => {
        const email = document.getElementById('cc-sync-email').value.trim();
        const password = document.getElementById('cc-sync-password').value;
        if (!email || !password) return setStatus('Enter an email and password.', 'warn');
        setStatus('Signing in…', 'info');
        const resp = await bgMessage({ type: 'SUPABASE_SIGN_IN_PASSWORD', email, password });
        if (resp?.error) return setStatus(resp.error, 'err');
        await pullSettingsFromCloud().catch(() => {});
        await upsertSettingsToCloud().catch(() => {});
        startAutoCloudSync();
        await refreshStatus();
        closeModal();
    });

    document.getElementById('cc-sync-email-signup').addEventListener('click', async () => {
        const email = document.getElementById('cc-sync-email').value.trim();
        const password = document.getElementById('cc-sync-password').value;
        if (!email || !password) return setStatus('Enter an email and password.', 'warn');
        setStatus('Creating account…', 'info');
        const resp = await bgMessage({ type: 'SUPABASE_SIGN_UP_PASSWORD', email, password });
        if (resp?.error) return setStatus(resp.error, 'err');
        setStatus('Account created. If email confirmation is enabled, confirm your email then sign in.', 'ok');
        await refreshStatus();
    });

    document.getElementById('cc-sync-push').addEventListener('click', async () => {
        setStatus('Syncing to cloud…', 'info');
        const r = await upsertSettingsToCloud();
        if (!r.ok) return setStatus(`Sync failed (${r.reason || 'unknown'}).`, 'err');
        setStatus('Synced to cloud.', 'ok');
    });

    document.getElementById('cc-sync-pull').addEventListener('click', async () => {
        setStatus('Pulling from cloud…', 'info');
        const r = await pullSettingsFromCloud();
        if (!r.ok) return setStatus(`Pull failed (${r.reason || 'unknown'}).`, 'err');
        setStatus('Pulled from cloud.', 'ok');
    });

    document.getElementById('cc-sync-disconnect').addEventListener('click', async () => {
        setStatus('Disconnecting…', 'info');
        const resp = await bgMessage({ type: 'SUPABASE_SIGN_OUT' });
        if (resp?.error) return setStatus(resp.error, 'err');
        setStatus('Disconnected. Your settings will remain stored locally on this device.', 'warn');
    });
}

function showNotesModal() {
    const bodyHtml = `
        <div id="cc-notes-display" class="cc-notes-display-content">
        </div>
        <textarea id="cc-notes-textarea" class="cc-notes-textarea" placeholder="Write your notes here..." style="display: none;"></textarea>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button id="cc-notes-close-modal-btn" class="cc-notes-button cc-notes-cancel-btn">Close</button>
            <button id="cc-notes-edit-btn" class="cc-notes-button cc-notes-save-btn">Edit Notes</button>
            <button id="cc-notes-cancel-edit-btn" class="cc-notes-button cc-notes-cancel-btn" style="display: none;">Cancel Edit</button>
            <button id="cc-notes-save-btn" class="cc-notes-button cc-notes-save-btn" style="display: none;">Save Changes</button>
        </div>
    `;
    const { closeModal } = createBaseModal('cc-notes', 'Personal Notes', bodyHtml);
    const textarea = document.getElementById('cc-notes-textarea');
    const displayDiv = document.getElementById('cc-notes-display');
    const closeModalBtn = document.getElementById('cc-notes-close-modal-btn');
    const editBtn = document.getElementById('cc-notes-edit-btn');
    const saveBtn = document.getElementById('cc-notes-save-btn');
    const cancelEditBtn = document.getElementById('cc-notes-cancel-edit-btn');
    const initialNotes = loadNotes();
    let currentNotes = initialNotes;

    const setMode = (editing) => {
        if (editing) {
            displayDiv.style.display = 'none';
            textarea.style.display = 'block';
            editBtn.style.display = 'none';
            closeModalBtn.style.display = 'none';
            cancelEditBtn.style.display = 'block';
            saveBtn.style.display = 'block';
            textarea.focus();
        } else {
            displayDiv.style.display = 'block';
            textarea.style.display = 'none';
            editBtn.style.display = 'block';
            closeModalBtn.style.display = 'block';
            cancelEditBtn.style.display = 'none';
            saveBtn.style.display = 'none';
        }
    };

    const updateContent = (content) => {
        displayDiv.textContent = content.length > 0 ? content : 'No notes saved yet. Click Edit Notes to start.';
        textarea.value = content;
        currentNotes = content;
    };

    updateContent(initialNotes);
    setMode(false);

    closeModalBtn.addEventListener('click', closeModal);
    editBtn.addEventListener('click', () => {
        setMode(true);
    });
    cancelEditBtn.addEventListener('click', () => {
         textarea.value = currentNotes;
         setMode(false);
    });
    saveBtn.addEventListener('click', () => {
        const newNotes = textarea.value;
        saveNotes(newNotes);
        updateContent(newNotes);
        setMode(false);
    });
}

function showGoalsModal() {
    const bodyHtml = `
        <div style="font-size: 0.9rem; color: rgba(0, 0, 0, 0.6); margin-bottom: 10px;">Your pending and completed goals:</div>
        <ul id="cc-goal-list" class="cc-goal-list"></ul>
        <div class="cc-add-goal-container">
            <input type="text" id="cc-add-goal-input" class="cc-add-goal-input" placeholder="Enter new goal (e.g., 'Revise Maths topic 3')">
            <button id="cc-add-goal-btn" class="cc-goals-button cc-goals-save-btn" style="white-space: nowrap;">Add Goal</button>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 30px;">
            <button id="cc-goals-clear-btn" class="cc-goals-button cc-goals-cancel-btn">Clear Completed</button>
            <button id="cc-goals-close-btn" class="cc-notes-button cc-notes-save-btn">Close</button>
        </div>
    `;
    const { closeModal } = createBaseModal('cc-goals', 'Goals Tracker', bodyHtml);
    const goalsList = document.getElementById('cc-goal-list');
    const input = document.getElementById('cc-add-goal-input');
    const addBtn = document.getElementById('cc-add-goal-btn');
    const clearBtn = document.getElementById('cc-goals-clear-btn');
    const closeBtn = document.getElementById('cc-goals-close-btn');

    let currentGoals = loadGoals();

    const renderGoals = () => {
        goalsList.innerHTML = '';
        currentGoals = loadGoals();
        if (currentGoals.length === 0) {
            goalsList.innerHTML = '<li style="padding: 10px 16px; color: rgba(0,0,0,0.5);">No goals set yet. Use the input below to add your first goal!</li>';
            return;
        }

        currentGoals.forEach(goal => {
            const listItem = document.createElement('li');
            listItem.className = `cc-goal-item ${goal.completed ? 'completed' : ''}`;
            listItem.dataset.id = goal.id;
            listItem.innerHTML = `
                <input type="checkbox" class="cc-goal-checkbox" ${goal.completed ? 'checked' : ''} data-id="${goal.id}">
                <span class="cc-goal-text">${goal.text}</span>
            `;
            goalsList.appendChild(listItem);
        });

        goalsList.querySelectorAll('.cc-goal-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => toggleGoalCompletion(e.target.dataset.id));
        });
    };

    const toggleGoalCompletion = (id) => {
        currentGoals = loadGoals();
        const goalIndex = currentGoals.findIndex(g => g.id === id);
        if (goalIndex !== -1) {
            currentGoals[goalIndex].completed = !currentGoals[goalIndex].completed;
            currentGoals[goalIndex].createdAt = Date.now();
            saveGoals(currentGoals);
            renderGoals();
        }
    };

    const addGoal = () => {
        const text = input.value.trim();
        if (text) {
            const newGoal = {
                id: Date.now().toString(),
                text: text,
                completed: false,
                createdAt: Date.now()
            };
            currentGoals.push(newGoal);
            saveGoals(currentGoals);
            input.value = '';
            renderGoals();
        }
    };

    addBtn.addEventListener('click', addGoal);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addGoal();
    });
    clearBtn.addEventListener('click', clearCompleted);
    closeBtn.addEventListener('click', closeModal);

    renderGoals();
}

function clearCompleted() {
    const goals = loadGoals();
    const filtered = goals.filter(g => !g.completed);
    saveGoals(filtered);
    const goalsList = document.getElementById('cc-goal-list');
    if (goalsList) {
        goalsList.innerHTML = '';
        filtered.forEach(goal => {
            const listItem = document.createElement('li');
            listItem.className = `cc-goal-item ${goal.completed ? 'completed' : ''}`;
            listItem.dataset.id = goal.id;
            listItem.innerHTML = `
                <input type="checkbox" class="cc-goal-checkbox" ${goal.completed ? 'checked' : ''} data-id="${goal.id}">
                <span class="cc-goal-text">${goal.text}</span>
            `;
            goalsList.appendChild(listItem);
        });
        goalsList.querySelectorAll('.cc-goal-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const goals = loadGoals();
                const goalIndex = goals.findIndex(g => g.id === e.target.dataset.id);
                if (goalIndex !== -1) {
                    goals[goalIndex].completed = !goals[goalIndex].completed;
                    goals[goalIndex].createdAt = Date.now();
                    saveGoals(goals);
                    clearCompleted();
                }
            });
        });
    }
}

function showAboutModal() {
    const bodyHtml = `
        <p style="margin-bottom: 20px; font-size: 1rem; color: #444;">This project enhances the ClassCharts student portal by adding helpful features. Your data is stored locally on this device by default, and can optionally sync via Supabase once you connect an account in Settings.</p>
        <ul style="list-style-type: disc; padding-left: 20px; margin-bottom: 20px; color: #444;">
            <li style="margin-bottom: 8px;"><strong>Version:</strong> 4.1 (Current Version Key: ${CURRENT_VERSION_KEY})</li>
            <li style="margin-bottom: 8px;"><strong>Feature 1:</strong> Personal Notes (A private notepad)</li>
            <li><strong>Feature 2:</strong> Goals Tracker (Define and track tasks/goals)</li>
            <li><strong>Feature 3:</strong> Custom Profile Photo (Visible only to you)</li>
        </ul>
        <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
            <p style="font-size: 0.85rem; color: #777; margin-bottom: 10px;">
                <strong>Privacy Notice:</strong> By default, this extension stores your notes, goals, and customization settings locally on this device. If you choose to connect an account in <strong>Settings → Account &amp; Sync</strong>, your settings are stored in the cloud (Supabase) on a server in ${SUPABASE_REGION_LABEL} to enable cross-device sync.
            </p>
            <p style="font-size: 0.8rem; color: #999;">
                &copy; James Theakston 2026
            </p>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <button id="cc-about-close-btn" class="cc-notes-button cc-notes-save-btn">Close</button>
        </div>
    `;
    const { closeModal } = createBaseModal('cc-about', 'About ClassCharts Improver', bodyHtml, '450px');
    const closeBtn = document.getElementById('cc-about-close-btn');
    closeBtn.addEventListener('click', closeModal);
}

function showProfilePhotoModal() {
    const currentPhoto = loadCustomProfilePhoto() || CLASSCHARTS_DEFAULT_PHOTO_URL;

    const bodyHtml = `
        <div style="font-size: 1rem; color: #333; margin-bottom: 25px; background-color: #f7f7f7; padding: 15px; border-radius: 8px;">
            <p style="font-weight: 600; color: ${PRIMARY_BLUE}; margin-bottom: 10px;">Your Privacy, Our Priority</p>
            <p>This custom profile photo is <strong>only visible to you</strong>. It’s stored locally on this device until you connect an account in Settings, at which point it’s stored in the cloud (Supabase) on a server in ${SUPABASE_REGION_LABEL} for cross-device sync. It will not be shared with your school, teachers, or other students. You can change or remove it anytime.</p>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <img id="cc-current-photo-preview" src="${currentPhoto}"
                 alt="Current Profile Photo"
                 style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid ${PRIMARY_BLUE};">

            <input type="file" id="cc-photo-upload-input" accept="image/*" style="display: none;">
            <button id="cc-photo-upload-btn" class="cc-notes-button cc-notes-save-btn" style="min-width: 180px;">
                Upload New Photo
            </button>
            <button id="cc-photo-remove-btn" class="cc-notes-button cc-goals-cancel-btn" style="min-width: 180px;">
                Remove Photo
            </button>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 30px;">
            <button id="cc-photo-close-btn" class="cc-notes-button cc-goals-cancel-btn">Done</button>
        </div>
    `;
    const { closeModal } = createBaseModal('cc-profile-photo', 'Custom Profile Photo', bodyHtml, '450px');
    const uploadInput = document.getElementById('cc-photo-upload-input');
    const uploadBtn = document.getElementById('cc-photo-upload-btn');
    const removeBtn = document.getElementById('cc-photo-remove-btn');
    const closeBtn = document.getElementById('cc-photo-close-btn');
    const previewImg = document.getElementById('cc-current-photo-preview');

    uploadBtn.addEventListener('click', () => uploadInput.click());
    closeBtn.addEventListener('click', closeModal);

    removeBtn.addEventListener('click', () => {
        localStorage.removeItem(PROFILE_PHOTO_STORAGE_KEY);
        applyCustomProfilePhoto();
        previewImg.src = CLASSCHARTS_DEFAULT_PHOTO_URL;
        scheduleCloudSync();
    });

    uploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Image = e.target.result;
            localStorage.setItem(PROFILE_PHOTO_STORAGE_KEY, base64Image);
            applyCustomProfilePhoto();
            previewImg.src = base64Image;
            scheduleCloudSync();
        };
        reader.readAsDataURL(file);
    });
}

function showAppearanceSettingsModal() {
    const currentIcon = getPlusOneIcon();
    const isHomeworkHintEnabled = getHomeworkDateHintStatus();
    const currentAccent = getAccentColor();

    const bodyHtml = `
        <div class="space-y-4">
            <h3 style="font-size: 1.1rem; font-weight: 600; color: #333; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 15px;">Positive Behavior Icon (The "+1" Icon)</h3>
            <p style="font-size: 0.9rem; color: #555; margin-bottom: 20px;">Choose the icon that appears next to positive behavior points on the dashboard.</p>

            <div style="display: flex; flex-direction: column; gap: 10px;" id="plus-one-icon-options">
                <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; background-color: ${currentIcon === 'default' ? LIGHT_GREY : 'white'};">
                    <input type="radio" name="plusOneIcon" value="default" style="margin-right: 15px; transform: scale(1.2);" ${currentIcon === 'default' ? 'checked' : ''}>
                    <span style="font-weight: 500;">Original Icon (The default ClassCharts look)</span>
                </label>

                <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; background-color: ${currentIcon === 'smile.svg' ? LIGHT_GREY : 'white'};">
                    <input type="radio" name="plusOneIcon" value="smile.svg" style="margin-right: 15px; transform: scale(1.2);" ${currentIcon === 'smile.svg' ? 'checked' : ''}>
                    <img src="${getAssetUrl('smile.svg')}" alt="Smile Icon" style="width: 20px; height: 20px; margin-right: 10px;">
                    <span style="font-weight: 500;">Smile Icon (Recommended)</span>
                </label>

                <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; background-color: ${currentIcon === 'award.svg' ? LIGHT_GREY : 'white'};">
                    <input type="radio" name="plusOneIcon" value="award.svg" style="margin-right: 15px; transform: scale(1.2);" ${currentIcon === 'award.svg' ? 'checked' : ''}>
                    <img src="${getAssetUrl('award.svg')}" alt="Award Icon" style="width: 20px; height: 20px; margin-right: 10px;">
                    <span style="font-weight: 500;">Award Icon</span>
                </label>
            </div>

            <h3 style="font-size: 1.1rem; font-weight: 600; color: #333; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-top: 25px; margin-bottom: 15px;">Accent Colour</h3>
            <p style="font-size: 0.9rem; color: #555; margin-bottom: 12px;">Pick a preset, or choose any custom colour.</p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 10px;">
                <button class="cc-accent-preset" data-color="#039BE5" style="width: 28px; height: 28px; border-radius: 999px; border: 2px solid #e5e7eb; background: #039BE5; cursor: pointer;"></button>
                <button class="cc-accent-preset" data-color="#7C3AED" style="width: 28px; height: 28px; border-radius: 999px; border: 2px solid #e5e7eb; background: #7C3AED; cursor: pointer;"></button>
                <button class="cc-accent-preset" data-color="#10B981" style="width: 28px; height: 28px; border-radius: 999px; border: 2px solid #e5e7eb; background: #10B981; cursor: pointer;"></button>
                <button class="cc-accent-preset" data-color="#F59E0B" style="width: 28px; height: 28px; border-radius: 999px; border: 2px solid #e5e7eb; background: #F59E0B; cursor: pointer;"></button>
                <button class="cc-accent-preset" data-color="#EF4444" style="width: 28px; height: 28px; border-radius: 999px; border: 2px solid #e5e7eb; background: #EF4444; cursor: pointer;"></button>
                <div style="margin-left: 6px; display: flex; align-items: center; gap: 10px;">
                    <input id="cc-accent-picker" type="color" value="${currentAccent}" style="width: 44px; height: 32px; border: none; background: transparent; cursor: pointer;">
                    <input id="cc-accent-hex" type="text" value="${currentAccent}" class="cc-add-goal-input" style="width: 130px;" spellcheck="false">
                </div>
            </div>

            <h3 style="font-size: 1.1rem; font-weight: 600; color: #333; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-top: 25px; margin-bottom: 15px;">New Feature Toggles</h3>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 6px; background-color: white;">
                <label for="cc-homework-hint-toggle" style="font-weight: 500; color: #333; flex-grow: 1;">Show Prominent Due Date on Homework Cards</label>
                <label class="cc-switch">
                    <input type="checkbox" id="cc-homework-hint-toggle" ${isHomeworkHintEnabled ? 'checked' : ''}>
                    <span class="cc-slider round"></span>
                </label>
            </div>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 30px;">
            <button id="cc-settings-close-btn" class="cc-settings-button cc-settings-save-btn">Close</button>
        </div>
    `;

    const { closeModal } = createBaseModal('cc-settings', 'More Appearance Settings', bodyHtml, '450px');
    const closeBtn = document.getElementById('cc-settings-close-btn');

    closeBtn.addEventListener('click', closeModal);

    document.querySelectorAll('input[name="plusOneIcon"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const selectedIcon = e.target.value;
            setPlusOneIcon(selectedIcon);
            updateCustomIcons();
            document.querySelectorAll('label').forEach(label => {
                const input = label.querySelector('input');
                if (input && input.name === 'plusOneIcon') {
                    label.style.backgroundColor = input.value === selectedIcon ? LIGHT_GREY : 'white';
                }
            });
        });
    });
    
    document.getElementById('cc-homework-hint-toggle').addEventListener('change', (e) => {
        const enabled = e.target.checked;
        setHomeworkDateHintStatus(enabled);
        injectHomeworkDateHint();
    });

    const applyAccent = (hex) => {
        const cleaned = (hex || '').trim();
        if (!/^#[0-9a-fA-F]{6}$/.test(cleaned)) return;
        document.getElementById('cc-accent-picker').value = cleaned;
        document.getElementById('cc-accent-hex').value = cleaned;
        setAccentColor(cleaned);
    };

    document.querySelectorAll('.cc-accent-preset').forEach(btn => {
        btn.addEventListener('click', () => applyAccent(btn.dataset.color));
    });

    document.getElementById('cc-accent-picker').addEventListener('input', (e) => applyAccent(e.target.value));
    document.getElementById('cc-accent-hex').addEventListener('change', (e) => applyAccent(e.target.value));
}

function showDeveloperInfoModal() {
    const isHomeworkHintEnabled = getHomeworkDateHintStatus();

    const bodyHtml = `
        <p style="font-size: 1rem; color: #333; line-height: 1.5; margin-bottom: 25px;">
            This is the <strong>ClassCharts Improver Developer Information</strong> panel.
            It provides diagnostic and version information for the extension.
        </p>
        <ul style="list-style-type: disc; padding-left: 20px; margin-bottom: 20px; color: #444;">
            <li style="margin-bottom: 8px;"><strong>Version Key:</strong> ${CURRENT_VERSION_KEY}</li>
            <li style="margin-bottom: 8px;"><strong>Plus One Icon:</strong> ${getPlusOneIcon()}</li>
            <li style="margin-bottom: 8px;"><strong>Improved UI:</strong> ${getImprovedUIStatus() ? 'Enabled' : 'Disabled'}</li>
            <li><strong>Homework Date Hint:</strong> ${isHomeworkHintEnabled ? 'Enabled' : 'Disabled'}</li> 
        </ul>
        <p style="font-size: 0.9rem; color: #555;">
            <strong>Key Combo:</strong> The combination <strong>Ctrl + D</strong> (Cmd + D on Mac) is used to display this panel.
        </p>
        <div style="display: flex; justify-content: flex-end; margin-top: 30px;">
            <button id="cc-dev-info-close-btn" class="cc-notes-button cc-notes-save-btn">Close</button>
        </div>
    `;
    const { closeModal } = createBaseModal('cc-dev-info', 'ClassCharts Improver: Developer Info', bodyHtml, '480px');
    document.getElementById('cc-dev-info-close-btn').addEventListener('click', closeModal);
}

function setupKeyComboListener() {
    document.addEventListener('keydown', (e) => {
        const isCtrlD = (e.ctrlKey || e.metaKey) && e.key === 'd';

        if (isCtrlD) {
            e.preventDefault();
            showDeveloperInfoModal();
        }
    });
}

function applyCustomProfilePhoto() {
    const customPhotoUrl = loadCustomProfilePhoto();
    const profileImages = document.querySelectorAll('img.jss32, img[src*="' + PROFILE_IMAGE_DEFAULT_SRC_PATTERN + '"]');

    profileImages.forEach(img => {
        if (!img.dataset.originalSrc && img.src && img.src.includes(PROFILE_IMAGE_DEFAULT_SRC_PATTERN)) {
            img.dataset.originalSrc = img.src;
        }

        if (customPhotoUrl) {
            img.src = customPhotoUrl;
        } else if (img.dataset.originalSrc) {
            img.src = img.dataset.originalSrc;
        }
    });
}

function updateCustomIcons() {
    const iconToUse = getPlusOneIcon();

    const achievementSelectors = ['.jss63', '.jss66'];
    const positiveElements = document.querySelectorAll(achievementSelectors.join(', '));
    const originalStyle = 'display: inline-flex; align-items: center; justify-content: center; background-color: #4CAF50; color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 0.75rem; font-weight: bold; padding: 0;';

    positiveElements.forEach(element => {
        const isDefaultMode = iconToUse === 'default';

        if (isDefaultMode) {
            if (element.dataset.ccImproverIcon) {
                element.innerHTML = '+1';
                element.style.cssText = element.dataset.ccImproverOriginalCss || originalStyle;
                delete element.dataset.ccImproverIcon;
                delete element.dataset.ccImproverOriginalCss;
            }
        } else if (element.textContent.trim() === '+1') {
            const iconUrl = getAssetUrl(iconToUse);

            if (!element.dataset.ccImproverIcon) {
                element.dataset.ccImproverOriginalCss = element.style.cssText;
            }

            element.dataset.ccImproverIcon = 'true';

            element.innerHTML = `<img src="${iconUrl}" alt="Achievement Icon" style="width: 18px; height: 18px; margin-right: 2px; margin-top: 1px;">`;
            element.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                background-color: ${POSITIVE_GREEN};
                border-radius: 50%;
                width: 20px;
                height: 20px;
                cursor: default;
            `;
        }
    });
}

function replacePositiveAchievementIcons() {
    updateCustomIcons();
}

function injectHomeworkDateHint() {
    const isEnabled = getHomeworkDateHintStatus();
    const homeworkCards = document.querySelectorAll('.card.homework-card');
    const hintClass = 'cc-improver-date-hint';

    homeworkCards.forEach(card => {
        let existingHint = card.querySelector(`.${hintClass}`);

        if (!isEnabled) {
            if (existingHint) existingHint.remove();
            return;
        }

        if (existingHint) return;

        const dateElement = Array.from(card.querySelectorAll('p, h6, span')).find(
            el => el.textContent.toLowerCase().includes('due:')
        );

        if (dateElement) {
            const fullDateText = dateElement.textContent.trim();
            const dateMatch = fullDateText.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/);
            const dateText = dateMatch ? dateMatch[0] : fullDateText.replace(/due:/i, '').trim();

            const cardHeader = card.querySelector('.MuiCardHeader-root');
            if (cardHeader) {
                const hint = document.createElement('div');
                hint.className = hintClass;
                hint.innerHTML = `<strong style="font-size: 0.7rem; color: #E53935; text-transform: uppercase; margin-right: 5px;">Due Date:</strong> ${dateText}`;
                hint.style.cssText = `
                    font-size: 0.9rem;
                    color: #d81b60;
                    background-color: #fce4ec;
                    padding: 4px 8px;
                    border-radius: 4px;
                    margin-top: 5px;
                    display: inline-block;
                    font-weight: 500;
                `;
                cardHeader.insertAdjacentElement('afterend', hint);
            }
        }
    });
}

function showWelcomeModal(callback) {
    const logoUrl = getAssetUrl('customlogo.png');
    const welcomeHtml = `
        <style>
            .cc-welcome-card {
                background: linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%);
                border-radius: 16px;
                max-width: 480px;
                padding: 40px;
                box-shadow: 0 15px 40px rgba(3,155,229,0.3);
                text-align: center;
                font-family: Inter, Roboto, sans-serif;
                transform: scale(0.95);
                opacity: 0;
                transition: all 0.3s ease-out;
            }
            .cc-welcome-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 1400;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .cc-welcome-card.visible {
                transform: scale(1);
                opacity: 1;
            }
            .cc-welcome-logo {
                width: 100px;
                height: 100px;
                margin-bottom: 20px;
                border-radius: 0;
                object-fit: contain;
                border: 4px solid ${PRIMARY_BLUE};
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            .cc-welcome-dismiss-btn {
                background-color: ${PRIMARY_BLUE};
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                text-transform: uppercase;
                transition: background-color 0.2s, transform 0.1s;
                letter-spacing: 0.5px;
            }
            .cc-welcome-dismiss-btn:hover {
                background-color: #0277BD;
            }
            .cc-welcome-dismiss-btn:active {
                transform: scale(0.98);
            }
        </style>
        <div id="cc-welcome-modal-backdrop" class="cc-welcome-backdrop">
            <div id="cc-welcome-modal-content" class="cc-welcome-card">
                <img src="${logoUrl}" alt="ClassCharts Improver Logo" class="cc-welcome-logo">
                <h2 style="font-size: 1.75rem; margin-bottom: 10px; color: ${PRIMARY_BLUE}; font-weight: 700;">Update: New Features Arrived!</h2>
                <p style="font-size: 1rem; color: #444; line-height: 1.6; margin-bottom: 30px;">
                    We've rolled out a new update, including the ability to add <strong>Personal Notes</strong>, a <strong>Goals Tracker</strong>, and set a <strong>Custom Profile Photo</strong> right from the side menu. Check out the new, improved UI!
                </p>
                <button id="cc-welcome-dismiss-btn" class="cc-welcome-dismiss-btn">
                    Got it!
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', welcomeHtml);
    const dismissBtn = document.getElementById('cc-welcome-dismiss-btn');
    const backdrop = document.getElementById('cc-welcome-modal-backdrop');
    const content = document.getElementById('cc-welcome-modal-content');

    if (!dismissBtn || !backdrop || !content) {
        try { backdrop?.remove(); } catch (e) {}
        return;
    }

    setTimeout(() => {
        content.classList.add('visible');
    }, 10);

    const dismiss = () => {

        localStorage.setItem(WELCOME_SHOWN_KEY, 'true');
        content.classList.remove('visible');
        backdrop.style.backgroundColor = 'transparent';
        setTimeout(() => {
            backdrop.remove();
            if (callback) {
                callback();
            }
        }, 300);
    };
    dismissBtn.addEventListener('click', dismiss);
    backdrop.addEventListener('click', (event) => {
        if (event.target === backdrop) {
            dismiss();
        }
    });
}

function showReviewModal() {
    const logoUrl = getAssetUrl('customlogo.png');
    const reviewLink = 'https://chromewebstore.google.com/detail/classcharts-improver/kalmdpfngeebamgaeegkieojhbkbghoe';

    const reviewHtml = `
        <style>
            .cc-review-card {
                background-color: white;
                border-radius: 16px;
                max-width: 480px;
                padding: 40px;
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
                text-align: center;
                font-family: Inter, Roboto, sans-serif;
                border-top: 5px solid ${PRIMARY_BLUE};
                transform: scale(0.95);
                opacity: 0;
                transition: all 0.3s ease-out;
            }
            .cc-review-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 1400;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .cc-review-card.visible {
                transform: scale(1);
                opacity: 1;
            }
            .cc-review-logo {
                width: 100px;
                height: 100px; margin-bottom: 20px; border-radius: 16px; object-fit: contain; } .cc-review-btn-primary { background-color: ${POSITIVE_GREEN}; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; text-transform: uppercase; transition: background-color 0.2s, transform 0.1s; letter-spacing: 0.5px; } .cc-review-btn-primary:hover { background-color: #388E3C; } .cc-review-btn-secondary { background-color: #e0e0e0; color: #333; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-weight: 500; transition: background-color 0.2s; } .cc-review-btn-secondary:hover { background-color: #bdbdbd; } </style> <div id="cc-review-modal-backdrop" class="cc-review-backdrop"> <div id="cc-review-modal-content" class="cc-review-card"> <img src="${logoUrl}" alt="ClassCharts Improver Logo" class="cc-review-logo"> <h2 style="font-size: 1.75rem; margin-bottom: 10px; color: ${PRIMARY_BLUE}; font-weight: 700;">Enjoying the Improver?</h2> <p style="font-size: 1rem; color: #444; line-height: 1.5; margin-bottom: 30px;"> A simple rating or review helps other students discover these useful features. Would you mind taking 30 seconds to support the extension? </p> <div style="display: flex; justify-content: center; gap: 15px;"> <button id="cc-review-later-btn" class="cc-review-btn-secondary"> Maybe Later </button> <a href="${reviewLink}" target="_blank" id="cc-review-link-btn" style="text-decoration: none;"> <button id="cc-review-dismiss-btn" class="cc-review-btn-primary"> Leave a Review </button> </a> </div> </div> </div> `;
    document.body.insertAdjacentHTML('beforeend', reviewHtml);
    const backdrop = document.getElementById('cc-review-modal-backdrop');
    const content = document.getElementById('cc-review-modal-content');

    if (!backdrop || !content) {
        try { backdrop?.remove(); } catch (e) {}
        return;
    }

    setTimeout(() => {
        content.classList.add('visible');
    }, 10);

    const dismiss = () => {
        localStorage.setItem(REVIEW_SHOWN_KEY, 'true');
        content.classList.remove('visible');
        backdrop.style.backgroundColor = 'transparent';
        setTimeout(() => {
            backdrop.remove();
        }, 300);
    };

    const laterBtn = document.getElementById('cc-review-later-btn');
    const dismissBtn = document.getElementById('cc-review-dismiss-btn');
    if (laterBtn) laterBtn.addEventListener('click', dismiss);
    if (dismissBtn) dismissBtn.addEventListener('click', dismiss);

    backdrop.addEventListener('click', (event) => {
        if (event.target === backdrop) {
            dismiss();
        }
    });
}

function checkAndShowModals() {
    if (localStorage.getItem(WELCOME_SHOWN_KEY) !== 'true') {
        showWelcomeModal(() => {
            if (localStorage.getItem(REVIEW_SHOWN_KEY) !== 'true') {
                showReviewModal();
            }
        });
    } else if (localStorage.getItem(REVIEW_SHOWN_KEY) !== 'true') {
        showReviewModal();
    }
}

function injectReportConcernWarning() {
    const reportConcernPage = document.querySelector('.report-concern-page');
    if (!reportConcernPage) return;
    const header = reportConcernPage.querySelector('h2');
    const injectedClass = 'cc-improver-concern-warning';

    if (header && !reportConcernPage.querySelector('.' + injectedClass)) {
        const iconUrl = getAssetUrl('alert-triangle.svg');
        const warningHtml = `
            <div class="${injectedClass}" style="
                background-color: #fffbeb;
                border-left: 4px solid #f59e0b;
                color: #b45309;
                padding: 12px 16px;
                margin-top: 16px;
                margin-bottom: 24px;
                border-radius: 6px;
                display: flex;
                align-items: center;
            ">
                <img src="${iconUrl}" alt="Warning" style="width: 20px; height: 20px; margin-right: 12px; filter: invert(53%) sepia(85%) saturate(3065%) hue-rotate(334deg) brightness(99%) contrast(92%);">
                <span style="font-size: 0.95rem; font-weight: 500;">
                    This will not be sent to the extension - this will be sent to your school.
                </span>
            </div>
        `;
        header.insertAdjacentHTML('afterend', warningHtml);
    }
}

function injectContactLink() {
    const searchInput = document.querySelector('input[placeholder="Search by teacher name"]');
    const searchInputContainer = searchInput ? searchInput.closest('.MuiInputBase-root.MuiOutlinedInput-root') : null;
    const injectedClass = 'cc-improver-contact-link';

    if (searchInputContainer && !document.querySelector('.' + injectedClass)) {
        const linkHtml = `
            <div class="${injectedClass}" style="
                margin-top: 10px;
                text-align: right;
                font-size: 0.85rem;
                font-family: inherit;
            ">
                <a href="mailto:jamesttheakston2@gmail.com" style="color: ${PRIMARY_BLUE}; text-decoration: none; font-weight: 500; transition: color 0.2s;">
                    Contact ClassCharts Improver Extension
                </a>
            </div>
        `;
        searchInputContainer.insertAdjacentHTML('afterend', linkHtml);
    }
}

function injectCodeWarning() {
    const dialogTitleH2 = Array.from(document.querySelectorAll('.MuiDialogTitle-root h2')).find(
        h2 => h2.textContent.trim() === 'My code'
    );
    if (!dialogTitleH2) return;
    const dialogPaper = dialogTitleH2.closest('.MuiDialogTitle-root').parentElement;
    if (dialogPaper.querySelector('.cc-improver-code-warning')) return;
    const dialogContent = dialogPaper.querySelector('.MuiDialogContent-root');
    if (!dialogContent) return;

    const warningHtml = `
        <div class="cc-improver-code-warning" style="
            background-color: #fff8e1;
            border-left: 4px solid #ffc107;
            color: #383838;
            padding: 12px 24px;
            margin: 0 24px 20px 24px;
            border-radius: 6px;
            font-size: 0.95rem;
            font-weight: 500;
            display: flex;
            align-items: center;
        ">
            <span style="font-weight: bold; color: #ffc107; font-size: 1.2rem; margin-right: 10px;">&#9888;</span>
            This is like a password - keep it private and safe!
        </div>
    `;

    dialogContent.insertAdjacentHTML('beforebegin', warningHtml);
}

function injectMessagesPlaceholderContent() {
    const placeholderDiv = Array.from(document.querySelectorAll('div')).find(el => 
        el.textContent.trim() === 'Please select a thread on the left side to view the messages'
    );
    const injectedClass = 'cc-improver-messages-guide';

    if (placeholderDiv && !placeholderDiv.classList.contains(injectedClass)) {
        placeholderDiv.classList.add(injectedClass);
        placeholderDiv.textContent = 'Select a teacher on the left side to view the messages you have exchanged.';

        const imgUrl = getAssetUrl('threadtutorial.png');
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = 'Guide showing how to select a teacher thread';

        placeholderDiv.style.cssText = 'text-align: center; padding-top: 40px; font-weight: 500; color: #444;';
        img.style.cssText = 'max-width: 100%; height: auto; margin-top: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);';

        placeholderDiv.appendChild(img);
    }
}

function injectAnnouncementsDescription() {
    const announcementHeader = document.querySelector('h5.MuiTypography-root.MuiTypography-h5');
    const injectedClass = 'cc-improver-announcements-desc';

    if (announcementHeader &&
        announcementHeader.textContent.trim() === 'Announcements' &&
        !announcementHeader.parentElement.querySelector('.' + injectedClass)
    ) {
        const descriptionHtml = `
            <p class="${injectedClass}" style="
                font-size: 0.9rem;
                color: #777;
                margin-top: 4px;
                margin-bottom: 16px;
                font-weight: 400;
            ">
                View the latest news from your school below.
            </p>
        `;

        announcementHeader.insertAdjacentHTML('afterend', descriptionHtml);
    }
}

function injectLoginAlert() {
    const targetDiv = document.querySelector('.box');
    const injectedClass = 'cc-improver-login-alert';

    if (targetDiv && !targetDiv.nextElementSibling?.classList.contains(injectedClass)) {
        const alertHtml = `
            <div class="${injectedClass}" style="
                background-color: #e3f2fd;
                border-left: 4px solid ${PRIMARY_BLUE};
                color: #01579B;
                padding: 16px;
                margin-top: 20px;
                border-radius: 8px;
                display: flex;
                align-items: flex-start;
                font-family: inherit;
            ">
                <img src="${getAssetUrl(INFO_ICON_FILE)}" alt="Info Icon" style="
                    width: 24px;
                    height: 24px;
                    min-width: 24px;
                    margin-right: 15px;
                    filter: invert(33%) sepia(91%) saturate(2224%) hue-rotate(188deg) brightness(97%) contrast(92%);
                ">
                <div>
                    <h4 style="font-weight: 700; font-size: 1rem; margin: 0 0 5px 0; color: #01579B;">
                        ClassCharts Improver is active
                    </h4>
                    <p style="font-size: 0.9rem; margin: 0; line-height: 1.4;">
                        This extension adds features like Personal Notes, Goals Tracker, and custom styling to your account.
                    </p>
                </div>
            </div>
        `;
        targetDiv.insertAdjacentHTML('afterend', alertHtml);
    }
}

function injectDetentionCelebration() {
    const detentionPage = document.querySelector('.detentions-page');
    if (!detentionPage) return;

    if (detentionPage.querySelector('.cc-improver-detention-success')) return;

    const statusParagraphs = Array.from(detentionPage.querySelectorAll('p'));
    const noDetentionTextCount = statusParagraphs.filter(p => p.textContent.trim() === 'No detentions for this status.').length;

    if (noDetentionTextCount >= 3) {
        Array.from(detentionPage.children).forEach(child => child.style.display = 'none');

        const successHtml = `
            <div class="cc-improver-detention-success" style="
                text-align: center; 
                padding: 60px 20px; 
                animation: fadeIn 0.5s ease-out;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            ">
                <img src="${CONFETTI_IMAGE_URL}" alt="Celebration" style="
                    width: 150px; 
                    height: auto; 
                    margin-bottom: 24px;
                    border-radius: 12px;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                ">
                <h2 style="
                    color: ${POSITIVE_GREEN}; 
                    font-weight: 800; 
                    font-size: 1.5rem;
                    margin: 0;
                    line-height: 1.4;
                ">You have no upcoming or past detentions!</h2>
                <style>
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                </style>
            </div>
        `;
        detentionPage.insertAdjacentHTML('beforeend', successHtml);
    }
}

function showRefreshTweaksModal() {
    const bodyHtml = `
        <div style="font-size: 1rem; color: #333; line-height: 1.5; margin-bottom: 25px;">
            <p>This action will reload the page to restart the ClassCharts Improver extension.</p>
            <p style="margin-top: 10px;">This is useful if you notice any custom tweaks (like icons, notes, or layout changes) not appearing correctly on the current page.</p>
            <p style="margin-top: 15px; font-weight: 600; color: #E53935;">⚠️ Any unsaved work on the ClassCharts page itself (e.g., editing homework) will be lost.</p>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button id="cc-refresh-cancel-btn" class="cc-notes-button cc-notes-cancel-btn">Cancel</button>
            <button id="cc-refresh-continue-btn" class="cc-notes-button cc-notes-save-btn">Continue & Refresh</button>
        </div>
    `;
    const { closeModal } = createBaseModal('cc-refresh-tweaks', 'Refresh Extension Tweaks', bodyHtml, '450px');

    document.getElementById('cc-refresh-cancel-btn').addEventListener('click', closeModal);
    document.getElementById('cc-refresh-continue-btn').addEventListener('click', () => {
        window.location.reload();
    });
}

function injectRefreshTweaksButton() {
    const myCodeButton = document.querySelector('.my-code-button');
    const injectedClass = 'cc-improver-refresh-button';

    if (myCodeButton && !document.querySelector('.' + injectedClass)) {
        const refreshButton = myCodeButton.cloneNode(true);
        refreshButton.classList.add(injectedClass);
        const label = refreshButton.querySelector('.MuiButton-label');
        if (label) {
            label.textContent = 'Refresh Tweaks';
        }
        refreshButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            showRefreshTweaksModal();
        });
        myCodeButton.insertAdjacentElement('beforebegin', refreshButton);
    }
}

function initObserver() {
    let attempts = 0;
    const maxAttempts = 30;

    applyAccentColor();
    getCloudSession().then((session) => {
        if (session?.access_token) {
            pullSettingsFromCloud().catch(() => {});
            startAutoCloudSync();
        }
    });

    replaceClassChartsLogo();
    applyImprovedUI(getImprovedUIStatus());
    applyHomeworkRedesign();
    applyCustomProfilePhoto();
    updateCustomIcons();

    const interval = setInterval(() => {
        const menuInjected = document.querySelector('.cc-improver-header');

        updateDefaultIcons();
        updateCustomIcons();
        injectHomeworkDateHint();
        applyHomeworkRedesign();

        if (!menuInjected) {
            if (createMenuItem()) {
                checkAndShowModals();
            }
        }

        injectReportConcernWarning();
        injectContactLink();
        injectCodeWarning();
        injectMessagesPlaceholderContent();
        injectAnnouncementsDescription();
        injectRefreshTweaksButton();
        injectDetentionCelebration();

        if (attempts >= maxAttempts) {
            clearInterval(interval);
        }
        attempts++;
    }, 500);
}

injectLoginAlert();
setupKeyComboListener();
initObserver();
