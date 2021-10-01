export function prepare_url(path: string, baseUrl: URL = new URL(window.document.URL)): string {
    const pathname = baseUrl.pathname;
    const idx = pathname.indexOf("/front");
    if (idx <= 0) {
        return path;
    }
    return pathname.slice(0, idx) + path;
}