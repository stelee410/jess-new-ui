"use client"

import Cookies from 'js-cookie';

export function clearAllCookies() {
    const cookies = Cookies.get();
    Object.keys(cookies).forEach(cookieName => {
      Cookies.remove(cookieName, { path: '/' });
    });
}

export function getCookie(name: string) {
    return Cookies.get(name);
}

export function setCookie(name: string, value: string, options: any) {
    Cookies.set(name, value, options);
}

export function removeCookie(name: string) {
    Cookies.remove(name, { path: '/' });
}
