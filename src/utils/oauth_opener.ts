import {PromiseHelper} from "@/utils/promiseHelper";

export function openOauthUrl_bck(url: string, callback: () => void) {
    const win = window.open(url)
    var interval = window.setInterval(function () {
        try {
            if (win == null || win.closed) {
                window.clearInterval(interval)
                callback()
            }
        } catch (e) {
            console.error(e)
        }
    }, 1000)
}

export function openOauthUrl(url: string): Promise<void> {
    const helper = new PromiseHelper<void>();

    const win = window.open(url)
    var interval = window.setInterval(function () {
        try {
            if (win == null || win.closed) {
                window.clearInterval(interval)
                helper.resolve()
            }
        } catch (e) {
            helper.reject(e)
        }
    }, 1000)

    return helper.promise
}

export function openOauthUrlWithParam<T>(url: string, param?:T): Promise<T> {
    const helper = new PromiseHelper<T>();

    const win = window.open(url)
    var interval = window.setInterval(function () {
        try {
            if (win == null || win.closed) {
                window.clearInterval(interval)
                helper.resolve(param)
            }
        } catch (e) {
            helper.reject(e)
        }
    }, 1000)

    return helper.promise
}

export function openOauthUrlWithParam2<T>(url: string, param?:T): Promise<T> {
    const helper = new PromiseHelper<T>();

    const win = window.open(url)
    var interval = window.setInterval(function () {
        try {
            if (win == null || win.closed) {
                window.clearInterval(interval)
                helper.resolve(param)
            }
        } catch (e) {
            helper.reject(e)
        }
    }, 1000)

    return helper.promise
}
