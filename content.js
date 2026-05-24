const NOTES_STORAGE_KEY = 'classcharts_personal_notes';
const GOALS_STORAGE_KEY = 'classcharts_personal_goals';
const PROFILE_PHOTO_STORAGE_KEY = 'classcharts_custom_profile_photo';
const CURRENT_VERSION_KEY = 'classcharts_improver_version_v5_7_8';
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
const FEATURE_HIDE_ENCRYPTION_WARNING_KEY = 'classcharts_improver_feature_hide_encryption_warning_enabled';
const BETA_CARD_DISMISSED_KEY = 'classcharts_improver_beta_card_dismissed';
const BETA_PARTNER_CODE_KEY = 'classcharts_improver_beta_partner_code';
const BETA_USER_NAME_KEY = 'classcharts_improver_beta_user_name';

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
const SYNC_HIDE_ENCRYPTION_WARNING_ENABLED_KEY = 'classcharts_improver_sync_hide_encryption_warning_enabled';

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

// Error Modal System
let activeErrorModal = null;

function showErrorModal(title, error, details = null) {
    // Remove existing modal
    if (activeErrorModal) {
        activeErrorModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'cc-error-modal';
    modal.innerHTML = `
        <div class="cc-error-modal-backdrop"></div>
        <div class="cc-error-modal-content">
            <div class="cc-error-modal-header">
                <h3>${title}</h3>
                <button class="cc-error-modal-close" onclick="this.closest('.cc-error-modal').remove()">×</button>
            </div>
            <div class="cc-error-modal-body">
                <div class="cc-error-message">${error}</div>
                ${details ? `<div class="cc-error-details">${details}</div>` : ''}
                <div class="cc-error-actions">
                    <button class="cc-error-copy-btn" onclick="copyErrorToClipboard('${escapeHtml(error + (details ? '\\n\\n' + details : ''))}', this)">
                        <span class="cc-error-copy-text">Copy error</span>
                        <span class="cc-error-copy-tick">✓</span>
                    </button>
                    <button class="cc-error-dismiss-btn" onclick="this.closest('.cc-error-modal').remove()">Dismiss</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('cc-error-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'cc-error-modal-styles';
        style.textContent = `
            .cc-error-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000001;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            .cc-error-modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
            }
            
            .cc-error-modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--cc-improver-modal-bg, white);
                border-radius: 12px;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow: hidden;
                animation: cc-error-modal-in 0.3s ease-out;
            }
            
            .cc-error-modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px 24px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                background: var(--cc-improver-modal-header-bg, #f7f7f7);
            }
            
            .cc-error-modal-header h3 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
                color: var(--cc-improver-modal-fg, #111827);
            }
            
            .cc-error-modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--cc-improver-modal-fg, #6b7280);
                padding: 0;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                transition: all 0.2s;
            }
            
            .cc-error-modal-close:hover {
                background: rgba(0, 0, 0, 0.1);
                color: var(--cc-improver-modal-fg, #111827);
            }
            
            .cc-error-modal-body {
                padding: 24px;
                color: var(--cc-improver-modal-fg, #111827);
            }
            
            .cc-error-message {
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 16px;
                font-weight: 500;
            }
            
            .cc-error-details {
                background: rgba(0, 0, 0, 0.05);
                border-radius: 8px;
                padding: 12px;
                font-size: 14px;
                line-height: 1.4;
                margin-bottom: 20px;
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                white-space: pre-wrap;
                word-break: break-word;
            }
            
            .cc-error-actions {
                display: flex;
                gap: 12px;
                justify-content: flex-end;
            }
            
            .cc-error-copy-btn, .cc-error-dismiss-btn {
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                border: 1px solid;
                transition: all 0.2s;
                position: relative;
            }
            
            .cc-error-copy-btn {
                background: #3b82f6;
                color: white;
                border-color: #3b82f6;
            }
            
            .cc-error-copy-btn:hover {
                background: #2563eb;
                border-color: #2563eb;
            }
            
            .cc-error-dismiss-btn {
                background: transparent;
                color: var(--cc-improver-modal-fg, #6b7280);
                border-color: rgba(0, 0, 0, 0.2);
            }
            
            .cc-error-dismiss-btn:hover {
                background: rgba(0, 0, 0, 0.05);
                border-color: rgba(0, 0, 0, 0.3);
            }
            
            .cc-error-copy-tick {
                display: none;
            }
            
            .cc-error-copy-btn.copied .cc-error-copy-text {
                display: none;
            }
            
            .cc-error-copy-btn.copied .cc-error-copy-tick {
                display: inline;
            }
            
            @keyframes cc-error-modal-in {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            
            .cc-improver-dark-mode .cc-error-details {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    activeErrorModal = modal;
    
    // Close on backdrop click
    modal.querySelector('.cc-error-modal-backdrop').addEventListener('click', () => {
        modal.remove();
        activeErrorModal = null;
    });
    
    return modal;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function copyErrorToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        button.classList.add('copied');
        setTimeout(() => {
            button.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        button.classList.add('copied');
        setTimeout(() => {
            button.classList.remove('copied');
        }, 2000);
    });
}

// Info Modal System (replaces toast notifications)
function showInfoModal(title, message, type = 'info', duration = 3000) {
    // Remove existing info modal
    const existingModal = document.querySelector('.cc-info-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'cc-info-modal-overlay';
    
    // Icon mapping for different types
    const icons = {
        info: getAssetUrl('info.svg'),
        success: getAssetUrl('check-circle.svg'),
        warning: getAssetUrl('alert-octagon.svg'),
        error: getAssetUrl('x-circle.svg')
    };
    
    // Color mapping for different types
    const colors = {
        info: '#0ea5e9',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
    };
    
    modal.innerHTML = `
        <div class="cc-info-modal">
            <div class="cc-info-modal-content">
                <div class="cc-info-modal-icon" style="color: ${colors[type]}">
                    <img src="${icons[type]}" alt="${type}" style="width: 24px; height: 24px;">
                </div>
                <div class="cc-info-modal-text">
                    <div class="cc-info-modal-title">${title}</div>
                    <div class="cc-info-modal-message">${message}</div>
                </div>
                <button class="cc-info-modal-close" onclick="this.closest('.cc-info-modal-overlay').remove()">×</button>
            </div>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('cc-info-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'cc-info-modal-styles';
        style.textContent = `
            .cc-info-modal-overlay {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 999999;
                max-width: 400px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                animation: slideIn 0.3s ease-out;
            }
            
            .cc-info-modal {
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            
            .cc-info-modal-content {
                display: flex;
                align-items: flex-start;
                padding: 16px;
                gap: 12px;
            }
            
            .cc-info-modal-icon {
                flex-shrink: 0;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                background: rgba(0, 0, 0, 0.05);
            }
            
            .cc-info-modal-text {
                flex: 1;
                min-width: 0;
            }
            
            .cc-info-modal-title {
                font-weight: 600;
                color: #111827;
                font-size: 14px;
                margin-bottom: 4px;
                line-height: 1.3;
            }
            
            .cc-info-modal-message {
                color: #6b7280;
                font-size: 13px;
                line-height: 1.4;
            }
            
            .cc-info-modal-close {
                flex-shrink: 0;
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #6b7280;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                transition: all 0.2s;
            }
            
            .cc-info-modal-close:hover {
                background: rgba(0, 0, 0, 0.05);
                color: #374151;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .cc-info-modal-overlay.removing {
                animation: slideOut 0.3s ease-in forwards;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    // Auto-remove after duration (0 means no auto-remove)
    if (duration > 0) {
        setTimeout(() => {
            if (modal.parentElement) {
                modal.classList.add('removing');
                setTimeout(() => {
                    if (modal.parentElement) {
                        modal.remove();
                    }
                }, 300);
            }
        }, duration);
    }
    
    return modal;
}

// Inline alert system for less important notifications
function showInlineAlert(message, type = 'info', container = null) {
    const alert = document.createElement('div');
    alert.className = `cc-inline-alert cc-inline-alert-${type}`;
    
    const icons = {
        info: getAssetUrl('info.svg'),
        success: getAssetUrl('check-circle.svg'),
        warning: getAssetUrl('alert-octagon.svg'),
        error: getAssetUrl('x-circle.svg')
    };
    
    alert.innerHTML = `
        <div class="cc-inline-alert-content">
            <img src="${icons[type]}" alt="${type}" class="cc-inline-alert-icon">
            <span class="cc-inline-alert-message">${message}</span>
            <button class="cc-inline-alert-close" onclick="this.closest('.cc-inline-alert').remove()">×</button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('cc-inline-alert-styles')) {
        const style = document.createElement('style');
        style.id = 'cc-inline-alert-styles';
        style.textContent = `
            .cc-inline-alert {
                margin: 12px 0;
                border-radius: 8px;
                animation: fadeIn 0.3s ease-out;
            }
            
            .cc-inline-alert-info {
                background: #f0f9ff;
                border: 1px solid #0ea5e9;
                color: #0c4a6e;
            }
            
            .cc-inline-alert-success {
                background: #ecfdf5;
                border: 1px solid #10b981;
                color: #065f46;
            }
            
            .cc-inline-alert-warning {
                background: #fffbeb;
                border: 1px solid #f59e0b;
                color: #92400e;
            }
            
            .cc-inline-alert-error {
                background: #fef2f2;
                border: 1px solid #ef4444;
                color: #991b1b;
            }
            
            .cc-inline-alert-content {
                display: flex;
                align-items: center;
                padding: 12px 16px;
                gap: 12px;
            }
            
            .cc-inline-alert-icon {
                width: 18px;
                height: 18px;
                flex-shrink: 0;
            }
            
            .cc-inline-alert-message {
                flex: 1;
                font-size: 13px;
                font-weight: 500;
                line-height: 1.4;
            }
            
            .cc-inline-alert-close {
                background: none;
                border: none;
                font-size: 16px;
                cursor: pointer;
                opacity: 0.6;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 3px;
                transition: opacity 0.2s;
            }
            
            .cc-inline-alert-close:hover {
                opacity: 1;
                background: rgba(0,0,0,0.1);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    if (container) {
        container.appendChild(alert);
    } else {
        // If no container specified, add to the top of the body
        document.body.insertBefore(alert, document.body.firstChild);
    }
    
    return alert;
}

// Legacy showToast function for backward compatibility (redirects to info modal)
function showToast(message, type = 'info', duration = 3000) {
    const titles = {
        info: 'Information',
        success: 'Success',
        warning: 'Warning',
        error: 'Error'
    };
    
    return showInfoModal(titles[type] || 'Information', message, type, duration);
}


// Authentication in-progress modal
let authInProgressModal = null;

function showAuthInProgressModal(provider) {
    // Remove existing modal
    if (authInProgressModal) {
        authInProgressModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'cc-auth-in-progress-modal';
    modal.innerHTML = `
        <div class="cc-auth-in-progress-content">
            <div class="cc-auth-spinner"></div>
            <h3>Authenticating with ${provider}</h3>
            <p>An authentication window has opened. Continue the authentication process there.</p>
            <p class="cc-auth-note">This window will close automatically when authentication is complete.</p>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('cc-auth-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'cc-auth-modal-styles';
        style.textContent = `
            .cc-auth-in-progress-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            .cc-auth-in-progress-content {
                background: white;
                border-radius: 12px;
                padding: 32px;
                text-align: center;
                max-width: 400px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            }
            
            .cc-auth-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid #e5e7eb;
                border-top: 3px solid #3b82f6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 16px;
            }
            
            .cc-auth-in-progress-content h3 {
                margin: 0 0 16px 0;
                color: #1f2937;
                font-size: 18px;
                font-weight: 600;
            }
            
            .cc-auth-in-progress-content p {
                margin: 8px 0;
                color: #6b7280;
                font-size: 14px;
                line-height: 1.5;
            }
            
            .cc-auth-note {
                font-size: 13px;
                color: #9ca3af;
                font-style: italic;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    authInProgressModal = modal;
    
    // Auto-close after 2 minutes (timeout)
    setTimeout(() => {
        if (authInProgressModal) {
            authInProgressModal.remove();
            authInProgressModal = null;
        }
    }, 120000);
    
    return modal;
}

function hideAuthInProgressModal() {
    if (authInProgressModal) {
        authInProgressModal.remove();
        authInProgressModal = null;
    }
}

function showBetaCard() {
    // Check if user has already dismissed the beta card
    if (localStorage.getItem(BETA_CARD_DISMISSED_KEY) === 'true') {
        return;
    }

    // Find the Home menu item
    const menuItems = document.querySelectorAll('.desktop-drawer-pupil-menu-item');
    const homeItem = Array.from(menuItems).find(item => {
        const textSpan = item.querySelector('.MuiListItemText-primary');
        return textSpan && (textSpan.textContent === 'Home' || textSpan.textContent === 'Overview');
    });

    if (!homeItem) {
        // Try again later if menu not loaded yet
        setTimeout(showBetaCard, 1000);
        return;
    }

    // Check if beta card already exists
    if (document.querySelector('.cc-beta-card')) {
        return;
    }

    // Create the beta card
    const betaCard = document.createElement('div');
    betaCard.className = 'cc-beta-card';
    betaCard.innerHTML = `
        <div class="cc-beta-card-content">
            <div class="cc-beta-card-icon">
                <img src="${getAssetUrl('users.svg')}" alt="users icon">
            </div>
            <div class="cc-beta-card-text">
                <div class="cc-beta-card-title">Beta Program</div>
                <div class="cc-beta-card-description">Test new features & give feedback</div>
                <a href="https://classchartsimprover.pages.dev/beta" target="_blank" class="cc-beta-card-link">Join →</a>
            </div>
            <button class="cc-beta-card-dismiss" title="Don't show this again">×</button>
        </div>
    `;

    // Add styles if not already added
    if (!document.getElementById('cc-beta-card-styles')) {
        const style = document.createElement('style');
        style.id = 'cc-beta-card-styles';
        style.textContent = `
            .cc-beta-card {
                margin: 4px 12px;
                border-radius: 8px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
                overflow: hidden;
                animation: slideDown 0.3s ease-out;
            }
            
            .cc-beta-card-content {
                display: flex;
                align-items: center;
                padding: 8px 12px;
                gap: 8px;
                position: relative;
            }
            
            .cc-beta-card-icon {
                flex-shrink: 0;
                width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 6px;
            }
            
            .cc-beta-card-icon img {
                width: 16px;
                height: 16px;
                filter: brightness(0) invert(1);
            }
            
            .cc-beta-card-text {
                flex: 1;
                min-width: 0;
            }
            
            .cc-beta-card-title {
                font-size: 12px;
                font-weight: 600;
                color: white;
                margin-bottom: 2px;
            }
            
            .cc-beta-card-description {
                font-size: 11px;
                color: rgba(255, 255, 255, 0.9);
                line-height: 1.3;
                margin-bottom: 2px;
            }
            
            .cc-beta-card-link {
                display: inline-block;
                font-size: 11px;
                color: white;
                text-decoration: none;
                font-weight: 500;
                transition: opacity 0.2s;
            }
            
            .cc-beta-card-link:hover {
                opacity: 0.8;
                text-decoration: underline;
            }
            
            .cc-beta-card-dismiss {
                flex-shrink: 0;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 14px;
                cursor: pointer;
                padding: 2px 6px;
                border-radius: 4px;
                transition: all 0.2s;
                line-height: 1;
            }
            
            .cc-beta-card-dismiss:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .cc-improver-dark-mode .cc-beta-card {
                background: linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%);
                box-shadow: 0 2px 8px rgba(76, 29, 149, 0.4);
            }
        `;
        document.head.appendChild(style);
    }

    // Insert before the Home menu item
    homeItem.parentNode.insertBefore(betaCard, homeItem);

    // Handle dismiss button
    const dismissBtn = betaCard.querySelector('.cc-beta-card-dismiss');
    dismissBtn.addEventListener('click', () => {
        localStorage.setItem(BETA_CARD_DISMISSED_KEY, 'true');
        betaCard.style.animation = 'slideDown 0.3s ease-out reverse';
        setTimeout(() => {
            betaCard.remove();
        }, 300);
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
        hide_encryption_warning: isSyncEnabled(SYNC_HIDE_ENCRYPTION_WARNING_ENABLED_KEY, true),
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
        sync_hide_encryption_warning_enabled: sync.hide_encryption_warning,
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
    if (sync.hide_encryption_warning) {
        body.hide_encryption_warning_enabled = getStoredBoolean(FEATURE_HIDE_ENCRYPTION_WARNING_KEY, false);
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
    if (typeof row.sync_hide_encryption_warning_enabled === 'boolean') setStoredBoolean(SYNC_HIDE_ENCRYPTION_WARNING_ENABLED_KEY, row.sync_hide_encryption_warning_enabled);

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
        hide_encryption_warning: isSyncEnabled(SYNC_HIDE_ENCRYPTION_WARNING_ENABLED_KEY, true),
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
    if (sync.hide_encryption_warning && typeof row.hide_encryption_warning_enabled === 'boolean') {
        setStoredBoolean(FEATURE_HIDE_ENCRYPTION_WARNING_KEY, row.hide_encryption_warning_enabled);
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

// James Auth Integration Constants
const JAMES_AUTH_USER_KEY = 'classcharts_improver_james_auth_user';
const JAMES_AUTH_STATUS_KEY = 'classcharts_improver_james_auth_status';

// James Auth Integration Functions
function openJamesAuthWindow() {
    const authUrl = 'https://jamesauth.pages.dev/auth?app=ccimprover&scopes=email,profile,storedatacloud';
    const width = 500;
    const height = 600;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    
    const authWindow = window.open(
        authUrl,
        'jamesAuth',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
    
    // Handle window closed without authentication
    const checkClosed = setInterval(() => {
        if (authWindow.closed) {
            clearInterval(checkClosed);
            // Check if authentication actually succeeded
            getJamesAuthUser().then(user => {
                if (!user || !user.isAuthenticated) {
                    showErrorModal('Authentication Failed', 'Authentication cancelled or window closed. Please try again.');
                }
            });
        }
    }, 1000);
    
    return authWindow;
}

function setupJamesAuthListener() {
    window.addEventListener('message', (event) => {
        // Security validation
        if (event.origin !== 'https://jamesauth.pages.dev') {
            console.warn('James Auth: Invalid origin', event.origin);
            return;
        }
        
        if (!event.data || event.data.type !== 'JAMES_AUTH_SUCCESS') {
            console.warn('James Auth: Invalid message type', event.data?.type);
            return;
        }
        
        const { user, service } = event.data;
        
        // Debug: Log the full event data to understand structure
        console.log('James Auth: Full response data:', event.data);
        console.log('James Auth: User object:', user);
        
        // Validate required fields
        if (!user || !user.id || !user.email || !user.name) {
            console.error('James Auth: Invalid user data', user);
            return;
        }
        
        // Store authentication data
        const authData = {
            isAuthenticated: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar || null
            },
            token: user.token || event.data.token || `james_auth_${user.id}_${Date.now()}`,
            service: service || 'ClassCharts Improver',
            authenticatedAt: new Date().toISOString()
        };
        
        chrome.storage.local.set({
            [JAMES_AUTH_USER_KEY]: authData,
            [JAMES_AUTH_STATUS_KEY]: 'authenticated'
        }, async () => {
            console.log('James Auth: Authentication successful', authData);
            
            // Hide the in-progress modal
            hideAuthInProgressModal();
            
            // Create Supabase session using James Auth ID and email for real cloud sync
            try {
                const resp = await bgMessage({ 
                    type: 'SUPABASE_SIGN_IN_JAMES_AUTH', 
                    jamesAuthId: authData.user.id,
                    email: authData.user.email
                });
                if (resp?.error) {
                    console.warn('James Auth: Failed to create Supabase session:', resp.error);
                    showErrorModal('Cloud Sync Error', resp.error);
                } else {
                    console.log('James Auth: Supabase session created successfully');
                    showToast('Successfully connected to cloud sync!', 'success');
                    await pullSettingsFromCloud().catch(() => {});
                    await upsertSettingsToCloud().catch(() => {});
                    startAutoCloudSync();
                    // Modal will be closed by the account sync modal logic
                }
            } catch (error) {
                console.warn('James Auth: Error creating Supabase session:', error);
                showErrorModal('Cloud Sync Error', 'Failed to connect to cloud sync', error.message);
            }
            
            // Update UI if account sync modal is open
            updateAccountSyncUI(authData);
        });
    });
}

function getJamesAuthUser() {
    return new Promise((resolve) => {
        chrome.storage.local.get([JAMES_AUTH_USER_KEY], (result) => {
            resolve(result[JAMES_AUTH_USER_KEY] || null);
        });
    });
}

function isJamesAuthenticated() {
    return new Promise((resolve) => {
        chrome.storage.local.get([JAMES_AUTH_USER_KEY], (result) => {
            const authData = result[JAMES_AUTH_USER_KEY];
            resolve(authData && authData.isAuthenticated === true);
        });
    });
}

function signOutJamesAuth() {
    chrome.storage.local.remove([JAMES_AUTH_USER_KEY, JAMES_AUTH_STATUS_KEY], async () => {
        console.log('James Auth: Signed out successfully');
        
        // Also clear Supabase session
        try {
            await bgMessage({ type: 'SUPABASE_SIGN_OUT' });
        } catch (error) {
            console.warn('Failed to clear Supabase session:', error);
        }
        
        updateAccountSyncUI(null);
    });
}

function updateAccountSyncUI(authData) {
    // Update the account sync modal if it's open
    // Since we're now using toast notifications, this function mainly handles UI state changes
    // The actual status updates are now handled by toast notifications
    if (authData && authData.isAuthenticated) {
        // Could update modal UI here if needed, but status is now handled by toasts
        console.log('James Auth UI updated for authenticated user:', authData.user.name);
    }
}

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
    const settingsCategories = [
        {
            title: 'Personalization',
            description: 'Customize your experience',
            items: [
                { id: 'cc-open-photo-modal', label: 'Custom Profile Photo', icon: getAssetUrl('camera.svg'), color: '#E3F2FD', textColor: PRIMARY_BLUE, borderColor: PRIMARY_BLUE },
                { id: 'cc-open-appearance-modal', label: 'Appearance Settings', icon: getAssetUrl('edit-2.svg'), color: '#E8F5E9', textColor: POSITIVE_GREEN, borderColor: POSITIVE_GREEN },
                { id: 'cc-open-ui-tweaks-modal', label: 'UI Tweaks', icon: getAssetUrl('sliders.svg'), color: '#FFF3E0', textColor: '#EF6C00', borderColor: '#EF6C00' },
            ]
        },
        {
            title: 'Features & Controls',
            description: 'Manage extension features',
            items: [
                { id: 'cc-open-feature-controls-modal', label: 'Feature Controls', icon: getAssetUrl('settings.svg'), color: '#EEF2FF', textColor: '#4338CA', borderColor: '#4338CA' },
            ]
        },
        {
            title: 'Account & Data',
            description: 'Sync and account management',
            items: [
                { id: 'cc-open-account-sync-modal', label: 'Account & Sync', icon: getAssetUrl('cloud.svg'), color: '#E0F2F1', textColor: '#00695C', borderColor: '#00695C' },
            ]
        },
        {
            title: 'Information',
            description: 'About and support',
            items: [
                { id: 'cc-open-about-modal', label: 'About', icon: getAssetUrl('info.svg'), color: '#F3E8FF', textColor: '#7E22CE', borderColor: '#7E22CE' },
            ]
        },
        {
            title: 'Beta Program',
            description: 'Join the beta testing program',
            items: [
                { id: 'cc-open-beta-modal', label: 'Beta Access', icon: getAssetUrl('users.svg'), color: '#FEE2E2', textColor: '#DC2626', borderColor: '#DC2626' },
            ]
        }
    ];

    const bodyHtml = `
        <div class="cc-settings-card-soft" style="margin-bottom: 20px;">
            <h3 style="margin: 0 0 8px 0; font-size: 1.1rem; color: #111827; font-weight: 600;">Settings & Customization</h3>
            <p style="font-size: 0.9rem; color: #6b7280; margin: 0; line-height: 1.4;">
                Manage all ClassCharts Improver settings and customizations in one place.
            </p>
        </div>
        
        ${settingsCategories.map(category => `
            <div class="cc-settings-category-section">
                <div class="cc-category-section-header">
                    <h4 class="cc-category-section-title">${category.title}</h4>
                    <p class="cc-category-section-description">${category.description}</p>
                </div>
                <div class="cc-category-section-items">
                    ${category.items.map(item => `
                        <button id="${item.id}" class="cc-settings-hub-button" style="
                            background-color: ${item.color};
                            color: ${item.textColor};
                            border: 1px solid ${item.borderColor};
                            padding: 16px 20px;
                            border-radius: 12px;
                            font-weight: 600;
                            text-align: left;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            width: 100%;
                            margin-bottom: 8px;
                        ">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <img src="${item.icon}" alt="${item.label}" class="cc-settings-item-icon" style="
                                    width: 36px;
                                    height: 36px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    background: rgba(255, 255, 255, 0.3);
                                    border-radius: 8px;
                                    padding: 8px;
                                ">
                                <span style="font-size: 15px;">${item.label}</span>
                            </div>
                            <span style="font-size: 1.2rem; opacity: 0.7;">&rarr;</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `).join('')}
        
        <div class="cc-settings-actions" style="margin-top: 24px;">
            <button id="cc-settings-hub-close-btn" class="cc-notes-button cc-notes-cancel-btn">Close</button>
        </div>
        
        <style>
            /* Standardized Button System */
            .cc-btn {
                padding: 10px 16px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                border: 1px solid;
                transition: all 0.2s ease;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                text-decoration: none;
                min-height: 40px;
                white-space: nowrap;
            }
            
            .cc-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none !important;
            }
            
            .cc-btn-primary {
                background: ${PRIMARY_BLUE};
                color: white;
                border-color: ${PRIMARY_BLUE};
            }
            
            .cc-btn-primary:hover:not(:disabled) {
                background: #0288d1;
                border-color: #0288d1;
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(3, 155, 229, 0.3);
            }
            
            .cc-btn-secondary {
                background: #f3f4f6;
                color: #374151;
                border-color: #d1d5db;
            }
            
            .cc-btn-secondary:hover:not(:disabled) {
                background: #e5e7eb;
                border-color: #9ca3af;
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .cc-btn-success {
                background: ${POSITIVE_GREEN};
                color: white;
                border-color: ${POSITIVE_GREEN};
            }
            
            .cc-btn-success:hover:not(:disabled) {
                background: #059669;
                border-color: #059669;
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
            }
            
            .cc-btn-danger {
                background: #ef4444;
                color: white;
                border-color: #ef4444;
            }
            
            .cc-btn-danger:hover:not(:disabled) {
                background: #dc2626;
                border-color: #dc2626;
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
            }
            
            .cc-btn-ghost {
                background: transparent;
                color: #6b7280;
                border-color: transparent;
            }
            
            .cc-btn-ghost:hover:not(:disabled) {
                background: #f9fafb;
                color: #374151;
                border-color: #e5e7eb;
            }
            
            /* Legacy button compatibility */
            .cc-notes-button {
                padding: 10px 16px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                border: 1px solid;
                transition: all 0.2s ease;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                min-height: 40px;
            }
            
            .cc-notes-save-btn {
                background: ${PRIMARY_BLUE};
                color: white;
                border-color: ${PRIMARY_BLUE};
            }
            
            .cc-notes-save-btn:hover:not(:disabled) {
                background: #0288d1;
                border-color: #0288d1;
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(3, 155, 229, 0.3);
            }
            
            .cc-notes-cancel-btn {
                background: #f3f4f6;
                color: #374151;
                border-color: #d1d5db;
            }
            
            .cc-notes-cancel-btn:hover:not(:disabled) {
                background: #e5e7eb;
                border-color: #9ca3af;
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .cc-goals-cancel-btn {
                background: #fee2e2;
                border-color: #ef4444;
                color: #991b1b;
            }
            
            .cc-goals-cancel-btn:hover:not(:disabled) {
                background: #fecaca;
                border-color: #dc2626;
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(239, 68, 68, 0.2);
            }
            
            /* Settings specific styles */
            .cc-settings-category-section {
                margin-bottom: 24px;
            }
            
            .cc-category-section-header {
                margin-bottom: 12px;
                padding-left: 4px;
            }
            
            .cc-category-section-title {
                margin: 0 0 4px 0;
                font-size: 14px;
                font-weight: 700;
                color: #374151;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .cc-category-section-description {
                margin: 0;
                font-size: 13px;
                color: #6b7280;
                line-height: 1.3;
            }
            
            .cc-category-section-items {
                display: flex;
                flex-direction: column;
            }
            
            .cc-settings-hub-button:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 12px rgba(0,0,0,0.1);
                filter: brightness(1.05);
            }
            
            .cc-settings-hub-button:active {
                transform: translateY(0);
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .cc-settings-item-icon {
                transition: transform 0.2s ease;
            }
            
            .cc-settings-hub-button:hover .cc-settings-item-icon {
                transform: scale(1.1);
            }
            
            .cc-settings-actions {
                display: flex;
                justify-content: flex-end;
                gap: 12px;
                padding-top: 16px;
                border-top: 1px solid #e5e7eb;
                margin-top: 24px;
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

    document.getElementById('cc-open-beta-modal').addEventListener('click', () => {
        closeModal();
        showBetaModal();
    });
}

function showBetaModal() {
    const savedCode = localStorage.getItem(BETA_PARTNER_CODE_KEY);
    const savedName = localStorage.getItem(BETA_USER_NAME_KEY);

    // If user already has a valid code, show beta status
    if (savedCode && savedName) {
        showBetaStatusModal(savedName);
        return;
    }

    // Otherwise, show partner code input modal
    const bodyHtml = `
        <div class="cc-settings-card-soft" style="margin-bottom: 20px;">
            <h3 style="margin: 0 0 8px 0; font-size: 1.1rem; color: #111827; font-weight: 600;">Enter Partner Code</h3>
            <p style="font-size: 0.9rem; color: #6b7280; margin: 0; line-height: 1.4;">
                Enter your partner code to join the ClassCharts Improver beta program.
            </p>
        </div>

        <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">Partner Code (6 digits)</label>
            <div id="cc-beta-code-inputs" style="display: flex; gap: 8px; justify-content: center;">
                ${[0, 1, 2, 3, 4, 5].map(i => `
                    <input type="text" id="cc-beta-digit-${i}" maxlength="1" style="
                        width: 48px;
                        height: 56px;
                        padding: 0;
                        border: 2px solid #d1d5db;
                        border-radius: 8px;
                        font-size: 24px;
                        font-weight: 600;
                        text-align: center;
                        font-family: monospace;
                        box-sizing: border-box;
                        transition: border-color 0.2s, box-shadow 0.2s;
                    ">
                `).join('')}
            </div>
        </div>

        <div style="margin-bottom: 20px; padding: 12px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="font-size: 13px; color: #92400e; margin: 0; line-height: 1.4;">
                <strong>⚠️ Important:</strong> This is your unique code for your account. Do not share it with anyone - it's like a password.
            </p>
        </div>

        <div style="margin-bottom: 20px; text-align: center;">
            <p style="font-size: 13px; color: #6b7280; margin: 0;">
                Don't have a partner code? <a href="https://classchartsimprover.pages.dev/beta" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Get one here →</a>
            </p>
        </div>

        <div class="cc-settings-actions" style="margin-top: 24px;">
            <button id="cc-beta-cancel-btn" class="cc-btn cc-btn-secondary">Cancel</button>
            <button id="cc-beta-submit-btn" class="cc-btn cc-btn-primary">Submit</button>
        </div>
    `;

    const { closeModal } = createBaseModal('cc-beta-modal', 'Beta Access', bodyHtml, '400px');

    // Setup OTP-style input handling
    const digitInputs = [];
    for (let i = 0; i < 6; i++) {
        const input = document.getElementById(`cc-beta-digit-${i}`);
        digitInputs.push(input);

        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (!/^\d$/.test(value)) {
                e.target.value = '';
                return;
            }
            if (value && i < 5) {
                digitInputs[i + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && i > 0) {
                digitInputs[i - 1].focus();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').trim();
            if (/^\d{6}$/.test(pastedData)) {
                pastedData.split('').forEach((digit, index) => {
                    if (index < 6) {
                        digitInputs[index].value = digit;
                    }
                });
                digitInputs[5].focus();
            }
        });
    }

    document.getElementById('cc-beta-cancel-btn').addEventListener('click', closeModal);

    document.getElementById('cc-beta-submit-btn').addEventListener('click', async () => {
        const code = digitInputs.map(input => input.value).join('');

        if (!code) {
            showInfoModal('Error', 'Please enter a partner code', 'error');
            return;
        }

        if (!/^\d{6}$/.test(code)) {
            showInfoModal('Error', 'Partner code must be exactly 6 digits', 'error');
            return;
        }

        // Query Supabase for the partner code
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/partnercodes?code=eq.${encodeURIComponent(code)}&select=*`, {
                headers: {
                    'apikey': 'sb_publishable_a7GOW5zpj5YQp-nXJ6KyQA_NGkNyWFh',
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok || !data || data.length === 0) {
                showInfoModal('Error', 'Invalid partner code. Please check your code and try again.', 'error');
                return;
            }

            const partnerData = data[0];
            const name = partnerData.name || 'Beta Tester';

            // Save to localStorage
            localStorage.setItem(BETA_PARTNER_CODE_KEY, code);
            localStorage.setItem(BETA_USER_NAME_KEY, name);

            closeModal();
            showBetaStatusModal(name);
            showInfoModal('Success', `Welcome to the beta program, ${name}!`, 'success');

        } catch (error) {
            console.error('Error validating partner code:', error);
            showInfoModal('Error', 'Failed to validate partner code. Please try again.', 'error');
        }
    });
}

function showBetaStatusModal(name) {
    const bodyHtml = `
        <div class="cc-settings-card-soft" style="margin-bottom: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
            <h3 style="margin: 0 0 8px 0; font-size: 1.2rem; color: white; font-weight: 600;">Hi, ${name}!</h3>
            <p style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.9); margin: 0; line-height: 1.4;">
                You're part of the ClassCharts Improver beta program.
            </p>
        </div>

        <div style="margin-bottom: 20px;">
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 16px; line-height: 1.5;">
                We're working hard on beta feedback. Check back soon for new features!
            </p>

            <div style="display: flex; flex-direction: column; gap: 12px;">
                <button disabled class="cc-btn cc-btn-secondary" style="opacity: 0.6; cursor: not-allowed;">
                    <span style="display: flex; align-items: center; gap: 8px;">
                        <span>🚀</span>
                        <span>Early Access Features</span>
                    </span>
                </button>
                <button disabled class="cc-btn cc-btn-secondary" style="opacity: 0.6; cursor: not-allowed;">
                    <span style="display: flex; align-items: center; gap: 8px;">
                        <span>💬</span>
                        <span>Beta Feedback Channel</span>
                    </span>
                </button>
                <button disabled class="cc-btn cc-btn-secondary" style="opacity: 0.6; cursor: not-allowed;">
                    <span style="display: flex; align-items: center; gap: 8px;">
                        <span>🎁</span>
                        <span>Exclusive Rewards</span>
                    </span>
                </button>
            </div>
        </div>

        <div class="cc-settings-actions" style="margin-top: 24px;">
            <button id="cc-beta-status-close-btn" class="cc-btn cc-btn-primary">Close</button>
        </div>
    `;

    const { closeModal } = createBaseModal('cc-beta-status-modal', 'Beta Status', bodyHtml, '400px');

    document.getElementById('cc-beta-status-close-btn').addEventListener('click', closeModal);
}

function showFeatureControlsModal() {
    const showBadges = getStoredBoolean(FEATURE_SHOW_SAFETY_BADGES_ENABLED_KEY, true);

    const featureCategories = [
        {
            title: 'Core Interface',
            description: 'Main UI improvements and navigation enhancements',
            icon: getAssetUrl('layout.svg'),
            features: [
                { key: FEATURE_IMPROVED_UI_ENABLED_KEY, label: 'Improved UI', description: 'Enhanced visual design and layout', defaultEnabled: true, icon: getAssetUrl('layout.svg') },
                { key: DARK_MODE_ENABLED_KEY, label: 'Dark mode', description: 'Dark theme for extension interface', defaultEnabled: false, icon: getAssetUrl('moon.svg') },
                { key: FEATURE_ACCENT_COLOR_ENABLED_KEY, label: 'Custom accent colour', description: 'Personalized color scheme', defaultEnabled: true, icon: getAssetUrl('droplet.svg') },
            ]
        },
        {
            title: 'Homework Features',
            description: 'Enhancements for the homework section',
            icon: getAssetUrl('book-open.svg'),
            features: [
                { key: HOMEWORK_REDESIGN_KEY, label: 'Homework tab redesign', description: 'Modern card-based layout', defaultEnabled: false, icon: getAssetUrl('grid.svg') },
                { key: HOMEWORK_DATE_HINT_KEY, label: 'Due date hints', description: 'Visual indicators for due dates', defaultEnabled: false, icon: getAssetUrl('calendar.svg') },
            ]
        },
        {
            title: 'Personal Tools',
            description: 'Productivity and personal organization features',
            icon: getAssetUrl('user.svg'),
            features: [
                { key: FEATURE_NOTES_ENABLED_KEY, label: 'Personal Notes', description: 'Private note-taking system', defaultEnabled: true, icon: getAssetUrl('file-text.svg') },
                { key: FEATURE_GOALS_ENABLED_KEY, label: 'Goals Tracker', description: 'Track personal objectives', defaultEnabled: true, icon: getAssetUrl('target.svg') },
                { key: FEATURE_PROFILE_PHOTO_ENABLED_KEY, label: 'Custom profile photo', description: 'Personalized profile image', defaultEnabled: true, icon: getAssetUrl('camera.svg') },
                { key: FEATURE_HIDE_ENCRYPTION_WARNING_KEY, label: 'Hide encryption warning', description: 'Hide cloud sync encryption notice in notes', defaultEnabled: false, icon: getAssetUrl('shield-off.svg') },
            ]
        },
        {
            title: 'Behavior & Rewards',
            description: 'Features related to behavior points and rewards',
            icon: getAssetUrl('award.svg'),
            features: [
                { key: FEATURE_CUSTOM_POSITIVE_ICON_ENABLED_KEY, label: 'Custom +1 icon', description: 'Personalized positive behavior icon', defaultEnabled: true, icon: getAssetUrl('smile.svg') },
                { key: FEATURE_DETENTION_CELEBRATION_ENABLED_KEY, label: 'Detention celebration', description: 'Fun animations for no detentions', defaultEnabled: true, icon: getAssetUrl('zap.svg') },
            ]
        },
        {
            title: 'Safety & Warnings',
            description: 'Safety alerts and helpful warnings',
            icon: getAssetUrl('shield.svg'),
            features: [
                { key: FEATURE_REPORT_CONCERN_ENABLED_KEY, label: 'Report concern warning', description: 'Alert for report concerns', defaultEnabled: true, icon: getAssetUrl('alert-octagon.svg') },
                { key: FEATURE_CODE_WARNING_ENABLED_KEY, label: '"My code" warning', description: 'Alert for code sharing', defaultEnabled: true, icon: getAssetUrl('code.svg') },
                { key: FEATURE_LOGIN_ALERT_ENABLED_KEY, label: 'Login active notice', description: 'Show when account is in use', defaultEnabled: true, icon: getAssetUrl('log-in.svg') },
                { key: FEATURE_DEVELOPER_PREVIEW_ALERT_ENABLED_KEY, label: 'Developer Preview Alert', description: 'Warning for developer features', defaultEnabled: true, icon: getAssetUrl('terminal.svg') },
            ]
        },
        {
            title: 'Communication',
            description: 'Messaging and announcement enhancements',
            icon: getAssetUrl('message-square.svg'),
            features: [
                { key: FEATURE_MESSAGES_PLACEHOLDER_ENABLED_KEY, label: 'Messages guide', description: 'Helpful text for messages', defaultEnabled: true, icon: getAssetUrl('message-circle.svg') },
                { key: FEATURE_ANNOUNCEMENTS_DESCRIPTION_ENABLED_KEY, label: 'Announcements description', description: 'Enhanced announcement display', defaultEnabled: true, icon: getAssetUrl('volume-2.svg') },
            ]
        },
        {
            title: 'System & Sync',
            description: 'Cloud sync and system features',
            icon: getAssetUrl('cloud.svg'),
            features: [
                { key: FEATURE_CLOUD_SYNC_ENABLED_KEY, label: 'Cloud sync', description: 'Sync settings across devices', defaultEnabled: true, icon: getAssetUrl('refresh-cw.svg') },
                { key: FEATURE_REFRESH_TWEAKS_ENABLED_KEY, label: 'Refresh Tweaks button', description: 'Quick refresh for UI issues', defaultEnabled: true, icon: getAssetUrl('refresh-ccw.svg') },
                { key: FEATURE_PROMPT_REVIEW_ENABLED_KEY, label: 'Welcome/Review prompts', description: 'Occasional feedback requests', defaultEnabled: true, icon: getAssetUrl('star.svg') },
            ]
        },
        {
            title: 'Links & Contact',
            description: 'External links and contact options',
            icon: getAssetUrl('external-link.svg'),
            features: [
                { key: FEATURE_CONTACT_LINK_ENABLED_KEY, label: 'Contact extension link', description: 'Quick access to support', defaultEnabled: true, icon: getAssetUrl('mail.svg') },
            ]
        },
        {
            title: 'Interface Options',
            description: 'Display and interface preferences',
            icon: getAssetUrl('settings.svg'),
            features: [
                { key: FEATURE_SHOW_SAFETY_BADGES_ENABLED_KEY, label: 'Show safety emojis', description: 'Visual indicators in this list', defaultEnabled: true, icon: getAssetUrl('eye.svg') },
            ]
        }
    ];

    const bodyHtml = `
        <div class="cc-settings-stack">
            <div class="cc-settings-card-soft">
                <p class="cc-settings-subtitle" style="font-size:0.95rem; margin-bottom: 16px;">
                    Organized by category. Changes take effect immediately.
                </p>
            </div>

            ${featureCategories.map(category => `
                <div class="cc-settings-category">
                    <div class="cc-category-header">
                        <img src="${category.icon}" alt="${category.title}" class="cc-category-icon">
                        <div class="cc-category-info">
                            <h4 class="cc-category-title">${category.title}</h4>
                            <p class="cc-category-description">${category.description}</p>
                        </div>
                    </div>
                    <div class="cc-category-features">
                        ${category.features.map(feature => {
                            const checked = getStoredBoolean(feature.key, feature.defaultEnabled);
                            return `
                                <div class="cc-feature-item">
                                    <div class="cc-feature-info">
                                        <div class="cc-feature-label">
                                            <img src="${feature.icon}" alt="${feature.label}" class="cc-feature-icon">
                                            ${feature.label}
                                        </div>
                                        <div class="cc-feature-description">${feature.description}</div>
                                    </div>
                                    <label class="cc-feature-toggle">
                                        <input type="checkbox" id="${feature.key}" ${checked ? 'checked' : ''}>
                                        <span class="cc-toggle-slider"></span>
                                    </label>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `).join('')}

            <div class="cc-settings-actions" style="margin-top: 24px;">
                <button id="cc-feature-controls-done" class="cc-notes-button cc-notes-save-btn">Done</button>
            </div>
        </div>
        
        <style>
            .cc-settings-category {
                margin-bottom: 24px;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                overflow: hidden;
                background: white;
            }
            
            .cc-category-header {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px 20px;
                background: #f8fafc;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .cc-category-icon {
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f1f5f9;
                border-radius: 8px;
                padding: 6px;
            }
            
            .cc-category-info {
                flex: 1;
            }
            
            .cc-category-title {
                margin: 0 0 4px 0;
                font-size: 16px;
                font-weight: 600;
                color: #111827;
            }
            
            .cc-category-description {
                margin: 0;
                font-size: 13px;
                color: #6b7280;
                line-height: 1.4;
            }
            
            .cc-category-features {
                padding: 4px;
            }
            
            .cc-feature-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 16px;
                border-radius: 8px;
                transition: background-color 0.2s;
            }
            
            .cc-feature-item:hover {
                background: #f9fafb;
            }
            
            .cc-feature-info {
                flex: 1;
                min-width: 0;
            }
            
            .cc-feature-label {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 500;
                color: #111827;
                font-size: 14px;
                margin-bottom: 2px;
            }
            
            .cc-feature-icon {
                width: 16px;
                height: 16px;
                flex-shrink: 0;
            }
            
            .cc-feature-description {
                font-size: 12px;
                color: #6b7280;
                line-height: 1.3;
            }
            
            .cc-feature-toggle {
                position: relative;
                display: inline-block;
                width: 44px;
                height: 24px;
                margin-left: 12px;
            }
            
            .cc-feature-toggle input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .cc-toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #cbd5e1;
                transition: 0.3s;
                border-radius: 24px;
            }
            
            .cc-toggle-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: 0.3s;
                border-radius: 50%;
            }
            
            input:checked + .cc-toggle-slider {
                background-color: ${PRIMARY_BLUE};
            }
            
            input:checked + .cc-toggle-slider:before {
                transform: translateX(20px);
            }
            
            .cc-safety-badge.hidden {
                display: none;
            }
        </style>
    `;

    const { closeModal } = createBaseModal('cc-feature-controls', 'Feature Controls', bodyHtml, '560px');
    document.getElementById('cc-feature-controls-done').addEventListener('click', closeModal);

    featureCategories.forEach(category => {
        category.features.forEach(feature => {
            const el = document.getElementById(feature.key);
            if (!el) return;
            el.addEventListener('change', () => {
                if (feature.key === HOMEWORK_REDESIGN_KEY) setHomeworkRedesignStatus(el.checked);
                else if (feature.key === HOMEWORK_DATE_HINT_KEY) setHomeworkDateHintStatus(el.checked);
                else if (feature.key === DARK_MODE_ENABLED_KEY) setDarkModeEnabled(el.checked);
                else setStoredBoolean(feature.key, el.checked);
                
                // Apply immediate behavior when toggles change
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

                if (feature.key === FEATURE_CLOUD_SYNC_ENABLED_KEY) {
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
                if (feature.key === FEATURE_SHOW_SAFETY_BADGES_ENABLED_KEY) {
                    const hide = !el.checked;
                    document.querySelectorAll('.cc-safety-badge').forEach(b => {
                        if (hide) b.classList.add('hidden');
                        else b.classList.remove('hidden');
                    });
                }

                // Homework toggles use existing setters to stay consistent
                if (feature.key === HOMEWORK_REDESIGN_KEY) applyHomeworkRedesign();
                if (feature.key === HOMEWORK_DATE_HINT_KEY) injectHomeworkDateHint();
            });
        });
    });
}

function showUITweaksModal() {
    const isRedesignEnabled = getHomeworkRedesignStatus();
    const reviewIntervalDays = getReviewIntervalDays();

    const uiTweakCategories = [
        {
            title: 'Homework Interface',
            description: 'Customize the homework section appearance',
            items: [
                {
                    key: 'homework-redesign',
                    label: 'Homework Tab Redesign',
                    description: 'Modern card-based layout with improved spacing and visual hierarchy',
                    enabled: isRedesignEnabled,
                    icon: '??'
                }
            ]
        },
        {
            title: 'User Experience',
            description: 'Manage prompts and feedback requests',
            items: [
                {
                    key: 'review-prompt',
                    label: 'Review Prompt Frequency',
                    description: 'How often to show the "Enjoying the Improver?" feedback request',
                    enabled: true,
                    icon: '??',
                    type: 'number',
                    value: reviewIntervalDays,
                    min: 1,
                    max: 365
                }
            ]
        },
        {
            title: 'Coming Soon',
            description: 'Additional customization options in development',
            items: [
                {
                    key: 'future-features',
                    label: 'New UI Tweaks',
                    description: 'More appearance and behavior options will be added here as they are developed',
                    enabled: false,
                    icon: '??',
                    type: 'info'
                }
            ]
        }
    ];

    const bodyHtml = `
        <div class="cc-settings-stack">
            <div class="cc-settings-card-soft" style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 8px 0; font-size: 1.05rem; color: #111827; font-weight: 600;">UI Tweaks</h3>
                <p style="font-size: 0.9rem; color: #6b7280; margin: 0; line-height: 1.4;">
                    Fine-tune the look and feel of the ClassCharts student portal.
                </p>
            </div>

            ${uiTweakCategories.map(category => `
                <div class="cc-ui-tweak-category">
                    <div class="cc-tweak-category-header">
                        <h4 class="cc-tweak-category-title">${category.title}</h4>
                        <p class="cc-tweak-category-description">${category.description}</p>
                    </div>
                    <div class="cc-tweak-category-items">
                        ${category.items.map(item => {
                            if (item.type === 'number') {
                                return `
                                    <div class="cc-tweak-item cc-tweak-item-number">
                                        <div class="cc-tweak-info">
                                            <div class="cc-tweak-label">
                                                <span class="cc-tweak-icon">${item.icon}</span>
                                                ${item.label}
                                            </div>
                                            <div class="cc-tweak-description">${item.description}</div>
                                        </div>
                                        <div class="cc-tweak-control">
                                            <input 
                                                type="number" 
                                                id="cc-review-interval-days" 
                                                class="cc-number-input"
                                                value="${item.value}" 
                                                min="${item.min}" 
                                                max="${item.max}"
                                                style="width: 80px; padding: 6px 8px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                                            >
                                            <span style="font-size: 12px; color: #6b7280; margin-left: 6px;">days</span>
                                        </div>
                                    </div>
                                `;
                            } else if (item.type === 'info') {
                                return `
                                    <div class="cc-tweak-item cc-tweak-item-info">
                                        <div class="cc-tweak-info">
                                            <div class="cc-tweak-label">
                                                <span class="cc-tweak-icon">${item.icon}</span>
                                                ${item.label}
                                            </div>
                                            <div class="cc-tweak-description">${item.description}</div>
                                        </div>
                                        <div class="cc-tweak-status">
                                            <span style="font-size: 12px; color: #9ca3af; font-style: italic;">Coming soon</span>
                                        </div>
                                    </div>
                                `;
                            } else {
                                return `
                                    <div class="cc-tweak-item">
                                        <div class="cc-tweak-info">
                                            <div class="cc-tweak-label">
                                                <span class="cc-tweak-icon">${item.icon}</span>
                                                ${item.label}
                                            </div>
                                            <div class="cc-tweak-description">${item.description}</div>
                                        </div>
                                        <div class="cc-tweak-control">
                                            <label class="cc-switch">
                                                <input type="checkbox" id="cc-homework-redesign-toggle" ${item.enabled ? 'checked' : ''}>
                                                <span class="cc-slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                `;
                            }
                        }).join('')}
                    </div>
                </div>
            `).join('')}

            <div class="cc-settings-actions" style="margin-top: 24px;">
                <button id="cc-ui-tweaks-close-btn" class="cc-notes-button cc-notes-save-btn">Done</button>
            </div>
        </div>

        <style>
            .cc-ui-tweak-category {
                margin-bottom: 24px;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                overflow: hidden;
                background: white;
            }
            
            .cc-tweak-category-header {
                padding: 16px 20px;
                background: #f8fafc;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .cc-tweak-category-title {
                margin: 0 0 4px 0;
                font-size: 14px;
                font-weight: 600;
                color: #374151;
            }
            
            .cc-tweak-category-description {
                margin: 0;
                font-size: 12px;
                color: #6b7280;
                line-height: 1.3;
            }
            
            .cc-tweak-category-items {
                padding: 4px;
            }
            
            .cc-tweak-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px;
                border-radius: 8px;
                transition: background-color 0.2s;
            }
            
            .cc-tweak-item:hover {
                background: #f9fafb;
            }
            
            .cc-tweak-item-number {
                align-items: flex-start;
            }
            
            .cc-tweak-item-info {
                opacity: 0.7;
            }
            
            .cc-tweak-info {
                flex: 1;
                min-width: 0;
            }
            
            .cc-tweak-label {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 500;
                color: #111827;
                font-size: 14px;
                margin-bottom: 4px;
            }
            
            .cc-tweak-icon {
                font-size: 16px;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f1f5f9;
                border-radius: 6px;
            }
            
            .cc-tweak-description {
                font-size: 12px;
                color: #6b7280;
                line-height: 1.4;
                margin-left: 32px;
            }
            
            .cc-tweak-control {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .cc-number-input:focus {
                outline: none;
                border-color: ${PRIMARY_BLUE};
                box-shadow: 0 0 0 3px rgba(3, 155, 229, 0.1);
            }
        </style>
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

            <div id="cc-james-auth-info" class="cc-settings-card-soft" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #0ea5e9;">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <img src="${getAssetUrl('info.svg')}" alt="Info" style="width: 20px; height: 20px; margin-top: 2px; filter: invert(42%) sepia(100%) saturate(2000%) hue-rotate(200deg) brightness(0.8);">
                    <div>
                        <h5 style="margin: 0 0 6px 0; color: #075985; font-size: 0.95rem; font-weight: 600;">James Auth - Recommended Platform</h5>
                        <p style="margin: 0; color: #0c4a6e; font-size: 0.85rem; line-height: 1.4;">
                            The recommended platform to connect to all my apps. From ClassCharts Improver to LiteStack, manage your entire workspace with a single identity. No more remembering different passwords for each service.
                        </p>
                        <a href="https://jamesauth.pages.dev" target="_blank" style="color: #0284c7; font-size: 0.8rem; text-decoration: underline; font-weight: 500;">Learn more about James Auth →</a>
                    </div>
                </div>
            </div>

            
            <div id="cc-quick-connect-section" class="cc-settings-card">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 12px;">Quick Connect</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
                    <button id="cc-sync-connect-github" class="cc-notes-button cc-notes-save-btn" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px;">
                        <img src="${getAssetUrl('github.svg')}" alt="" style="width: 18px; height: 18px;">
                        GitHub
                    </button>
                    <button id="cc-sync-connect-google" class="cc-notes-button cc-notes-save-btn" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: #4285f4; border-color: #4285f4;">
                        <img src="${getAssetUrl('chrome.svg')}" alt="" style="width: 18px; height: 18px; filter: brightness(0) invert(1);">
                        Google
                    </button>
                    <button id="cc-sync-connect-james" class="cc-notes-button cc-notes-save-btn" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: #7c3aed; border-color: #7c3aed;">
                        <img src="${getAssetUrl('user.svg')}" alt="" style="width: 18px; height: 18px; filter: brightness(0) invert(1);">
                        James Auth
                    </button>
                </div>
            </div>

            <div id="cc-email-signin-section" class="cc-settings-card">
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

            <div id="cc-james-auth-section" class="cc-settings-card" style="display: none;">
                <h4 class="cc-settings-title" style="color: ${PRIMARY_BLUE}; margin-bottom: 12px;">James Auth Account</h4>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <button id="cc-james-manage-account" class="cc-notes-button cc-notes-save-btn" style="background: #f3f4f6; border-color: #9333ea;">
                        Manage Account
                    </button>
                    <button id="cc-james-logout" class="cc-notes-button cc-goals-cancel-btn" style="background: #fee2e2; border-color: #ef4444; color: #991b1b;">
                        Sign Out
                    </button>
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

    // Convert status types to toast types
    const statusToToastType = (kind) => {
        switch (kind) {
            case 'ok': return 'success';
            case 'err': return 'error';
            case 'warn': return 'warning';
            default: return 'info';
        }
    };

    const refreshStatus = async () => {
        // Check James Auth first
        const jamesAuthUser = await getJamesAuthUser();
        const quickConnectSection = document.getElementById('cc-quick-connect-section');
        const emailSignInSection = document.getElementById('cc-email-signin-section');
        const jamesAuthSection = document.getElementById('cc-james-auth-section');
        const jamesAuthInfo = document.getElementById('cc-james-auth-info');
        
        if (jamesAuthUser && jamesAuthUser.isAuthenticated) {
            updateAccountSyncUI(jamesAuthUser);
            
            // Hide quick connect, email sections, and James Auth info box, show James Auth section
            if (quickConnectSection) quickConnectSection.style.display = 'none';
            if (emailSignInSection) emailSignInSection.style.display = 'none';
            if (jamesAuthInfo) jamesAuthInfo.style.display = 'none';
            if (jamesAuthSection) jamesAuthSection.style.display = 'block';
            return;
        }
        
        // Show quick connect, email sections, and James Auth info box, hide James Auth section
        if (quickConnectSection) quickConnectSection.style.display = 'block';
        if (emailSignInSection) emailSignInSection.style.display = 'block';
        if (jamesAuthInfo) jamesAuthInfo.style.display = 'block';
        if (jamesAuthSection) jamesAuthSection.style.display = 'none';
        
        // Check Supabase session
        const session = await getCloudSession();
        if (session?.user?.email) showToast(`Connected as ${session.user.email}. Cloud sync is enabled.`, 'success');
        else showToast('Not connected. Your settings are stored locally on this device.', 'warning');
    };

    refreshStatus();
    
    // Setup James Auth listener when modal opens
    setupJamesAuthListener();

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
        showAuthInProgressModal('GitHub');
        const resp = await bgMessage({ type: 'SUPABASE_SIGN_IN_GITHUB' });
        hideAuthInProgressModal();
        if (resp?.error) return showErrorModal('GitHub Authentication Failed', resp.error);
        await pullSettingsFromCloud().catch(() => {});
        await upsertSettingsToCloud().catch(() => {});
        startAutoCloudSync();
        await refreshStatus();
        closeModal();
    });

    document.getElementById('cc-sync-connect-google').addEventListener('click', async () => {
        showAuthInProgressModal('Google');
        const resp = await bgMessage({ type: 'SUPABASE_SIGN_IN_GOOGLE' });
        hideAuthInProgressModal();
        if (resp?.error) return showErrorModal('Google Authentication Failed', resp.error);
        await pullSettingsFromCloud().catch(() => {});
        await upsertSettingsToCloud().catch(() => {});
        startAutoCloudSync();
        await refreshStatus();
        closeModal();
    });

    document.getElementById('cc-sync-connect-james').addEventListener('click', () => {
        showAuthInProgressModal('James Auth');
        openJamesAuthWindow();
    });

    document.getElementById('cc-james-manage-account').addEventListener('click', () => {
        window.open('https://jamesauth.pages.dev/dashboard', '_blank');
    });

    document.getElementById('cc-james-logout').addEventListener('click', async () => {
        showToast('Signing out...', 'info');
        signOutJamesAuth();
        await refreshStatus();
    });

    document.getElementById('cc-sync-email-signin').addEventListener('click', async () => {
        const email = document.getElementById('cc-sync-email').value.trim();
        const password = document.getElementById('cc-sync-password').value;
        if (!email || !password) return showToast('Enter an email and password.', 'warning');
        showToast('Signing in…', 'info');
        const resp = await bgMessage({ type: 'SUPABASE_SIGN_IN_PASSWORD', email, password });
        if (resp?.error) return showErrorModal('Sign In Failed', resp.error);
        await pullSettingsFromCloud().catch(() => {});
        await upsertSettingsToCloud().catch(() => {});
        startAutoCloudSync();
        await refreshStatus();
        closeModal();
    });

    document.getElementById('cc-sync-email-signup').addEventListener('click', async () => {
        const email = document.getElementById('cc-sync-email').value.trim();
        const password = document.getElementById('cc-sync-password').value;
        if (!email || !password) return showToast('Enter an email and password.', 'warning');
        showToast('Creating account…', 'info');
        const resp = await bgMessage({ type: 'SUPABASE_SIGN_UP_PASSWORD', email, password });
        if (resp?.error) return showErrorModal('Account Creation Failed', resp.error);
        showToast('Account created. If email confirmation is enabled, confirm your email then sign in.', 'success');
        await refreshStatus();
    });

    document.getElementById('cc-sync-push').addEventListener('click', async () => {
        showToast('Syncing to cloud…', 'info');
        const r = await upsertSettingsToCloud();
        if (!r.ok) return showErrorModal('Sync Failed', `Sync failed (${r.reason || 'unknown'}).`, r.details);
        showToast('Synced to cloud.', 'success');
    });

    document.getElementById('cc-sync-pull').addEventListener('click', async () => {
        showToast('Pulling from cloud…', 'info');
        const r = await pullSettingsFromCloud();
        if (!r.ok) return showErrorModal('Pull Failed', `Pull failed (${r.reason || 'unknown'}).`, r.details);
        showToast('Pulled from cloud.', 'success');
    });

    document.getElementById('cc-sync-disconnect').addEventListener('click', async () => {
        showToast('Disconnecting...', 'info');
        
        // Check if James Auth is connected and sign out
        const jamesAuthUser = await getJamesAuthUser();
        if (jamesAuthUser && jamesAuthUser.isAuthenticated) {
            signOutJamesAuth();
            showToast('Disconnected. Your settings will remain stored locally on this device.', 'warning');
            return;
        }
        
        // Otherwise sign out from Supabase
        const resp = await bgMessage({ type: 'SUPABASE_SIGN_OUT' });
        if (resp?.error) return showErrorModal('Sign Out Failed', resp.error);
        showToast('Disconnected. Your settings will remain stored locally on this device.', 'warning');
    });
}

function showNotesModal() {
    if (!isNotesEnabled()) return;
    const showCloudWarning = isCloudSyncEnabled() && isSyncEnabled(SYNC_NOTES_ENABLED_KEY, true);
    const hideEncryptionWarning = getStoredBoolean(FEATURE_HIDE_ENCRYPTION_WARNING_KEY, false);
    const warningHtml = showCloudWarning && !hideEncryptionWarning ? `
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
    const hideEncryptionWarning = getStoredBoolean(FEATURE_HIDE_ENCRYPTION_WARNING_KEY, false);
    const warningHtml = showCloudWarning && !hideEncryptionWarning ? `
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
    const hideEncryptionWarning = getStoredBoolean(FEATURE_HIDE_ENCRYPTION_WARNING_KEY, false);
    const warningHtml = showCloudWarning && !hideEncryptionWarning ? `
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
    });}

function updateReportConcernIcon() {
    // Find the report concern menu item
    const reportConcernItems = document.querySelectorAll('.desktop-drawer-pupil-menu-item');
    reportConcernItems.forEach(item => {
        const textElement = item.querySelector('.MuiListItemText-primary');
        if (textElement && textElement.textContent.trim() === 'Report concern') {
            const iconElement = item.querySelector('.MuiListItemIcon-root svg');
            if (iconElement && !iconElement.dataset.ccImproverReportIcon) {
                // Store original icon
                iconElement.dataset.ccImproverReportIcon = 'true';
                iconElement.dataset.ccImproverOriginalIcon = iconElement.outerHTML;
                
                // Replace with custom icon
                const customIcon = document.createElement('img');
                customIcon.src = getAssetUrl('alert-triangle.svg');
                customIcon.alt = 'Report concern';
                customIcon.style.cssText = `
                    width: 24px;
                    height: 24px;
                    filter: invert(53%) sepia(85%) saturate(3065%) hue-rotate(334deg) brightness(99%) contrast(92%);
                `;
                
                iconElement.parentNode.replaceChild(customIcon, iconElement);
            }
        }
    });
}

function replacePositiveAchievementIcons() {
    updateCustomIcons();
    updateReportConcernIcon();
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

// Removed injectVerifiedSchoolIcons function - verified icons no longer displayed

// Removed showVerifiedTooltip and hideVerifiedTooltip functions - no longer needed

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
    const maxAttempts = 60; // Increased from 30 to 60 for better reliability
    let tweaksApplied = false;

    // Apply core styles immediately (these don't depend on DOM elements)
    try {
        applyDarkMode();
        applyAccentColor();
    } catch (error) {
        console.warn('Failed to apply core styles:', error);
    }

    // Initialize cloud sync in background
    getCloudSession().then((session) => {
        if (session?.access_token) {
            pullSettingsFromCloud().catch(() => {});
            startAutoCloudSync();
        }
    }).catch(error => {
        console.warn('Cloud session initialization failed:', error);
    });

    // Apply initial tweaks that don't require specific DOM elements
    try {
        replaceClassChartsLogo();
        applyImprovedUI(getImprovedUIStatus());
        applyHomeworkRedesign();
        applyCustomProfilePhoto();
        updateCustomIcons();
    } catch (error) {
        console.warn('Failed to apply initial tweaks:', error);
    }

    const interval = setInterval(() => {
        try {
            const menuInjected = document.querySelector('.cc-improver-header');

            // Update dynamic content on each attempt
            updateDefaultIcons();
            updateCustomIcons();
            injectHomeworkDateHint();
            applyHomeworkRedesign();

            // Create menu item if not already injected
            if (!menuInjected) {
                try {
                    if (createMenuItem()) {
                        checkAndShowModals();
                    }
                } catch (error) {
                    console.warn('Failed to create menu item:', error);
                }
            }

            // Remove disabled features
            if (!isFeatureEnabledByKey(FEATURE_CONTACT_LINK_ENABLED_KEY, true)) {
                document.querySelectorAll('.cc-improver-contact-link').forEach(el => el.remove());
            }
            if (!isFeatureEnabledByKey(FEATURE_CODE_WARNING_ENABLED_KEY, true)) {
                document.querySelectorAll('.cc-improver-code-warning').forEach(el => el.remove());
            }
            if (!isFeatureEnabledByKey(FEATURE_MESSAGES_PLACEHOLDER_ENABLED_KEY, true)) {
                document.querySelectorAll('.cc-improver-messages-guide').forEach(el => el.remove());
            }
            if (!isFeatureEnabledByKey(FEATURE_ANNOUNCEMENTS_DESCRIPTION_ENABLED_KEY, true)) {
                document.querySelectorAll('.cc-improver-announcements-desc').forEach(el => el.remove());
            }
            if (!isFeatureEnabledByKey(FEATURE_REFRESH_TWEAKS_ENABLED_KEY, true)) {
                document.querySelectorAll('.cc-improver-refresh-button').forEach(el => el.remove());
            }
            if (!isFeatureEnabledByKey(FEATURE_DETENTION_CELEBRATION_ENABLED_KEY, true)) {
                document.querySelectorAll('.cc-improver-detention-success').forEach(el => el.remove());
            }

            // Apply enabled features with error handling
            try {
                if (isFeatureEnabledByKey(FEATURE_REPORT_CONCERN_ENABLED_KEY, true)) {
                    injectReportConcernWarning();
                } else {
                    document.querySelectorAll('.cc-improver-concern-warning').forEach(el => el.remove());
                }
            } catch (error) {
                console.warn('Failed to apply report concern warning:', error);
            }

            try {
                if (isFeatureEnabledByKey(FEATURE_CONTACT_LINK_ENABLED_KEY, true)) {
                    injectContactLink();
                }
            } catch (error) {
                console.warn('Failed to inject contact link:', error);
            }

            try {
                if (isFeatureEnabledByKey(FEATURE_CODE_WARNING_ENABLED_KEY, true)) {
                    injectCodeWarning();
                }
            } catch (error) {
                console.warn('Failed to inject code warning:', error);
            }

            if (false) {
                try {
                    injectMessagesPlaceholderContent();
                } catch (error) {
                    console.warn('Failed to inject messages placeholder:', error);
                }
            }

            try {
                if (isFeatureEnabledByKey(FEATURE_ANNOUNCEMENTS_DESCRIPTION_ENABLED_KEY, true)) {
                    injectAnnouncementsDescription();
                }
            } catch (error) {
                console.warn('Failed to inject announcements description:', error);
            }

            try {
                if (isFeatureEnabledByKey(FEATURE_REFRESH_TWEAKS_ENABLED_KEY, true)) {
                    injectRefreshTweaksButton();
                }
            } catch (error) {
                console.warn('Failed to inject refresh tweaks button:', error);
            }

            try {
                if (isFeatureEnabledByKey(FEATURE_DETENTION_CELEBRATION_ENABLED_KEY, true)) {
                    injectDetentionCelebration();
                }
            } catch (error) {
                console.warn('Failed to inject detention celebration:', error);
            }

            // Mark tweaks as applied once menu is successfully injected
            if (menuInjected && !tweaksApplied) {
                tweaksApplied = true;
                console.log('ClassCharts Improver: All tweaks applied successfully');
            }

        } catch (error) {
            console.warn('Error during tweak application cycle:', error);
        }

        if (attempts >= maxAttempts) {
            clearInterval(interval);
            if (!tweaksApplied) {
                console.warn('ClassCharts Improver: Some tweaks may not have been applied due to timeout');
            }
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

// Show beta program card
showBetaCard();

// Setup James Auth listener for global message handling
setupJamesAuthListener();

setupKeyComboListener();
initObserver();
