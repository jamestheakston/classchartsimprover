const NOTES_STORAGE_KEY = 'classcharts_personal_notes';
const GOALS_STORAGE_KEY = 'classcharts_personal_goals';
const PROFILE_PHOTO_STORAGE_KEY = 'classcharts_custom_profile_photo';
const CURRENT_VERSION_KEY = 'classcharts_improver_version_v5_7_3';
const WELCOME_SHOWN_KEY = `classcharts_improver_welcome_shown_${CURRENT_VERSION_KEY}`;
const REVIEW_SHOWN_KEY = `classcharts_improver_review_shown_${CURRENT_VERSION_KEY}`;
const REVIEW_LAST_SHOWN_AT_KEY = 'classcharts_improver_review_last_shown_at';
const REVIEW_INTERVAL_DAYS_KEY = 'classcharts_improver_review_interval_days';
const IMPROVED_UI_KEY = 'classcharts_improver_improved_ui_enabled';
const PLUS_ONE_ICON_KEY = 'classcharts_improver_plus_one_icon';
const HOMEWORK_DATE_HINT_KEY = 'classcharts_improver_homework_date_hint_enabled';
const HOMEWORK_REDESIGN_KEY = 'classcharts_improver_homework_redesign_enabled';
const ACCENT_COLOR_KEY = 'classcharts_improver_accent_color';
const FEATURE_IMPROVED_UI_ENABLED_KEY = IMPROVED_UI_KEY;
const FEATURE_CUSTOM_POSITIVE_ICON_ENABLED_KEY = 'classcharts_improver_feature_custom_positive_icon_enabled';
const FEATURE_NOTES_ENABLED_KEY = 'classcharts_improver_feature_personal_notes_enabled';
const FEATURE_GOALS_ENABLED_KEY = 'classcharts_improver_feature_goals_enabled';
const FEATURE_PROFILE_PHOTO_ENABLED_KEY = 'classcharts_improver_feature_profile_photo_enabled';
const FEATURE_ACCENT_COLOR_ENABLED_KEY = 'classcharts_improver_feature_accent_color_enabled';
const FEATURE_REPORT_CONCERN_ENABLED_KEY = 'classcharts_improver_feature_report_concern_enabled';
const FEATURE_CONTACT_LINK_ENABLED_KEY = 'classcharts_improver_feature_contact_link_enabled';
const FEATURE_CODE_WARNING_ENABLED_KEY = 'classcharts_improver_feature_code_warning_enabled';
const FEATURE_MESSAGES_PLACEHOLDER_ENABLED_KEY = 'classcharts_improver_feature_messages_placeholder_enabled';
const FEATURE_ANNOUNCEMENTS_DESCRIPTION_ENABLED_KEY = 'classcharts_improver_feature_announcements_description_enabled';
const FEATURE_REFRESH_TWEAKS_ENABLED_KEY = 'classcharts_improver_feature_refresh_tweaks_enabled';
const FEATURE_DETENTION_CELEBRATION_ENABLED_KEY = 'classcharts_improver_feature_detention_celebration_enabled';
const FEATURE_LOGIN_ALERT_ENABLED_KEY = 'classcharts_improver_feature_login_alert_enabled';
const FEATURE_PROMPT_REVIEW_ENABLED_KEY = 'classcharts_improver_feature_prompt_review_enabled';
const FEATURE_SHOW_SAFETY_BADGES_ENABLED_KEY = 'classcharts_improver_feature_show_safety_badges_enabled';
const FEATURE_CLOUD_SYNC_ENABLED_KEY = 'classcharts_improver_feature_cloud_sync_enabled';
const FEATURE_DEVELOPER_PREVIEW_ALERT_ENABLED_KEY = 'classcharts_improver_feature_developer_preview_alert_enabled';

const DARK_MODE_ENABLED_KEY = 'classcharts_improver_dark_mode_enabled';
const SYNC_IMPROVED_UI_ENABLED_KEY = 'classcharts_improver_sync_improved_ui_enabled';
const SYNC_NOTES_ENABLED_KEY = 'classcharts_improver_sync_notes_enabled';
const SYNC_GOALS_ENABLED_KEY = 'classcharts_improver_sync_goals_enabled';
const SYNC_PROFILE_PHOTO_ENABLED_KEY = 'classcharts_improver_sync_profile_photo_enabled';
const SYNC_CUSTOM_POSITIVE_ICON_ENABLED_KEY = 'classcharts_improver_sync_custom_positive_icon_enabled';
const SYNC_ACCENT_COLOR_ENABLED_KEY = 'classcharts_improver_sync_accent_color_enabled';
const SYNC_HOMEWORK_DATE_HINT_ENABLED_KEY = 'classcharts_improver_sync_homework_date_hint_enabled';
const SYNC_HOMEWORK_REDESIGN_ENABLED_KEY = 'classcharts_improver_sync_homework_redesign_enabled';
const SYNC_DARK_MODE_ENABLED_KEY = 'classcharts_improver_sync_dark_mode_enabled';
const SYNC_PROMPT_REVIEW_ENABLED_KEY = 'classcharts_improver_sync_prompt_review_enabled';

function getStoredBoolean(key, defaultValue) {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) return defaultValue;
    return raw === 'true';
}

function setStoredBoolean(key, enabled) {
    localStorage.setItem(key, enabled ? 'true' : 'false');
}

function isCloudSyncEnabled() {
    return getStoredBoolean(FEATURE_CLOUD_SYNC_ENABLED_KEY, true);
}

function isCustomPositiveIconEnabled() {
    return getStoredBoolean(FEATURE_CUSTOM_POSITIVE_ICON_ENABLED_KEY, true);
}

function isNotesEnabled() {
    return getStoredBoolean(FEATURE_NOTES_ENABLED_KEY, true);
}

function isGoalsEnabled() {
    return getStoredBoolean(FEATURE_GOALS_ENABLED_KEY, true);
}

function isProfilePhotoEnabled() {
    return getStoredBoolean(FEATURE_PROFILE_PHOTO_ENABLED_KEY, true);
}

function isAccentColorEnabled() {
    return getStoredBoolean(FEATURE_ACCENT_COLOR_ENABLED_KEY, true);
}

function isFeatureEnabledByKey(key, defaultValue = true) {
    return getStoredBoolean(key, defaultValue);
}

function getDarkModeEnabled() {
    return getStoredBoolean(DARK_MODE_ENABLED_KEY, false);
}

function setDarkModeEnabled(enabled) {
    setStoredBoolean(DARK_MODE_ENABLED_KEY, enabled);
    applyDarkMode();
    scheduleCloudSync();
}

function applyDarkMode() {
    const enabled = getDarkModeEnabled();
    document.documentElement.classList.toggle('cc-improver-dark-mode', enabled);

    // Used by modal CSS (createBaseModal) so it can theme consistently.
    if (enabled) {
        document.documentElement.style.setProperty('--cc-improver-modal-bg', '#0b1220');
        document.documentElement.style.setProperty('--cc-improver-modal-fg', '#e5e7eb');
        document.documentElement.style.setProperty('--cc-improver-modal-header-bg', '#0f172a');
        document.documentElement.style.setProperty('--cc-improver-settings-card-bg', '#0f172a');
    } else {
        document.documentElement.style.setProperty('--cc-improver-modal-bg', 'white');
        document.documentElement.style.setProperty('--cc-improver-modal-fg', '#111827');
        document.documentElement.style.setProperty('--cc-improver-modal-header-bg', '#f7f7f7');
        document.documentElement.style.setProperty('--cc-improver-settings-card-bg', '#fff');
    }
}

function isSyncEnabled(key, defaultValue = true) {
    return getStoredBoolean(key, defaultValue);
}

function getSyncSettings() {
    return {
        improved_ui_enabled: isSyncEnabled(SYNC_IMPROVED_UI_ENABLED_KEY, true),
        notes_enabled: isSyncEnabled(SYNC_NOTES_ENABLED_KEY, true),
        goals_enabled: isSyncEnabled(SYNC_GOALS_ENABLED_KEY, true),
        profile_photo_enabled: isSyncEnabled(SYNC_PROFILE_PHOTO_ENABLED_KEY, true),
        custom_positive_icon_enabled: isSyncEnabled(SYNC_CUSTOM_POSITIVE_ICON_ENABLED_KEY, true),
        accent_color_enabled: isSyncEnabled(SYNC_ACCENT_COLOR_ENABLED_KEY, true),
        homework_date_hint_enabled: isSyncEnabled(SYNC_HOMEWORK_DATE_HINT_ENABLED_KEY, true),
        homework_redesign_enabled: isSyncEnabled(SYNC_HOMEWORK_REDESIGN_ENABLED_KEY, true),
        dark_mode_enabled: isSyncEnabled(SYNC_DARK_MODE_ENABLED_KEY, true),
        prompt_review_enabled: isSyncEnabled(SYNC_PROMPT_REVIEW_ENABLED_KEY, true),
    };
}

function setSyncSetting(key, enabled) {
    setStoredBoolean(key, enabled);
    scheduleCloudSync();
}
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
    const accent = isAccentColorEnabled() ? getAccentColor() : DEFAULT_ACCENT_BLUE;
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
        review_interval_days: getReviewIntervalDays(),
        updated_at: new Date().toISOString(),
    };
}

async function upsertSettingsToCloud() {
    if (!isCloudSyncEnabled()) return { ok: false, reason: 'cloud_sync_disabled' };
    const session = await ensureFreshSession();
    if (!session?.access_token || !session?.user?.id) return { ok: false, reason: 'not_connected' };

    const sync = {
        improved: isSyncEnabled(SYNC_IMPROVED_UI_ENABLED_KEY, true),
        notes: isSyncEnabled(SYNC_NOTES_ENABLED_KEY, true),
        goals: isSyncEnabled(SYNC_GOALS_ENABLED_KEY, true),
        profile_photo: isSyncEnabled(SYNC_PROFILE_PHOTO_ENABLED_KEY, true),
        custom_positive_icon: isSyncEnabled(SYNC_CUSTOM_POSITIVE_ICON_ENABLED_KEY, true),
        accent_color: isSyncEnabled(SYNC_ACCENT_COLOR_ENABLED_KEY, true),
        homework_date_hint: isSyncEnabled(SYNC_HOMEWORK_DATE_HINT_ENABLED_KEY, true),
        homework_redesign: isSyncEnabled(SYNC_HOMEWORK_REDESIGN_ENABLED_KEY, true),
        dark_mode: isSyncEnabled(SYNC_DARK_MODE_ENABLED_KEY, true),
        prompt_review: isSyncEnabled(SYNC_PROMPT_REVIEW_ENABLED_KEY, true),
    };

    // Always persist "what to sync" so other devices know what to apply.
    const body = {
        user_id: session.user.id,
        sync_improved_ui_enabled: sync.improved,
        sync_notes_enabled: sync.notes,
        sync_goals_enabled: sync.goals,
        sync_profile_photo_enabled: sync.profile_photo,
        sync_custom_positive_icon_enabled: sync.custom_positive_icon,
        sync_accent_color_enabled: sync.accent_color,
        sync_homework_date_hint_enabled: sync.homework_date_hint,
        sync_homework_redesign_enabled: sync.homework_redesign,
        sync_dark_mode_enabled: sync.dark_mode,
        sync_prompt_review_enabled: sync.prompt_review,
        updated_at: new Date().toISOString(),
    };

    if (sync.improved) body.improved_ui_enabled = getImprovedUIStatus();
    if (sync.notes) {
        body.notes_enabled = isNotesEnabled();
        body.notes = loadNotes();
    }
    if (sync.goals) {
        body.goals_enabled = isGoalsEnabled();
        body.goals = loadGoals();
    }
    if (sync.profile_photo) {
        body.profile_photo_enabled = isProfilePhotoEnabled();
        body.profile_photo = loadCustomProfilePhoto();
    }
    if (sync.custom_positive_icon) {
        body.custom_positive_icon_enabled = isCustomPositiveIconEnabled();
        body.plus_one_icon = getPlusOneIcon();
    }
    if (sync.accent_color) {
        body.accent_color_enabled = isAccentColorEnabled();
        body.accent_color = getAccentColor();
    }
    if (sync.homework_date_hint) body.homework_date_hint_enabled = getHomeworkDateHintStatus();
    if (sync.homework_redesign) body.homework_redesign_enabled = getHomeworkRedesignStatus();
    if (sync.dark_mode) body.dark_mode_enabled = getDarkModeEnabled();
    if (sync.prompt_review) {
        body.prompt_review_enabled = getStoredBoolean(FEATURE_PROMPT_REVIEW_ENABLED_KEY, true);
        body.review_interval_days = getReviewIntervalDays();
    }

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
    if (!isCloudSyncEnabled()) return { ok: false, reason: 'cloud_sync_disabled' };
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

    // Persist sync selection locally first (so we know what to apply).
    if (typeof row.sync_improved_ui_enabled === 'boolean') setStoredBoolean(SYNC_IMPROVED_UI_ENABLED_KEY, row.sync_improved_ui_enabled);
    if (typeof row.sync_notes_enabled === 'boolean') setStoredBoolean(SYNC_NOTES_ENABLED_KEY, row.sync_notes_enabled);
    if (typeof row.sync_goals_enabled === 'boolean') setStoredBoolean(SYNC_GOALS_ENABLED_KEY, row.sync_goals_enabled);
    if (typeof row.sync_profile_photo_enabled === 'boolean') setStoredBoolean(SYNC_PROFILE_PHOTO_ENABLED_KEY, row.sync_profile_photo_enabled);
    if (typeof row.sync_custom_positive_icon_enabled === 'boolean') setStoredBoolean(SYNC_CUSTOM_POSITIVE_ICON_ENABLED_KEY, row.sync_custom_positive_icon_enabled);
    if (typeof row.sync_accent_color_enabled === 'boolean') setStoredBoolean(SYNC_ACCENT_COLOR_ENABLED_KEY, row.sync_accent_color_enabled);
    if (typeof row.sync_homework_date_hint_enabled === 'boolean') setStoredBoolean(SYNC_HOMEWORK_DATE_HINT_ENABLED_KEY, row.sync_homework_date_hint_enabled);
    if (typeof row.sync_homework_redesign_enabled === 'boolean') setStoredBoolean(SYNC_HOMEWORK_REDESIGN_ENABLED_KEY, row.sync_homework_redesign_enabled);
    if (typeof row.sync_dark_mode_enabled === 'boolean') setStoredBoolean(SYNC_DARK_MODE_ENABLED_KEY, row.sync_dark_mode_enabled);
    if (typeof row.sync_prompt_review_enabled === 'boolean') setStoredBoolean(SYNC_PROMPT_REVIEW_ENABLED_KEY, row.sync_prompt_review_enabled);

    const sync = {
        improved: isSyncEnabled(SYNC_IMPROVED_UI_ENABLED_KEY, true),
        notes: isSyncEnabled(SYNC_NOTES_ENABLED_KEY, true),
        goals: isSyncEnabled(SYNC_GOALS_ENABLED_KEY, true),
        profile_photo: isSyncEnabled(SYNC_PROFILE_PHOTO_ENABLED_KEY, true),
        custom_positive_icon: isSyncEnabled(SYNC_CUSTOM_POSITIVE_ICON_ENABLED_KEY, true),
        accent_color: isSyncEnabled(SYNC_ACCENT_COLOR_ENABLED_KEY, true),
        homework_date_hint: isSyncEnabled(SYNC_HOMEWORK_DATE_HINT_ENABLED_KEY, true),
        homework_redesign: isSyncEnabled(SYNC_HOMEWORK_REDESIGN_ENABLED_KEY, true),
        dark_mode: isSyncEnabled(SYNC_DARK_MODE_ENABLED_KEY, true),
        prompt_review: isSyncEnabled(SYNC_PROMPT_REVIEW_ENABLED_KEY, true),
    };

    if (sync.improved && typeof row.improved_ui_enabled === 'boolean') {
        setStoredBoolean(FEATURE_IMPROVED_UI_ENABLED_KEY, row.improved_ui_enabled);
    }

    if (sync.notes) {
        if (typeof row.notes_enabled === 'boolean') setStoredBoolean(FEATURE_NOTES_ENABLED_KEY, row.notes_enabled);
        if (typeof row.notes === 'string') localStorage.setItem(NOTES_STORAGE_KEY, row.notes);
    }
    if (sync.goals) {
        if (typeof row.goals_enabled === 'boolean') setStoredBoolean(FEATURE_GOALS_ENABLED_KEY, row.goals_enabled);
        if (row.goals) localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(row.goals));
    }
    if (sync.profile_photo) {
        if (typeof row.profile_photo_enabled === 'boolean') setStoredBoolean(FEATURE_PROFILE_PHOTO_ENABLED_KEY, row.profile_photo_enabled);
        if (typeof row.profile_photo === 'string') localStorage.setItem(PROFILE_PHOTO_STORAGE_KEY, row.profile_photo);
        if (row.profile_photo === null) localStorage.removeItem(PROFILE_PHOTO_STORAGE_KEY);
    }
    if (sync.custom_positive_icon) {
        if (typeof row.custom_positive_icon_enabled === 'boolean') setStoredBoolean(FEATURE_CUSTOM_POSITIVE_ICON_ENABLED_KEY, row.custom_positive_icon_enabled);
        if (typeof row.plus_one_icon === 'string') localStorage.setItem(PLUS_ONE_ICON_KEY, row.plus_one_icon);
    }
    if (sync.accent_color) {
        if (typeof row.accent_color_enabled === 'boolean') setStoredBoolean(FEATURE_ACCENT_COLOR_ENABLED_KEY, row.accent_color_enabled);
        if (typeof row.accent_color === 'string') localStorage.setItem(ACCENT_COLOR_KEY, row.accent_color);
    }
    if (sync.homework_date_hint && typeof row.homework_date_hint_enabled === 'boolean') {
        localStorage.setItem(HOMEWORK_DATE_HINT_KEY, row.homework_date_hint_enabled ? 'true' : 'false');
    }
    if (sync.homework_redesign && typeof row.homework_redesign_enabled === 'boolean') {
        localStorage.setItem(HOMEWORK_REDESIGN_KEY, row.homework_redesign_enabled ? 'true' : 'false');
    }
    if (sync.dark_mode && typeof row.dark_mode_enabled === 'boolean') {
        setStoredBoolean(DARK_MODE_ENABLED_KEY, row.dark_mode_enabled);
    }
    if (sync.prompt_review) {
        if (typeof row.prompt_review_enabled === 'boolean') setStoredBoolean(FEATURE_PROMPT_REVIEW_ENABLED_KEY, row.prompt_review_enabled);
        if (typeof row.review_interval_days === 'number') {
            localStorage.setItem(REVIEW_INTERVAL_DAYS_KEY, String(Math.min(Math.max(Math.floor(row.review_interval_days), 1), 365)));
        }
    }

    applyDarkMode();
    applyImprovedUI(getImprovedUIStatus());
    applyAccentColor();
    applyCustomProfilePhoto();
    updateCustomIcons();
    applyHomeworkRedesign();
    injectHomeworkDateHint();

    return { ok: true };
}

let cloudSyncTimer = null;
function scheduleCloudSync() {
    if (!isCloudSyncEnabled()) return;
    if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
    cloudSyncTimer = setTimeout(() => {
        upsertSettingsToCloud().catch(() => {});
    }, 800);
}

let autoSyncInterval = null;
function startAutoCloudSync() {
    if (!isCloudSyncEnabled()) return;
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

const MENU_ICON_RULES = [
    { match: ['overview'], icon: 'home.svg' },
    { match: ['announcements', 'announcement'], icon: 'share-2.svg' },
    { match: ['homework'], icon: 'clipboard.svg' },
    { match: ['detentions', 'detention'], icon: 'clock.svg' },
    { match: ['wellbeing', 'well-being'], icon: 'smile.svg' },
    { match: ['timetable', 'time table'], icon: 'calendar.svg' },
    { match: ['badges', 'rewards', 'reward', 'my rewards', 'my reward'], icon: 'bar-chart-2.svg' },
    { match: ['behaviour', 'behavior'], icon: 'home.svg' },
    { match: ['messages', 'message'], icon: 'message-square.svg' },
    { match: ['shop', 'store'], icon: 'shopping-bag.svg' },
    { match: ['clubs'], icon: 'users.svg' },
    { match: ['attendance'], icon: 'check-square.svg' }
];

function normalizeMenuLabel(text) {
    return (text || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function resolveMenuIconFromLabel(label) {
    const normalized = normalizeMenuLabel(label);
    for (const rule of MENU_ICON_RULES) {
        if (rule.match.some(fragment => normalized.includes(fragment))) return rule.icon;
    }
    return null;
}

function getReviewIntervalDays() {
    const raw = Number(localStorage.getItem(REVIEW_INTERVAL_DAYS_KEY));
    if (!Number.isFinite(raw) || raw < 1) return 30;
    return Math.min(raw, 365);
}

function setReviewIntervalDays(days) {
    const clamped = Math.min(Math.max(Number(days) || 30, 1), 365);
    localStorage.setItem(REVIEW_INTERVAL_DAYS_KEY, String(clamped));
    scheduleCloudSync();
}

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
    return getStoredBoolean(FEATURE_IMPROVED_UI_ENABLED_KEY, true);
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
    const updateDrawerSafetyStyles = () => {
        const styleId = 'cc-improver-drawer-safety-styles';
        const existing = document.getElementById(styleId);
        if (!enabled) {
            if (existing) existing.remove();
            return;
        }
        if (existing) return;
        const s = document.createElement('style');
        s.id = styleId;
        s.textContent = `
            .desktop-drawer-pupil-menu-item,
            .desktop-drawer-pupil-menu-item * {
                visibility: visible !important;
            }
            .desktop-drawer-pupil-menu-item .MuiListItemText-root,
            .desktop-drawer-pupil-menu-item .MuiListItemIcon-root {
                opacity: 1 !important;
            }
        `;
        document.head.appendChild(s);
    };

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
        updateDrawerSafetyStyles();
    } else {
        body.classList.remove('cc-improver-improved-ui');
        const style = document.getElementById('cc-improver-ui-styles');
        if (style) style.remove();
        updateDrawerSafetyStyles();
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
                color: #1d4fd8 !important;
                text-decoration: underline !important;
                pointer-events: auto !important;
                position: relative !important;
                z-index: 1 !important;
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
    if (!iconFile) return;
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
            img.addEventListener('error', () => {
                img.remove();
                if (originalIcon && originalIcon.hasAttribute('data-cc-improver-original-display')) {
                    originalIcon.style.display = originalIcon.getAttribute('data-cc-improver-original-display');
                    originalIcon.removeAttribute('data-cc-improver-original-display');
                }
            });
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
    defaultMenuItems.forEach((item) => {
        const textSpan = item.querySelector('.MuiListItemText-primary');
        if (!textSpan) return;
        const rawText = (textSpan.textContent || '').trim();
        const normalized = normalizeMenuLabel(rawText);

        // Special case requested: show the "Home" label for Behaviour menu item.
        if (normalized.includes('behaviour') || normalized.includes('behavior')) {
            textSpan.textContent = 'Home';
            replaceIcon(item, 'home.svg');
            return;
        }

        const iconFile = resolveMenuIconFromLabel(rawText);
        if (iconFile) replaceIcon(item, iconFile);
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

    const notesItem = isNotesEnabled() ? createItem('Personal Notes', NOTES_ICON_FILE, (event) => {
        event.preventDefault();
        event.stopPropagation();
        showNotesModal();
    }, 'cc-improver-notes-menu-item') : null;

    const goalsItem = isGoalsEnabled() ? createItem('Goals Tracker', GOALS_ICON_FILE, (event) => {
        event.preventDefault();
        event.stopPropagation();
        showGoalsModal();
    }, 'cc-improver-goals-menu-item') : null;

    const settingsHubItem = createItem('Settings & Customization', SETTINGS_ICON_FILE, (event) => {
        event.preventDefault();
        event.stopPropagation();
        showAllSettingsModal();
    }, 'cc-improver-settings-hub-menu-item');

    const improverHeaderHtml = `
        <div class="cc-improver-header" style="padding: 16px; padding-bottom: 8px; font-weight: 700; color: rgba(0, 0, 0, 0.54); font-size: 0.875rem; text-transform: uppercase;">
            ClassCharts Improver
        </div>
        <div class="cc-improver-divider" style="height: 1px; background-color: rgba(0, 0, 0, 0.12); margin: 0 16px;"></div>
    `;

    const finalDividerHtml = `<div class="cc-improver-divider" style="height: 1px; background-color: rgba(0, 0, 0, 0.12); margin: 0 16px;"></div>`;

    if (notesItem) {
        messagesItem.after(notesItem);
        notesItem.insertAdjacentHTML('beforebegin', improverHeaderHtml);
        if (goalsItem) {
            notesItem.after(goalsItem);
            goalsItem.after(settingsHubItem);
        } else {
            notesItem.after(settingsHubItem);
        }
    } else if (goalsItem) {
        messagesItem.after(goalsItem);
        goalsItem.insertAdjacentHTML('beforebegin', improverHeaderHtml);
        goalsItem.after(settingsHubItem);
    } else {
        messagesItem.after(settingsHubItem);
        settingsHubItem.insertAdjacentHTML('beforebegin', improverHeaderHtml);
    }
    
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

    settingsHubItem.insertAdjacentHTML('afterend', finalDividerHtml);

    return true;
}

function createBaseModal(idPrefix, title, bodyHtml, maxWidth = '500px') {
    const wrappedTitle = `<span class="${idPrefix}-modal-title-text">${title}</span>`;
    const modalHtml = `
        <style>
            .${idPrefix}-modal-card {
                background-color: var(--cc-improver-modal-bg, white);
                color: var(--cc-improver-modal-fg, #111827);
                border-radius: 12px;
                width: 90%;
                max-width: ${maxWidth};
                box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
                font-family: Inter, Roboto, "Helvetica Neue", Arial, sans-serif;
                overflow: auto;
                max-height: 85vh;
            }
            .${idPrefix}-modal-header {
                padding: 18px 24px;
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--cc-improver-modal-fg, #111827);
                border-bottom: 1px solid #e0e0e0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: var(--cc-improver-modal-header-bg, #f7f7f7);
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
            .cc-settings-stack {
                display: flex;
                flex-direction: column;
                gap: 14px;
            }
            .cc-settings-card {
                padding: 14px;
                border: 1px solid #e5e7eb;
                border-radius: 14px;
                background: var(--cc-improver-settings-card-bg, #fff);
            }
            .cc-settings-card-soft {
                padding: 14px;
                border: 1px solid #e5e7eb;
                border-radius: 14px;
                background: linear-gradient(135deg, #f8fafc, #ffffff);
            }
            .cc-settings-title {
                font-size: 0.95rem;
                font-weight: 700;
                color: #111827;
                margin: 0 0 6px 0;
            }
            .cc-settings-subtitle {
                font-size: 0.82rem;
                color: #6b7280;
                margin: 0;
                line-height: 1.4;
            }
            .cc-settings-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
                flex-wrap: wrap;
            }
            .hidden {
                display: none !important;
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
        <div class="cc-settings-card-soft" style="margin-bottom: 18px;">
            <p style="font-size: 0.95rem; color: #374151; margin: 0;">
                Manage all ClassCharts Improver settings and customizations in one place.
            </p>
        </div>
        <div class="cc-settings-stack">
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
            <button id="cc-open-feature-controls-modal" class="cc-settings-hub-button" style="
                background-color: #EEF2FF;
                color: #4338CA;
                border: 1px solid #4338CA;
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
                Feature Controls
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
            <button id="cc-open-about-modal" class="cc-settings-hub-button" style="
                background-color: #F3E8FF;
                color: #7E22CE;
                border: 1px solid #7E22CE;
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
                About
                <span style="font-size: 1.5rem; line-height: 1;">&rarr;</span>
            </button>
        </div>
        <div class="cc-settings-actions">
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

    document.getElementById('cc-open-feature-controls-modal').addEventListener('click', () => {
        closeModal();
        showFeatureControlsModal();
    });

    document.getElementById('cc-open-account-sync-modal').addEventListener('click', () => {
        closeModal();
        showAccountSyncModal();
    });

    document.getElementById('cc-open-about-modal').addEventListener('click', () => {
        closeModal();
        showAboutModal();
    });
}

function showFeatureControlsModal() {
    const showBadges = getStoredBoolean(FEATURE_SHOW_SAFETY_BADGES_ENABLED_KEY, true);

    const checkbox = (id) => {
        const checked = getStoredBoolean(id, true) ? 'checked' : '';
        return `
            <input type="checkbox" id="${id}" ${checked} style="width: 18px; height: 18px;">
        `;
    };

    const rows = [
        { key: FEATURE_IMPROVED_UI_ENABLED_KEY, label: 'Improved UI', badge: '🟢', defaultEnabled: true },
        { key: HOMEWORK_REDESIGN_KEY, label: 'Homework tab redesign', badge: '🟢', defaultEnabled: false },
        { key: HOMEWORK_DATE_HINT_KEY, label: 'Homework due date hint', badge: '🟢', defaultEnabled: false },
        { key: FEATURE_CUSTOM_POSITIVE_ICON_ENABLED_KEY, label: 'Custom +1 icon replacement', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_ACCENT_COLOR_ENABLED_KEY, label: 'Custom accent colour', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_PROFILE_PHOTO_ENABLED_KEY, label: 'Custom profile photo', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_NOTES_ENABLED_KEY, label: 'Personal Notes', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_GOALS_ENABLED_KEY, label: 'Goals Tracker', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_REPORT_CONCERN_ENABLED_KEY, label: 'Report concern warning', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_CONTACT_LINK_ENABLED_KEY, label: 'Contact extension link', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_CODE_WARNING_ENABLED_KEY, label: '“My code” warning', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_MESSAGES_PLACEHOLDER_ENABLED_KEY, label: 'Messages guide placeholder', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_ANNOUNCEMENTS_DESCRIPTION_ENABLED_KEY, label: 'Announcements description', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_REFRESH_TWEAKS_ENABLED_KEY, label: 'Refresh Tweaks button', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_DETENTION_CELEBRATION_ENABLED_KEY, label: 'Detention celebration', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_LOGIN_ALERT_ENABLED_KEY, label: 'Login active notice', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_PROMPT_REVIEW_ENABLED_KEY, label: 'Welcome/Review prompts', badge: '🟢', defaultEnabled: true },
        { key: FEATURE_CLOUD_SYNC_ENABLED_KEY, label: 'Cloud sync (Supabase)', badge: '🟠', defaultEnabled: true },
        { key: FEATURE_DEVELOPER_PREVIEW_ALERT_ENABLED_KEY, label: 'Developer Preview Alert', badge: 'yellow', defaultEnabled: true },
        { key: FEATURE_SHOW_SAFETY_BADGES_ENABLED_KEY, label: 'Show safety emojis in this list', badge: 'green', defaultEnabled: true },
        { key: DARK_MODE_ENABLED_KEY, label: 'Dark mode (extension UI)', badge: '🟢', defaultEnabled: false },
    ];

    const bodyHtml = `
        <div class="cc-settings-stack">
            <div class="cc-settings-card-soft">
                <p class="cc-settings-subtitle" style="font-size:0.9rem;">
                    Toggle each feature on/off. Changes take effect immediately (within a moment).
                </p>
            </div>

            ${rows.map(r => {
        const checked = getStoredBoolean(r.key, r.defaultEnabled);
        return `
                <div class="cc-settings-card" style="display:flex; align-items:center; justify-content: space-between; gap: 14px;">
                    <div style="display:flex; align-items:center; gap: 10px; min-width: 0;">
                        <span class="cc-safety-badge ${showBadges ? '' : 'hidden'}" style="width: 28px; text-align:center; font-size: 18px;">${r.badge}</span>
                        <div style="display:flex; flex-direction: column; gap: 2px; min-width: 0;">
                            <div style="font-weight: 700; color: #111827; white-space: nowrap; overflow:hidden; text-overflow: ellipsis;">${r.label}</div>
                            <div style="font-size: 0.8rem; color:#6b7280;">${r.key === FEATURE_CLOUD_SYNC_ENABLED_KEY ? 'Syncing to Supabase when connected.' : 'Visual/UI-only unless otherwise noted.'}</div>
                        </div>
                    </div>
                    <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
                        <input type="checkbox" id="${r.key}" ${checked ? 'checked' : ''}>
                    </label>
                </div>
            `;
    }).join('')}

            <div class="cc-settings-actions" style="margin-top: 6px;">
                <button id="cc-feature-controls-done" class="cc-notes-button cc-notes-save-btn">Done</button>
            </div>
        </div>
    `;

    const { closeModal } = createBaseModal('cc-feature-controls', 'Feature Controls', bodyHtml, '560px');
    document.getElementById('cc-feature-controls-done').addEventListener('click', closeModal);

    // Apply immediate behavior when toggles change
    const applyImmediately = () => {
        applyImprovedUI(getImprovedUIStatus());
        applyAccentColor();
        applyCustomProfilePhoto();
        updateCustomIcons();
        injectHomeworkDateHint();
        applyHomeworkRedesign();
        applyDarkMode();

        // Rebuild menu if notes/goals toggles changed
        const menuInjected = document.querySelector('.cc-improver-header');
        if (menuInjected) {
            document.querySelectorAll('#cc-improver-notes-menu-item, #cc-improver-goals-menu-item, #cc-improver-settings-hub-menu-item, .cc-improver-header, .cc-improver-divider')
                .forEach(el => el.remove());
        }
        if (!document.querySelector('.cc-improver-header') && (isNotesEnabled() || isGoalsEnabled())) {
            const possible = document.querySelector(MESSAGE_MENU_SELECTOR);
            if (possible) createMenuItem();
        } else if (!document.querySelector('.cc-improver-header')) {
            const possible = document.querySelector(MESSAGE_MENU_SELECTOR);
            if (possible) createMenuItem();
        }
    };

    rows.forEach(r => {
        const el = document.getElementById(r.key);
        if (!el) return;
        el.addEventListener('change', () => {
            if (r.key === HOMEWORK_REDESIGN_KEY) setHomeworkRedesignStatus(el.checked);
            else if (r.key === HOMEWORK_DATE_HINT_KEY) setHomeworkDateHintStatus(el.checked);
            else if (r.key === DARK_MODE_ENABLED_KEY) setDarkModeEnabled(el.checked);
            else setStoredBoolean(r.key, el.checked);

            if (r.key === FEATURE_CLOUD_SYNC_ENABLED_KEY) {
                if (!el.checked && autoSyncInterval) {
                    clearInterval(autoSyncInterval);
                    autoSyncInterval = null;
                }
                if (el.checked) {
                    getCloudSession().then((s) => {
                        if (s?.access_token) {
                            pullSettingsFromCloud().catch(() => {});
                            startAutoCloudSync();
                        }
                    });
                }
            }

            // Show/hide badges live
            if (r.key === FEATURE_SHOW_SAFETY_BADGES_ENABLED_KEY) {
                const hide = !el.checked;
                document.querySelectorAll('.cc-safety-badge').forEach(b => {
                    if (hide) b.classList.add('hidden');
                    else b.classList.remove('hidden');
                });
            }

            // Homework toggles use existing setters to stay consistent
            if (r.key === HOMEWORK_REDESIGN_KEY) applyHomeworkRedesign();
            if (r.key === HOMEWORK_DATE_HINT_KEY) injectHomeworkDateHint();

            applyImmediately();
        });
    });
}

function showUITweaksModal() {
    const isRedesignEnabled = getHomeworkRedesignStatus();
    const reviewIntervalDays = getReviewIntervalDays();

    const bodyHtml = `
        <div class="cc-settings-stack">
            <div class="cc-settings-card-soft">
                <p class="cc-settings-subtitle">Fine-tune the look and feel of the student portal.</p>
            </div>

            <div class="cc-settings-card" style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-weight: 600; color: #111827;">Homework Tab Redesign</span>
                    <span style="font-size: 0.75rem; color: #6b7280;">Enable a cleaner, more modern layout for homework cards.</span>
                </div>
                <label class="cc-switch">
                    <input type="checkbox" id="cc-homework-redesign-toggle" ${isRedesignEnabled ? 'checked' : ''}>
                    <span class="cc-slider round"></span>
                </label>
            </div>
            
            <div class="cc-settings-card">
                <div class="cc-improver-new-func-label" style="font-size: 0.75rem; color: #9ca3af; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px; margin-bottom: 12px;">New Functionality</div>
                <p style="font-size: 0.85rem; color: #4b5563;">Additional customization options are added here as they are developed.</p>
            </div>

            <div class="cc-settings-card" style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-weight: 600; color: #111827;">"Enjoying the Improver?" Prompt</span>
                    <span style="font-size: 0.75rem; color: #6b7280;">Show the review prompt every N days.</span>
                </div>
                <input id="cc-review-interval-days" type="number" min="1" max="365" value="${reviewIntervalDays}" class="cc-add-goal-input" style="width: 90px;">
            </div>
        </div>

        <div class="cc-settings-actions" style="margin-top: 24px;">
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

    document.getElementById('cc-review-interval-days').addEventListener('change', (e) => {
        setReviewIntervalDays(e.target.value);
    });
}

function showAccountSyncModal() {
    const bodyHtml = `
        <div class="cc-settings-stack">
            <div class="cc-settings-card-soft">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 8px;">Cloud Sync</h4>
                <p class="cc-settings-subtitle" style="color: #4b5563; line-height: 1.4;">
                    Your settings are stored locally on this device by default. When connected, they sync automatically to Supabase (server region: ${SUPABASE_REGION_LABEL}).
                </p>
                <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-top: 12px;">
                    <p style="margin: 0; font-size: 0.85rem; color: #6b7280;">
                        By connecting an account, you agree to our 
                        <a href="https://classchartsimprover.pages.dev/privacy" target="_blank" style="color: ${PRIMARY_BLUE}; text-decoration: underline; font-weight: 600;">Privacy Policy</a> and 
                        <a href="https://classchartsimprover.pages.dev/terms" target="_blank" style="color: ${PRIMARY_BLUE}; text-decoration: underline; font-weight: 600;">Terms & Conditions</a>.
                    </p>
                </div>
            </div>

            <div id="cc-sync-status" style="padding: 12px; border-radius: 12px; border: 1px solid #e5e7eb; background: #f9fafb; font-size: 0.85rem; color: #374151; margin-bottom: 16px;">
                Checking connection...
            </div>

            <div class="cc-settings-card">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 12px;">Quick Connect</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <button id="cc-sync-connect-github" class="cc-notes-button cc-notes-save-btn" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px;">
                        <img src="${getAssetUrl('github.svg')}" alt="" style="width: 18px; height: 18px;">
                        GitHub
                    </button>
                    <button id="cc-sync-connect-google" class="cc-notes-button cc-notes-save-btn" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: #4285f4; border-color: #4285f4;">
                        <img src="${getAssetUrl('chrome.svg')}" alt="" style="width: 18px; height: 18px; filter: brightness(0) invert(1);">
                        Google
                    </button>
                </div>
            </div>

            <div class="cc-settings-card">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 12px;">Email Sign In</h4>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <input id="cc-sync-email" type="email" placeholder="Email address" class="cc-add-goal-input" style="width: 100%;">
                    <input id="cc-sync-password" type="password" placeholder="Password" class="cc-add-goal-input" style="width: 100%;">
                    <div style="display: flex; gap: 8px;">
                        <button id="cc-sync-email-signin" class="cc-notes-button cc-notes-save-btn" style="flex: 1;">Sign In</button>
                        <button id="cc-sync-email-signup" class="cc-notes-button cc-goals-cancel-btn" style="flex: 1;">Sign Up</button>
                    </div>
                    <div style="font-size: 0.75rem; color: #6b7280; background: #f8f9fa; padding: 8px; border-radius: 6px;">
                        <strong>Note:</strong> After creating an account, you must confirm your email before using sync.
                    </div>
                </div>
            </div>

            <div class="cc-settings-card-soft">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 12px;">Sync Settings</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px;">
                    <label style="display:flex; align-items:center; justify-content: space-between; gap: 12px; padding: 8px 12px; border:1px solid #e5e7eb; border-radius:8px; background: white; cursor: pointer;">
                        <span style="color:#374151; font-weight:500; font-size: 0.9rem;">Personal Notes</span>
                        <input type="checkbox" id="${SYNC_NOTES_ENABLED_KEY}" ${isSyncEnabled(SYNC_NOTES_ENABLED_KEY, true) ? 'checked' : ''}>
                    </label>
                    <label style="display:flex; align-items:center; justify-content: space-between; gap: 12px; padding: 8px 12px; border:1px solid #e5e7eb; border-radius:8px; background: white; cursor: pointer;">
                        <span style="color:#374151; font-weight:500; font-size: 0.9rem;">Goals</span>
                        <input type="checkbox" id="${SYNC_GOALS_ENABLED_KEY}" ${isSyncEnabled(SYNC_GOALS_ENABLED_KEY, true) ? 'checked' : ''}>
                    </label>
                    <label style="display:flex; align-items:center; justify-content: space-between; gap: 12px; padding: 8px 12px; border:1px solid #e5e7eb; border-radius:8px; background: white; cursor: pointer;">
                        <span style="color:#374151; font-weight:500; font-size: 0.9rem;">Profile Photo</span>
                        <input type="checkbox" id="${SYNC_PROFILE_PHOTO_ENABLED_KEY}" ${isSyncEnabled(SYNC_PROFILE_PHOTO_ENABLED_KEY, true) ? 'checked' : ''}>
                    </label>
                    <label style="display:flex; align-items:center; justify-content: space-between; gap: 12px; padding: 8px 12px; border:1px solid #e5e7eb; border-radius:8px; background: white; cursor: pointer;">
                        <span style="color:#374151; font-weight:500; font-size: 0.9rem;">Custom +1 Icon</span>
                        <input type="checkbox" id="${SYNC_CUSTOM_POSITIVE_ICON_ENABLED_KEY}" ${isSyncEnabled(SYNC_CUSTOM_POSITIVE_ICON_ENABLED_KEY, true) ? 'checked' : ''}>
                    </label>
                    <label style="display:flex; align-items:center; justify-content: space-between; gap: 12px; padding: 8px 12px; border:1px solid #e5e7eb; border-radius:8px; background: white; cursor: pointer;">
                        <span style="color:#374151; font-weight:500; font-size: 0.9rem;">Accent Colour</span>
                        <input type="checkbox" id="${SYNC_ACCENT_COLOR_ENABLED_KEY}" ${isSyncEnabled(SYNC_ACCENT_COLOR_ENABLED_KEY, true) ? 'checked' : ''}>
                    </label>
                    <label style="display:flex; align-items:center; justify-content: space-between; gap: 12px; padding: 8px 12px; border:1px solid #e5e7eb; border-radius:8px; background: white; cursor: pointer;">
                        <span style="color:#374151; font-weight:500; font-size: 0.9rem;">Homework Date Hint</span>
                        <input type="checkbox" id="${SYNC_HOMEWORK_DATE_HINT_ENABLED_KEY}" ${isSyncEnabled(SYNC_HOMEWORK_DATE_HINT_ENABLED_KEY, true) ? 'checked' : ''}>
                    </label>
                    <label style="display:flex; align-items:center; justify-content: space-between; gap: 12px; padding: 8px 12px; border:1px solid #e5e7eb; border-radius:8px; background: white; cursor: pointer;">
                        <span style="color:#374151; font-weight:500; font-size: 0.9rem;">Homework Redesign</span>
                        <input type="checkbox" id="${SYNC_HOMEWORK_REDESIGN_ENABLED_KEY}" ${isSyncEnabled(SYNC_HOMEWORK_REDESIGN_ENABLED_KEY, true) ? 'checked' : ''}>
                    </label>
                    <label style="display:flex; align-items:center; justify-content: space-between; gap: 12px; padding: 8px 12px; border:1px solid #e5e7eb; border-radius:8px; background: white; cursor: pointer;">
                        <span style="color:#374151; font-weight:500; font-size: 0.9rem;">Dark Mode</span>
                        <input type="checkbox" id="${SYNC_DARK_MODE_ENABLED_KEY}" ${isSyncEnabled(SYNC_DARK_MODE_ENABLED_KEY, true) ? 'checked' : ''}>
                    </label>
                </div>
            </div>

            <div class="cc-settings-actions" style="margin-top: 16px;">
                <button id="cc-sync-pull" class="cc-notes-button cc-goals-cancel-btn">Pull Settings</button>
                <button id="cc-sync-push" class="cc-notes-button cc-notes-save-btn">Sync Now</button>
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

    const syncKeys = [
        SYNC_NOTES_ENABLED_KEY,
        SYNC_GOALS_ENABLED_KEY,
        SYNC_PROFILE_PHOTO_ENABLED_KEY,
        SYNC_CUSTOM_POSITIVE_ICON_ENABLED_KEY,
        SYNC_ACCENT_COLOR_ENABLED_KEY,
        SYNC_HOMEWORK_DATE_HINT_ENABLED_KEY,
        SYNC_HOMEWORK_REDESIGN_ENABLED_KEY,
        SYNC_DARK_MODE_ENABLED_KEY,
        SYNC_IMPROVED_UI_ENABLED_KEY
    ];
    syncKeys.forEach((key) => {
        const el = document.getElementById(key);
        if (!el) return;
        el.addEventListener('change', (e) => {
            setSyncSetting(key, e.target.checked);
        });
    });

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

    document.getElementById('cc-sync-connect-google').addEventListener('click', async () => {
        setStatus('Opening Google sign-in…', 'info');
        const resp = await bgMessage({ type: 'SUPABASE_SIGN_IN_GOOGLE' });
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
    if (!isNotesEnabled()) return;
    const showCloudWarning = isCloudSyncEnabled() && isSyncEnabled(SYNC_NOTES_ENABLED_KEY, true);
    const warningHtml = showCloudWarning ? `
        <div class="cc-settings-card-soft" style="background:#fff7ed; border:1px solid #fed7aa; border-radius:14px; margin-bottom: 14px; padding: 14px;">
            <div style="display:flex; gap:12px; align-items:flex-start;">
                <img src="${getAssetUrl('shield-off.svg')}" alt="Security warning" style="width: 22px; height: 22px; margin-top: 2px; filter: invert(53%) sepia(85%) saturate(3800%) hue-rotate(340deg) brightness(103%) contrast(90%);">
                <div>
                    <div style="font-weight:800; color:#9a3412; margin-bottom:4px;">Not encrypted</div>
                    <div style="font-size:0.88rem; color:#7c2d12; line-height:1.35; margin-bottom: 8px;">
                        If cross-device sync is enabled, your notes are stored in Supabase as plain text (not encrypted). Please review the privacy policy before enabling sync.
                    </div>
                    <a href="https://classchartsimprover.pages.dev/privacy" target="_blank" style="color:#b45309; font-weight:700; text-decoration:underline;">
                        Review privacy policy
                    </a>
                </div>
            </div>
        </div>
    ` : '';
    const bodyHtml = `
        ${warningHtml}
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
    if (!isGoalsEnabled()) return;
    const showCloudWarning = isCloudSyncEnabled() && isSyncEnabled(SYNC_GOALS_ENABLED_KEY, true);
    const warningHtml = showCloudWarning ? `
        <div class="cc-settings-card-soft" style="background:#fff7ed; border:1px solid #fed7aa; border-radius:14px; margin-bottom: 14px; padding: 14px;">
            <div style="display:flex; gap:12px; align-items:flex-start;">
                <img src="${getAssetUrl('shield-off.svg')}" alt="Security warning" style="width: 22px; height: 22px; margin-top: 2px; filter: invert(53%) sepia(85%) saturate(3800%) hue-rotate(340deg) brightness(103%) contrast(90%);">
                <div>
                    <div style="font-weight:800; color:#9a3412; margin-bottom:4px;">Not encrypted</div>
                    <div style="font-size:0.88rem; color:#7c2d12; line-height:1.35; margin-bottom: 8px;">
                        If cross-device sync is enabled, your goals are stored in Supabase as plain text/JSON (not encrypted). Please review the privacy policy before enabling sync.
                    </div>
                    <a href="https://classchartsimprover.pages.dev/privacy" target="_blank" style="color:#b45309; font-weight:700; text-decoration:underline;">
                        Review privacy policy
                    </a>
                </div>
            </div>
        </div>
    ` : '';
    const bodyHtml = `
        ${warningHtml}
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
        <div class="cc-settings-stack">
            <div class="cc-settings-card-soft">
                <p class="cc-settings-subtitle">This project enhances the ClassCharts student portal by adding helpful features. Your data is stored locally on this device by default, and can optionally sync via Supabase once you connect an account in Settings.</p>
            </div>
            <div class="cc-settings-card">
                <h4 class="cc-settings-title">Source Code</h4>
                <p class="cc-settings-subtitle" style="color: #4b5563; margin-bottom: 14px;">
                    View the source code, report issues, or contribute to the project on GitHub.
                </p>
                <a href="https://github.com/jamestheakston/classchartsimprover" target="_blank" style="
                    color: ${PRIMARY_BLUE};
                    font-weight: 800;
                    text-decoration: underline;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 12px;
                    border-radius: 10px;
                    border: 1px solid rgba(3,155,229,0.35);
                    background: rgba(3,155,229,0.06);
                ">
                    <img src="${getAssetUrl('github.svg')}" alt="GitHub" style="width: 18px; height: 18px;">
                    View on GitHub
                </a>
            </div>
            <div class="cc-settings-card">
                <h4 class="cc-settings-title">Legal</h4>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <a href="https://classchartsimprover.pages.dev/privacy" target="_blank" style="
                        color: ${PRIMARY_BLUE};
                        font-weight: 800;
                        text-decoration: underline;
                        display: inline-block;
                        padding: 10px 12px;
                        border-radius: 10px;
                        border: 1px solid rgba(3,155,229,0.35);
                        background: rgba(3,155,229,0.06);
                        flex: 1;
                        min-width: 140px;
                        text-align: center;
                    ">
                        Privacy Policy
                    </a>
                    <a href="https://classchartsimprover.pages.dev/terms" target="_blank" style="
                        color: ${PRIMARY_BLUE};
                        font-weight: 800;
                        text-decoration: underline;
                        display: inline-block;
                        padding: 10px 12px;
                        border-radius: 10px;
                        border: 1px solid rgba(3,155,229,0.35);
                        background: rgba(3,155,229,0.06);
                        flex: 1;
                        min-width: 140px;
                        text-align: center;
                    ">
                        Terms & Conditions
                    </a>
                </div>
            </div>
            <p style="font-size: 0.8rem; color: #9ca3af; margin: 0;">&copy; James Theakston 2026</p>
        </div>
        <div class="cc-settings-actions">
            <button id="cc-about-close-btn" class="cc-notes-button cc-notes-save-btn">Close</button>
        </div>
    `;
    const { closeModal } = createBaseModal('cc-about', 'About ClassCharts Improver', bodyHtml, '450px');
    const closeBtn = document.getElementById('cc-about-close-btn');
    closeBtn.addEventListener('click', closeModal);
}

function showProfilePhotoModal() {
    if (!isProfilePhotoEnabled()) return;
    const currentPhoto = loadCustomProfilePhoto() || CLASSCHARTS_DEFAULT_PHOTO_URL;
    const showCloudWarning = isCloudSyncEnabled() && isSyncEnabled(SYNC_PROFILE_PHOTO_ENABLED_KEY, true);
    const warningHtml = showCloudWarning ? `
        <div class="cc-settings-card-soft" style="background:#fff7ed; border:1px solid #fed7aa; border-radius:14px; margin-bottom: 14px; padding: 14px;">
            <div style="display:flex; gap:12px; align-items:flex-start;">
                <img src="${getAssetUrl('shield-off.svg')}" alt="Security warning" style="width: 22px; height: 22px; margin-top: 2px; filter: invert(53%) sepia(85%) saturate(3800%) hue-rotate(340deg) brightness(103%) contrast(90%);">
                <div>
                    <div style="font-weight:800; color:#9a3412; margin-bottom:4px;">Not encrypted</div>
                    <div style="font-size:0.88rem; color:#7c2d12; line-height:1.35; margin-bottom: 8px;">
                        If cross-device sync is enabled, your profile photo is stored in Supabase as an image asset (not encrypted). Please review the privacy policy before enabling sync.
                    </div>
                    <a href="https://classchartsimprover.pages.dev/privacy" target="_blank" style="color:#b45309; font-weight:700; text-decoration:underline;">
                        Review privacy policy
                    </a>
                </div>
            </div>
        </div>
    ` : '';

    const bodyHtml = `
        <div class="cc-settings-stack">
            ${warningHtml}
            <div class="cc-settings-card-soft">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 8px;">Your Privacy, Our Priority</h4>
                <p class="cc-settings-subtitle" style="color:#4b5563;">This custom profile photo is <strong>only visible to you</strong>. It is stored locally on this device until you connect an account in Settings, at which point it is stored in the cloud (Supabase) on a server in ${SUPABASE_REGION_LABEL} for cross-device sync.</p>
            </div>
            <div class="cc-settings-card" style="display: flex; flex-direction: column; align-items: center; gap: 14px;">
                <img id="cc-current-photo-preview" src="${currentPhoto}"
                    alt="Current Profile Photo"
                    style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 3px solid ${PRIMARY_BLUE};">

                <input type="file" id="cc-photo-upload-input" accept="image/*" style="display: none;">
                <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
                    <button id="cc-photo-upload-btn" class="cc-notes-button cc-notes-save-btn" style="min-width: 180px;">Upload New Photo</button>
                    <button id="cc-photo-remove-btn" class="cc-notes-button cc-goals-cancel-btn" style="min-width: 180px;">Remove Photo</button>
                </div>
            </div>
            
            <!-- Cropping Interface (Hidden by default) -->
            <div id="cc-crop-interface" class="cc-settings-card" style="display: none; flex-direction: column; gap: 14px;">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 8px;">Crop Your Photo</h4>
                <div style="position: relative; width: 300px; height: 300px; margin: 0 auto; border: 2px solid ${PRIMARY_BLUE}; border-radius: 8px; overflow: hidden; background: #f9fafb;">
                    <img id="cc-crop-image" style="position: absolute; max-width: none; transform-origin: top left;">
                    <div id="cc-crop-overlay" style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 150px;
                        height: 150px;
                        transform: translate(-50%, -50%);
                        border: 2px solid #fff;
                        box-shadow: 0 0 0 1px rgba(0,0,0,0.3);
                        pointer-events: none;
                    "></div>
                </div>
                <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
                    <button id="cc-crop-zoom-in" class="cc-notes-button cc-notes-save-btn" style="min-width: 80px; font-size: 12px;">Zoom In</button>
                    <button id="cc-crop-zoom-out" class="cc-notes-button cc-notes-save-btn" style="min-width: 80px; font-size: 12px;">Zoom Out</button>
                    <button id="cc-crop-reset" class="cc-notes-button cc-goals-cancel-btn" style="min-width: 80px; font-size: 12px;">Reset</button>
                </div>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button id="cc-crop-apply" class="cc-notes-button cc-notes-save-btn" style="min-width: 120px;">Apply Crop</button>
                    <button id="cc-crop-cancel" class="cc-notes-button cc-goals-cancel-btn" style="min-width: 120px;">Cancel</button>
                </div>
            </div>
        </div>
        <div class="cc-settings-actions" style="margin-top:24px;">
            <button id="cc-photo-close-btn" class="cc-notes-button cc-goals-cancel-btn">Done</button>
        </div>
    `;
    const { closeModal } = createBaseModal('cc-profile-photo', 'Custom Profile Photo', bodyHtml, '450px');
    const uploadInput = document.getElementById('cc-photo-upload-input');
    const uploadBtn = document.getElementById('cc-photo-upload-btn');
    const removeBtn = document.getElementById('cc-photo-remove-btn');
    const closeBtn = document.getElementById('cc-photo-close-btn');
    const previewImg = document.getElementById('cc-current-photo-preview');
    
    // Cropping interface elements
    const cropInterface = document.getElementById('cc-crop-interface');
    const cropImage = document.getElementById('cc-crop-image');
    const cropZoomIn = document.getElementById('cc-crop-zoom-in');
    const cropZoomOut = document.getElementById('cc-crop-zoom-out');
    const cropReset = document.getElementById('cc-crop-reset');
    const cropApply = document.getElementById('cc-crop-apply');
    const cropCancel = document.getElementById('cc-crop-cancel');
    
    // Cropping state
    let currentImageFile = null;
    let cropScale = 1;
    let cropX = 0;
    let cropY = 0;

    uploadBtn.addEventListener('click', () => uploadInput.click());
    closeBtn.addEventListener('click', closeModal);

    removeBtn.addEventListener('click', () => {
        localStorage.removeItem(PROFILE_PHOTO_STORAGE_KEY);
        applyCustomProfilePhoto();
        previewImg.src = CLASSCHARTS_DEFAULT_PHOTO_URL;
        scheduleCloudSync();
    });

    // Cropping functionality
    const showCropInterface = (imageSrc) => {
        cropImage.src = imageSrc;
        cropImage.onload = () => {
            // Reset crop state
            cropScale = 1;
            cropX = 0;
            cropY = 0;
            updateCropImage();
            
            // Show crop interface, hide upload interface
            uploadBtn.parentElement.parentElement.style.display = 'none';
            cropInterface.style.display = 'flex';
        };
    };

    const hideCropInterface = () => {
        cropInterface.style.display = 'none';
        uploadBtn.parentElement.parentElement.style.display = 'flex';
        currentImageFile = null;
    };

    const updateCropImage = () => {
        const containerWidth = 300;
        const containerHeight = 300;
        const img = cropImage;
        
        if (!img || !img.naturalWidth || !img.naturalHeight) return;
        
        const scaledWidth = img.naturalWidth * cropScale;
        const scaledHeight = img.naturalHeight * cropScale;
        
        img.style.width = scaledWidth + 'px';
        img.style.height = scaledHeight + 'px';
        img.style.left = cropX + 'px';
        img.style.top = cropY + 'px';
    };

    const applyCrop = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const cropSize = 150;
        
        canvas.width = cropSize;
        canvas.height = cropSize;
        
        const img = cropImage;
        const scaledWidth = img.naturalWidth * cropScale;
        const scaledHeight = img.naturalHeight * cropScale;
        
        // Calculate the source rectangle to crop
        const sourceX = (-cropX / scaledWidth) * img.naturalWidth;
        const sourceY = (-cropY / scaledHeight) * img.naturalHeight;
        const sourceSize = (cropSize / scaledWidth) * img.naturalWidth;
        
        ctx.drawImage(img, sourceX, sourceY, sourceSize, sourceSize, 0, 0, cropSize, cropSize);
        
        const croppedBase64 = canvas.toDataURL('image/jpeg', 0.9);
        localStorage.setItem(PROFILE_PHOTO_STORAGE_KEY, croppedBase64);
        applyCustomProfilePhoto();
        previewImg.src = croppedBase64;
        scheduleCloudSync();
        
        hideCropInterface();
    };

    // Crop event listeners
    cropZoomIn.addEventListener('click', () => {
        cropScale = Math.min(cropScale * 1.2, 3);
        updateCropImage();
    });

    cropZoomOut.addEventListener('click', () => {
        cropScale = Math.max(cropScale / 1.2, 0.5);
        updateCropImage();
    });

    cropReset.addEventListener('click', () => {
        cropScale = 1;
        cropX = 0;
        cropY = 0;
        updateCropImage();
    });

    cropApply.addEventListener('click', applyCrop);
    cropCancel.addEventListener('click', hideCropInterface);

    // Drag functionality for cropping
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;

    cropImage.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX - cropX;
        dragStartY = e.clientY - cropY;
        cropImage.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        cropX = e.clientX - dragStartX;
        cropY = e.clientY - dragStartY;
        
        // Constrain to container
        const containerWidth = 300;
        const containerHeight = 300;
        const imgWidth = cropImage.naturalWidth * cropScale;
        const imgHeight = cropImage.naturalHeight * cropScale;
        
        cropX = Math.max(Math.min(cropX, 0), containerWidth - imgWidth);
        cropY = Math.max(Math.min(cropY, 0), containerHeight - imgHeight);
        
        updateCropImage();
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        cropImage.style.cursor = 'grab';
    });

    // File upload with cropping
    uploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        currentImageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            showCropInterface(e.target.result);
        };
        reader.readAsDataURL(file);
    });
}

function showAppearanceSettingsModal() {
    const currentIcon = getPlusOneIcon();
    const isHomeworkHintEnabled = getHomeworkDateHintStatus();
    const currentAccent = getAccentColor();

    const bodyHtml = `
        <div class="cc-settings-stack">
            <div class="cc-settings-card">
                <h3 style="font-size: 1.1rem; font-weight: 600; color: #333; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 15px;">Positive Behavior Icon (The "+1" Icon)</h3>
                <p style="font-size: 0.9rem; color: #555; margin-bottom: 20px;">Choose the icon that appears next to positive behavior points on the dashboard.</p>
                <div style="display: flex; flex-direction: column; gap: 10px;" id="plus-one-icon-options">
                    <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background-color: ${currentIcon === 'default' ? LIGHT_GREY : 'white'};">
                        <input type="radio" name="plusOneIcon" value="default" style="margin-right: 15px; transform: scale(1.2);" ${currentIcon === 'default' ? 'checked' : ''}>
                        <span style="font-weight: 500;">Original Icon (The default ClassCharts look)</span>
                    </label>
                    <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background-color: ${currentIcon === 'smile.svg' ? LIGHT_GREY : 'white'};">
                        <input type="radio" name="plusOneIcon" value="smile.svg" style="margin-right: 15px; transform: scale(1.2);" ${currentIcon === 'smile.svg' ? 'checked' : ''}>
                        <img src="${getAssetUrl('smile.svg')}" alt="Smile Icon" style="width: 20px; height: 20px; margin-right: 10px;">
                        <span style="font-weight: 500;">Smile Icon (Recommended)</span>
                    </label>
                    <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background-color: ${currentIcon === 'award.svg' ? LIGHT_GREY : 'white'};">
                        <input type="radio" name="plusOneIcon" value="award.svg" style="margin-right: 15px; transform: scale(1.2);" ${currentIcon === 'award.svg' ? 'checked' : ''}>
                        <img src="${getAssetUrl('award.svg')}" alt="Award Icon" style="width: 20px; height: 20px; margin-right: 10px;">
                        <span style="font-weight: 500;">Award Icon</span>
                    </label>
                </div>
            </div>

            <div class="cc-settings-card">
                <h3 style="font-size: 1.1rem; font-weight: 600; color: #333; border-bottom: 1px solid #eee; padding-bottom: 8px; margin: 0 0 15px 0;">Accent Colour</h3>
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
            </div>

            <div class="cc-settings-card">
                <h3 style="font-size: 1.1rem; font-weight: 600; color: #333; border-bottom: 1px solid #eee; padding-bottom: 8px; margin: 0 0 15px 0;">New Feature Toggles</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 10px; background-color: white;">
                    <label for="cc-homework-hint-toggle" style="font-weight: 500; color: #333; flex-grow: 1;">Show Prominent Due Date on Homework Cards</label>
                    <label class="cc-switch">
                        <input type="checkbox" id="cc-homework-hint-toggle" ${isHomeworkHintEnabled ? 'checked' : ''}>
                        <span class="cc-slider round"></span>
                    </label>
                </div>
            </div>
        </div>
        <div class="cc-settings-actions">
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
    const isLocalBuild = chrome.runtime.getManifest().update_url === undefined;

    const bodyHtml = `
        <div class="cc-settings-stack">
            <div class="cc-settings-card-soft">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 12px;">Developer Tools</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 16px;">
                    <button id="cc-dev-console-btn" class="cc-notes-button cc-notes-save-btn" style="font-size: 0.85rem; padding: 8px 12px;">
                        <span style="display: block; font-size: 1.2rem; margin-bottom: 4px;">Console</span>
                        <span style="font-size: 0.75rem; opacity: 0.8;">JavaScript Console</span>
                    </button>
                    <button id="cc-dev-export-btn" class="cc-notes-button cc-notes-save-btn" style="font-size: 0.85rem; padding: 8px 12px;">
                        <span style="display: block; font-size: 1.2rem; margin-bottom: 4px;">Export</span>
                        <span style="font-size: 0.75rem; opacity: 0.8;">Export All Data</span>
                    </button>
                    <button id="cc-dev-reset-btn" class="cc-notes-button cc-goals-cancel-btn" style="font-size: 0.85rem; padding: 8px 12px;">
                        <span style="display: block; font-size: 1.2rem; margin-bottom: 4px;">Reset</span>
                        <span style="font-size: 0.75rem; opacity: 0.8;">Reset Features</span>
                    </button>
                    <button id="cc-dev-debug-btn" class="cc-notes-button cc-notes-save-btn" style="font-size: 0.85rem; padding: 8px 12px;">
                        <span style="display: block; font-size: 1.2rem; margin-bottom: 4px;">Debug</span>
                        <span style="font-size: 0.75rem; opacity: 0.8;">Debug Info</span>
                    </button>
                </div>
            </div>
            
            <div class="cc-settings-card">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 12px;">Extension Information</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 6px;">
                        <div style="font-size: 0.8rem; color: #6b7280; margin-bottom: 2px;">Version Key</div>
                        <div style="font-weight: 600; color: #374151; font-family: monospace; font-size: 0.85rem;">${CURRENT_VERSION_KEY}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 6px;">
                        <div style="font-size: 0.8rem; color: #6b7280; margin-bottom: 2px;">Build Type</div>
                        <div style="font-weight: 600; color: #374151;">${isLocalBuild ? 'Local Development' : 'Chrome Web Store'}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 6px;">
                        <div style="font-size: 0.8rem; color: #6b7280; margin-bottom: 2px;">Plus One Icon</div>
                        <div style="font-weight: 600; color: #374151;">${getPlusOneIcon()}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 6px;">
                        <div style="font-size: 0.8rem; color: #6b7280; margin-bottom: 2px;">Improved UI</div>
                        <div style="font-weight: 600; color: #374151;">${getImprovedUIStatus() ? 'Enabled' : 'Disabled'}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 6px;">
                        <div style="font-size: 0.8rem; color: #6b7280; margin-bottom: 2px;">Homework Hint</div>
                        <div style="font-weight: 600; color: #374151;">${isHomeworkHintEnabled ? 'Enabled' : 'Disabled'}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 6px;">
                        <div style="font-size: 0.8rem; color: #6b7280; margin-bottom: 2px;">Dark Mode</div>
                        <div style="font-weight: 600; color: #374151;">${getDarkModeEnabled() ? 'Enabled' : 'Disabled'}</div>
                    </div>
                </div>
            </div>
            
            <div class="cc-settings-card-soft">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 8px;">Quick Actions</h4>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button id="cc-dev-refresh-btn" class="cc-notes-button cc-notes-save-btn" style="font-size: 0.8rem; padding: 6px 12px;">Refresh Extension</button>
                    <button id="cc-dev-clear-btn" class="cc-notes-button cc-goals-cancel-btn" style="font-size: 0.8rem; padding: 6px 12px;">Clear Storage</button>
                    <button id="cc-dev-reload-btn" class="cc-notes-button cc-notes-save-btn" style="font-size: 0.8rem; padding: 6px 12px;">Reload Page</button>
                </div>
            </div>
            
            <div class="cc-settings-card-soft">
                <p style="font-size: 0.85rem; color: #6b7280; margin: 0;">
                    <strong>Key Combo:</strong> <strong>Ctrl + D</strong> (Cmd + D on Mac) opens this panel
                </p>
            </div>
        </div>
        <div class="cc-settings-actions" style="margin-top: 16px;">
            <button id="cc-dev-info-close-btn" class="cc-notes-button cc-notes-save-btn">Close</button>
        </div>
    `;
    
    const { closeModal } = createBaseModal('cc-dev-info', 'ClassCharts Improver: Developer Tools', bodyHtml, '600px');
    
    // Console Tool
    document.getElementById('cc-dev-console-btn').addEventListener('click', () => {
        showDeveloperConsole();
    });
    
    // Export Tool
    document.getElementById('cc-dev-export-btn').addEventListener('click', () => {
        exportAllDeveloperData();
    });
    
    // Reset Tool
    document.getElementById('cc-dev-reset-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all feature settings to defaults? This cannot be undone.')) {
            resetAllFeatures();
            alert('All features have been reset to defaults.');
        }
    });
    
    // Debug Tool
    document.getElementById('cc-dev-debug-btn').addEventListener('click', () => {
        showDebugInformation();
    });
    
    // Quick Actions
    document.getElementById('cc-dev-refresh-btn').addEventListener('click', () => {
        location.reload();
    });
    
    document.getElementById('cc-dev-clear-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all extension storage? This will remove all settings and data.')) {
            chrome.storage.local.clear();
            localStorage.clear();
            alert('All storage cleared. Page will reload.');
            location.reload();
        }
    });
    
    document.getElementById('cc-dev-reload-btn').addEventListener('click', () => {
        location.reload();
    });
    
    document.getElementById('cc-dev-info-close-btn').addEventListener('click', closeModal);
}

function showDeveloperConsole() {
    const bodyHtml = `
        <div class="cc-settings-stack">
            <div class="cc-settings-card">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 12px;">JavaScript Console</h4>
                <div style="margin-bottom: 12px;">
                    <input type="text" id="cc-console-input" placeholder="Enter JavaScript code to execute..." style="
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 6px;
                        font-family: monospace;
                        font-size: 14px;
                        box-sizing: border-box;
                    ">
                </div>
                <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                    <button id="cc-console-execute" class="cc-notes-button cc-notes-save-btn">Execute</button>
                    <button id="cc-console-clear" class="cc-notes-button cc-goals-cancel-btn">Clear</button>
                </div>
                <div id="cc-console-output" style="
                    background: #1e1e1e;
                    color: #d4d4d4;
                    padding: 12px;
                    border-radius: 6px;
                    font-family: monospace;
                    font-size: 12px;
                    min-height: 200px;
                    max-height: 300px;
                    overflow-y: auto;
                    white-space: pre-wrap;
                    word-break: break-all;
                ">// Console output will appear here
// Try: document.title, window.location.href, or any JavaScript expression</div>
            </div>
            
            <div class="cc-settings-card-soft">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 8px;">Quick Commands</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px;">
                    <button class="cc-console-quick" data-code="document.title">Get Page Title</button>
                    <button class="cc-console-quick" data-code="window.location.href">Get Current URL</button>
                    <button class="cc-console-quick" data-code="localStorage.length">Check Storage Size</button>
                    <button class="cc-console-quick" data-code="Object.keys(localStorage)">List Storage Keys</button>
                    <button class="cc-console-quick" data-code="chrome.runtime.getManifest()">Get Extension Info</button>
                    <button class="cc-console-quick" data-code="performance.now()">Get Performance Time</button>
                </div>
            </div>
        </div>
        <div class="cc-settings-actions" style="margin-top: 16px;">
            <button id="cc-console-close-btn" class="cc-notes-button cc-notes-save-btn">Close</button>
        </div>
    `;
    
    const { closeModal } = createBaseModal('cc-dev-console', 'Developer Console', bodyHtml, '600px');
    const input = document.getElementById('cc-console-input');
    const output = document.getElementById('cc-console-output');
    const executeBtn = document.getElementById('cc-console-execute');
    const clearBtn = document.getElementById('cc-console-clear');
    
    const executeCode = () => {
        const code = input.value.trim();
        if (!code) return;
        
        try {
            const result = eval(code);
            const resultStr = typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result);
            output.textContent = `> ${code}\n${resultStr}\n\n${output.textContent}`;
        } catch (error) {
            output.textContent = `> ${code}\nError: ${error.message}\n\n${output.textContent}`;
        }
        input.value = '';
        output.scrollTop = output.scrollHeight;
    };
    
    executeBtn.addEventListener('click', executeCode);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            executeCode();
        }
    });
    
    clearBtn.addEventListener('click', () => {
        output.textContent = '// Console cleared\n';
    });
    
    // Quick command buttons
    document.querySelectorAll('.cc-console-quick').forEach(btn => {
        btn.addEventListener('click', () => {
            input.value = btn.dataset.code;
            executeCode();
        });
    });
    
    document.getElementById('cc-console-close-btn').addEventListener('click', closeModal);
}

function exportAllDeveloperData() {
    const data = {
        timestamp: new Date().toISOString(),
        extension: {
            version: chrome.runtime.getManifest().version,
            name: chrome.runtime.getManifest().name,
            buildType: chrome.runtime.getManifest().update_url === undefined ? 'local' : 'production'
        },
        localStorage: {},
        chromeStorage: {},
        features: {},
        pageInfo: {
            url: window.location.href,
            title: document.title,
            userAgent: navigator.userAgent
        }
    };
    
    // Collect localStorage data
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data.localStorage[key] = localStorage.getItem(key);
    }
    
    // Collect chrome storage data
    chrome.storage.local.get(null, (result) => {
        data.chromeStorage = result;
        
        // Collect feature states
        const featureKeys = [
            'classcharts_improver_feature_improved_ui_enabled',
            'classcharts_improver_feature_personal_notes_enabled',
            'classcharts_improver_feature_goals_enabled',
            'classcharts_improver_feature_profile_photo_enabled',
            'classcharts_improver_feature_accent_color_enabled',
            'classcharts_improver_feature_report_concern_enabled',
            'classcharts_improver_feature_contact_link_enabled',
            'classcharts_improver_feature_code_warning_enabled',
            'classcharts_improver_feature_messages_placeholder_enabled',
            'classcharts_improver_feature_announcements_description_enabled',
            'classcharts_improver_feature_refresh_tweaks_enabled',
            'classcharts_improver_feature_detention_celebration_enabled',
            'classcharts_improver_feature_login_alert_enabled',
            'classcharts_improver_feature_prompt_review_enabled',
            'classcharts_improver_feature_cloud_sync_enabled',
            'classcharts_improver_feature_developer_preview_alert_enabled',
            'classcharts_improver_feature_show_safety_badges_enabled'
        ];
        
        featureKeys.forEach(key => {
            data.features[key] = localStorage.getItem(key) === 'true';
        });
        
        // Download the data
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `classcharts-improver-debug-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });
}

function resetAllFeatures() {
    const featureDefaults = {
        'classcharts_improver_feature_improved_ui_enabled': 'true',
        'classcharts_improver_feature_personal_notes_enabled': 'true',
        'classcharts_improver_feature_goals_enabled': 'true',
        'classcharts_improver_feature_profile_photo_enabled': 'true',
        'classcharts_improver_feature_accent_color_enabled': 'true',
        'classcharts_improver_feature_report_concern_enabled': 'true',
        'classcharts_improver_feature_contact_link_enabled': 'true',
        'classcharts_improver_feature_code_warning_enabled': 'true',
        'classcharts_improver_feature_messages_placeholder_enabled': 'true',
        'classcharts_improver_feature_announcements_description_enabled': 'true',
        'classcharts_improver_feature_refresh_tweaks_enabled': 'true',
        'classcharts_improver_feature_detention_celebration_enabled': 'true',
        'classcharts_improver_feature_login_alert_enabled': 'true',
        'classcharts_improver_feature_prompt_review_enabled': 'true',
        'classcharts_improver_feature_cloud_sync_enabled': 'true',
        'classcharts_improver_feature_developer_preview_alert_enabled': 'true',
        'classcharts_improver_feature_show_safety_badges_enabled': 'true'
    };
    
    Object.entries(featureDefaults).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });
}

function showDebugInformation() {
    const debugInfo = {
        extension: {
            name: chrome.runtime.getManifest().name,
            version: chrome.runtime.getManifest().version,
            manifestVersion: chrome.runtime.getManifest().manifest_version
        },
        page: {
            url: window.location.href,
            title: document.title,
            domain: window.location.hostname,
            path: window.location.pathname
        },
        browser: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled
        },
        storage: {
            localStorageSize: localStorage.length,
            chromeStorageKeys: Object.keys(chrome.storage.local ? {} : {}),
            sessionStorageSize: sessionStorage.length
        },
        performance: {
            loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
            domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
            now: performance.now()
        },
        classcharts: {
            isLoggedIn: !!document.querySelector('.logout-button'),
            hasNavigation: !!document.querySelector('.MuiToolbar-root'),
            hasHomework: !!document.querySelector('.homework-card'),
            hasBehavior: !!document.querySelector('.behaviour-points-section')
        }
    };
    
    const bodyHtml = `
        <div class="cc-settings-stack">
            <div class="cc-settings-card">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 12px;">Debug Information</h4>
                <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; max-height: 400px; overflow-y: auto;">
                    <pre style="margin: 0; font-family: monospace; font-size: 11px; white-space: pre-wrap; word-break: break-all;">${JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
            </div>
            
            <div class="cc-settings-card-soft">
                <button id="cc-debug-copy" class="cc-notes-button cc-notes-save-btn">Copy to Clipboard</button>
                <button id="cc-debug-download" class="cc-notes-button cc-notes-save-btn">Download Debug Info</button>
            </div>
        </div>
        <div class="cc-settings-actions" style="margin-top: 16px;">
            <button id="cc-debug-close-btn" class="cc-notes-button cc-notes-save-btn">Close</button>
        </div>
    `;
    
    const { closeModal } = createBaseModal('cc-debug-info', 'Debug Information', bodyHtml, '600px');
    
    document.getElementById('cc-debug-copy').addEventListener('click', () => {
        navigator.clipboard.writeText(JSON.stringify(debugInfo, null, 2));
        alert('Debug information copied to clipboard!');
    });
    
    document.getElementById('cc-debug-download').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(debugInfo, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `classcharts-debug-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });
    
    document.getElementById('cc-debug-close-btn').addEventListener('click', closeModal);
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
    const customPhotoUrl = isProfilePhotoEnabled() ? loadCustomProfilePhoto() : null;
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

        // Make profile pictures circular
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.minWidth = '40px';
        img.style.minHeight = '40px';
        img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        img.style.border = '2px solid #fff';
    });
}

function updateCustomIcons() {
    const iconToUse = isCustomPositiveIconEnabled() ? getPlusOneIcon() : 'default';

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

            const parseDueDate = (text) => {
                const m = (text || '').match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
                if (!m) return null;
                const p1 = Number(m[1]);
                const p2 = Number(m[2]);
                let year = Number(m[3]);
                if (!Number.isFinite(p1) || !Number.isFinite(p2) || !Number.isFinite(year)) return null;
                if (year < 100) year += 2000;
                let day;
                let month;
                // Heuristic: if one side can't be a month, treat it as the day.
                if (p1 > 12 && p2 <= 12) { day = p1; month = p2; }
                else if (p2 > 12 && p1 <= 12) { day = p2; month = p1; }
                else { day = p1; month = p2; }
                const dt = new Date(year, month - 1, day);
                if (isNaN(dt.getTime())) return null;
                return dt;
            };

            const dueDate = parseDueDate(dateText);
            let daysUntilText = null;
            if (dueDate) {
                const now = new Date();
                const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
                const dueMidnight = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate()).getTime();
                const msPerDay = 24 * 60 * 60 * 1000;
                const daysUntil = Math.ceil((dueMidnight - todayMidnight) / msPerDay);
                if (daysUntil === 0) daysUntilText = 'Due today';
                else if (daysUntil > 0) daysUntilText = `In ${daysUntil} days`;
                else daysUntilText = `${Math.abs(daysUntil)} days overdue`;
            }

            const cardHeader = card.querySelector('.MuiCardHeader-root');
            if (cardHeader) {
                const hint = document.createElement('div');
                hint.className = hintClass;
                hint.innerHTML = `
                    <div><strong style="font-size: 0.7rem; color: #E53935; text-transform: uppercase; margin-right: 5px;">Due Date:</strong> ${dateText}</div>
                    ${daysUntilText ? `<div><strong style="font-size: 0.7rem; color: #D81B60; text-transform: uppercase; margin-right: 5px;">Days until due:</strong> ${daysUntilText}</div>` : ''}
                `;
                hint.style.cssText = `
                    font-size: 0.9rem;
                    color: #d81b60;
                    background-color: #fce4ec;
                    padding: 4px 8px;
                    border-radius: 4px;
                    margin-top: 5px;
                    display: inline-flex;
                    flex-direction: column;
                    gap: 4px;
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
                height: 100px;
                margin-bottom: 20px;
                border-radius: 16px;
                object-fit: contain;
            }
            .cc-review-btn-primary {
                background-color: ${POSITIVE_GREEN};
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                text-transform: uppercase;
                transition: background-color 0.2s, transform 0.1s;
                letter-spacing: 0.5px;
            }
            .cc-review-btn-primary:hover { background-color: #388E3C; }
            .cc-review-btn-secondary {
                background-color: #e0e0e0;
                color: #333;
                border: none;
                padding: 10px 15px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: background-color 0.2s;
            }
            .cc-review-btn-secondary:hover { background-color: #bdbdbd; }
        </style>
        <div id="cc-review-modal-backdrop" class="cc-review-backdrop">
            <div id="cc-review-modal-content" class="cc-review-card">
                <img src="${logoUrl}" alt="ClassCharts Improver Logo" class="cc-review-logo">
                <h2 style="font-size: 1.75rem; margin-bottom: 10px; color: ${PRIMARY_BLUE}; font-weight: 700;">Enjoying the Improver?</h2>
                <p style="font-size: 1rem; color: #444; line-height: 1.5; margin-bottom: 30px;">
                    A quick rating helps more students discover these features. Would you mind taking 30 seconds to support the extension?
                </p>
                <div style="display: flex; justify-content: center; gap: 15px;">
                    <button id="cc-review-later-btn" class="cc-review-btn-secondary">Maybe later</button>
                    <a href="${reviewLink}" target="_blank" id="cc-review-link-btn" style="text-decoration: none;">
                        <button id="cc-review-dismiss-btn" class="cc-review-btn-primary">Leave a review</button>
                    </a>
                </div>
            </div>
        </div>
    `;
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
        localStorage.setItem(REVIEW_LAST_SHOWN_AT_KEY, String(Date.now()));
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
    if (!getStoredBoolean(FEATURE_PROMPT_REVIEW_ENABLED_KEY, true)) return;
    const now = Date.now();
    const lastShown = Number(localStorage.getItem(REVIEW_LAST_SHOWN_AT_KEY) || '0');
    const intervalMs = getReviewIntervalDays() * 24 * 60 * 60 * 1000;
    const shouldShowReview = !lastShown || (now - lastShown >= intervalMs);

    if (localStorage.getItem(WELCOME_SHOWN_KEY) !== 'true') {
        showWelcomeModal(() => {
            if (shouldShowReview) {
                showReviewModal();
            }
        });
    } else if (shouldShowReview) {
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
    // Disabled: keep ClassCharts messages UI default.
    // (Previously this injected a guide overlay; you asked to remove it.)
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

function injectDeveloperPreviewAlert() {
    // Check if running locally (not from Chrome Web Store)
    const isLocalBuild = chrome.runtime.getManifest().update_url === undefined;
    
    if (!isLocalBuild) return;
    
    // Check if user has dismissed this permanently
    if (!getStoredBoolean(FEATURE_DEVELOPER_PREVIEW_ALERT_ENABLED_KEY, true)) return;
    
    const bodyHtml = `
        <div class="cc-settings-stack">
            <div class="cc-settings-card-soft" style="
                background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
                border: 1px solid #f59e0b;
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 16px;
            ">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style="color: #92400e;">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <div>
                        <div style="font-weight: 700; color: #92400e; font-size: 16px; margin-bottom: 2px;">
                            Developer Preview Build
                        </div>
                        <div style="color: #78350f; font-size: 13px; line-height: 1.4;">
                            You're running a preview version of ClassCharts Improver. Since this is loaded from local files, it won't auto-update.
                        </div>
                    </div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.5); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
                    <p style="margin: 0; color: #78350f; font-size: 14px; line-height: 1.5;">
                        <strong>Recommendation:</strong> 
                        <a href="https://chromewebstore.google.com/detail/classcharts-improver/kalmdpfngeebamgaeegkieojhbkbghoe" target="_blank" style="color: #1e40af; text-decoration: underline; font-weight: 600;">Get the official version</a> 
                        for automatic updates and the latest features.
                    </p>
                </div>
                
                <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: rgba(255, 255, 255, 0.3); border-radius: 8px;">
                    <input type="checkbox" id="cc-dont-show-again" style="
                        width: 16px;
                        height: 16px;
                        accent-color: #f59e0b;
                    ">
                    <label for="cc-dont-show-again" style="color: #78350f; font-size: 14px; cursor: pointer; margin: 0;">
                        Don't show this message again
                    </label>
                </div>
            </div>
        </div>
        <div class="cc-settings-actions" style="margin-top: 16px;">
            <button id="cc-dev-alert-close" class="cc-notes-button cc-notes-save-btn" style="min-width: 120px;">Got it</button>
        </div>
    `;
    
    const { closeModal } = createBaseModal('cc-developer-preview', 'Developer Preview', bodyHtml, '400px');
    
    const closeBtn = document.getElementById('cc-dev-alert-close');
    const dontShowCheckbox = document.getElementById('cc-dont-show-again');
    
    closeBtn.addEventListener('click', () => {
        // Save preference if checkbox is checked
        if (dontShowCheckbox.checked) {
            setStoredBoolean(FEATURE_DEVELOPER_PREVIEW_ALERT_ENABLED_KEY, false);
        }
        closeModal();
    });
    
    // Also close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (dontShowCheckbox.checked) {
                setStoredBoolean(FEATURE_DEVELOPER_PREVIEW_ALERT_ENABLED_KEY, false);
            }
            closeModal();
        }
    });
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

    applyDarkMode();
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

        if (!isFeatureEnabledByKey(FEATURE_CONTACT_LINK_ENABLED_KEY, true)) document.querySelectorAll('.cc-improver-contact-link').forEach(el => el.remove());
        if (!isFeatureEnabledByKey(FEATURE_CODE_WARNING_ENABLED_KEY, true)) document.querySelectorAll('.cc-improver-code-warning').forEach(el => el.remove());
        if (!isFeatureEnabledByKey(FEATURE_MESSAGES_PLACEHOLDER_ENABLED_KEY, true)) document.querySelectorAll('.cc-improver-messages-guide').forEach(el => el.remove());
        if (!isFeatureEnabledByKey(FEATURE_ANNOUNCEMENTS_DESCRIPTION_ENABLED_KEY, true)) document.querySelectorAll('.cc-improver-announcements-desc').forEach(el => el.remove());
        if (!isFeatureEnabledByKey(FEATURE_REFRESH_TWEAKS_ENABLED_KEY, true)) document.querySelectorAll('.cc-improver-refresh-button').forEach(el => el.remove());
        if (!isFeatureEnabledByKey(FEATURE_DETENTION_CELEBRATION_ENABLED_KEY, true)) document.querySelectorAll('.cc-improver-detention-success').forEach(el => el.remove());

        if (isFeatureEnabledByKey(FEATURE_REPORT_CONCERN_ENABLED_KEY, true)) injectReportConcernWarning();
        else document.querySelectorAll('.cc-improver-concern-warning').forEach(el => el.remove());

        if (isFeatureEnabledByKey(FEATURE_CONTACT_LINK_ENABLED_KEY, true)) injectContactLink();
        if (isFeatureEnabledByKey(FEATURE_CODE_WARNING_ENABLED_KEY, true)) injectCodeWarning();
        if (false) injectMessagesPlaceholderContent();
        if (isFeatureEnabledByKey(FEATURE_ANNOUNCEMENTS_DESCRIPTION_ENABLED_KEY, true)) injectAnnouncementsDescription();
        if (isFeatureEnabledByKey(FEATURE_REFRESH_TWEAKS_ENABLED_KEY, true)) injectRefreshTweaksButton();
        if (isFeatureEnabledByKey(FEATURE_DETENTION_CELEBRATION_ENABLED_KEY, true)) injectDetentionCelebration();

        if (attempts >= maxAttempts) {
            clearInterval(interval);
        }
        attempts++;
    }, 500);
}

if (isFeatureEnabledByKey(FEATURE_LOGIN_ALERT_ENABLED_KEY, true)) {
    injectLoginAlert();
} else {
    document.querySelectorAll('.cc-improver-login-alert').forEach(el => el.remove());
}


injectDeveloperPreviewAlert();

setupKeyComboListener();
initObserver();
