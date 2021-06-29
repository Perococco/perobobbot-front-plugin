import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import type {
    CreateUserParameters,
    Extension,
    UpdateUserParameters,
} from './data-com'
import type { Bot } from './perobobbot-lang'
import type {
    CreateBotParameters,
    OAuthProcessParameter,
    RestUserToken,
} from './rest-com'
import type { Credential, JwtInfo, SimpleUser } from './security-com'

export class BotController {
    baseURL: URL

    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL
    }

    public createBot(parameters: CreateBotParameters): Promise<Bot> {
        const url = new URL('/api/bots', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(parameters),
        }
        return axios(config).then((res) => res.data)
    }

    public deleteBot(id: string): Promise<AxiosResponse> {
        const url = new URL('/api/bots/' + id + '', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'delete',
            url: url.toString(),
        }
        return axios(config)
    }

    public listBots(): Promise<Bot[]> {
        const url = new URL('/api/bots', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString(),
        }
        return axios(config).then((res) => res.data)
    }
}

export class ClientController {
    baseURL: URL

    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL
    }

    public createClient(parameter: any): Promise<any> {
        const url = new URL('/api/clients', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'put',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(parameter),
        }
        return axios(config).then((res) => res.data)
    }

    public listClients(): Promise<any[]> {
        const url = new URL('/api/clients', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString(),
        }
        return axios(config).then((res) => res.data)
    }
}

export class ExtensionController {
    baseURL: URL

    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL
    }

    public listExtensions(): Promise<Extension[]> {
        const url = new URL('/api/extensions', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString(),
        }
        return axios(config).then((res) => res.data)
    }
}

export class I18nController {
    baseURL: URL

    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL
    }

    public getAvailableLanguageTags(): Promise<string[]> {
        const url = new URL('/api/dictionaries', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString(),
        }
        return axios(config).then((res) => res.data)
    }

    public getDictionary(
        languageTag: string
    ): Promise<{ [key: string]: string }> {
        const url = new URL(
            '/api/dictionaries/' + languageTag + '',
            this.baseURL
        )

        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString(),
        }
        return axios(config).then((res) => res.data)
    }
}

export class PluginController {
    baseURL: URL

    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL
    }

    public getPluginTemplate(
        groupId: string,
        artifactId: string
    ): Promise<AxiosResponse> {
        const url = new URL(
            '/api/plugin/' + groupId + ':' + artifactId + '',
            this.baseURL
        )

        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString(),
        }
        return axios(config)
    }
}

export class SecurityController {
    baseURL: URL

    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL
    }

    public getCurrentUser(): Promise<SimpleUser> {
        const url = new URL('/api/user', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString(),
        }
        return axios(config).then((res) => res.data)
    }

    public signIn(credential: Credential): Promise<JwtInfo> {
        const url = new URL('/api/signin', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(credential),
        }
        return axios(config).then((res) => res.data)
    }

    public signUp(parameters: CreateUserParameters): Promise<SimpleUser> {
        const url = new URL('/api/signup', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(parameters),
        }
        return axios(config).then((res) => res.data)
    }
}

export class TokenController {
    baseURL: URL

    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL
    }

    public deleteUserToken(tokenId: string): Promise<AxiosResponse> {
        const url = new URL('/api/tokens/' + tokenId + '', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'delete',
            url: url.toString(),
        }
        return axios(config)
    }

    public getUserToken(): Promise<RestUserToken[]> {
        const url = new URL('/api/tokens', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString(),
        }
        return axios(config).then((res) => res.data)
    }

    public initiateOAuth(parameter: OAuthProcessParameter): Promise<string> {
        const url = new URL('/api/tokens/oauth', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(parameter),
        }
        return axios(config).then((res) => res.data)
    }
}

export class UserController {
    baseURL: URL

    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL
    }

    public createUser(parameters: CreateUserParameters): Promise<SimpleUser> {
        const url = new URL('/api/users', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(parameters),
        }
        return axios(config).then((res) => res.data)
    }

    public getUserByLogin(login: string): Promise<SimpleUser> {
        const url = new URL('/api/users/' + login + '', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString(),
        }
        return axios(config).then((res) => res.data)
    }

    public getUserTokens(login: string): Promise<RestUserToken[]> {
        const url = new URL('/api/users/' + login + '/tokens', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString(),
        }
        return axios(config).then((res) => res.data)
    }

    public listAllUsers(): Promise<SimpleUser[]> {
        const url = new URL('/api/users', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString(),
        }
        return axios(config).then((res) => res.data)
    }

    public sayHello(): Promise<string> {
        const url = new URL('/api/users/', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString(),
        }
        return axios(config).then((res) => res.data)
    }

    public updateUser(
        login: string,
        parameters: UpdateUserParameters
    ): Promise<SimpleUser> {
        const url = new URL('/api/users/' + login + '', this.baseURL)

        const config: AxiosRequestConfig = {
            method: 'patch',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(parameters),
        }
        return axios(config).then((res) => res.data)
    }
}

