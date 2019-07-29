/*eslint-disable */


export function isDevMode() {
    return !('update_url' in chrome.runtime.getManifest());
}