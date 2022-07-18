export function setCookie(cookieName: string, cookieValue: string) {
    window.localStorage.setItem(cookieName, JSON.stringify(cookieValue));
}
export function getCookie(cookieName: string) {
    const result = JSON.parse(window.localStorage.getItem(cookieName) || "{}");
    console.log(result)
    return result;
}
export function deleteCookie(cookieName: string) {
    window.localStorage.removeItem(cookieName);
    return true;
}