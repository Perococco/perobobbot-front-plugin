import type {AxiosRequestConfig, AxiosResponse} from 'axios';
import type {
    BotExtension,
    CreateClientParameter,
    CreateUserParameters,
    Extension,
    UpdateBotExtensionParameters,
    UpdateExtensionParameters,
    UpdateUserParameters
} from './data-com';
import type {Bot, Platform, SafeClient} from './perobobbot-lang';
import type {CreateBotParameters, RestUserToken} from './rest-com';
import type {ChangePasswordParameters, Credential, JwtInfo, OAuthInfo, SimpleUser} from './security-com';

export class AuthUserController {
    baseURL: URL;


    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL;
    }

    public getCurrentUser(): Promise<SimpleUser> {
        const preparedUrl = prepare_url('/api/user', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

    public getExtensions(): Promise<BotExtension[]> {
        const preparedUrl = prepare_url('/api/user/extensions', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

}

export class BotController {
    baseURL: URL;


    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL;
    }

    public createBot(parameters: CreateBotParameters): Promise<Bot> {
        const preparedUrl = prepare_url('/api/bots', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(parameters)
        };
        return axios(config).then(res => res.data);
    }

    public deleteBot(id: string): Promise<AxiosResponse> {
        const preparedUrl = prepare_url('/api/bots/' + id + '', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'delete',
            url: url.toString()
        };
        return axios(config);
    }

    public listBots(): Promise<Bot[]> {
        const preparedUrl = prepare_url('/api/bots', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

    public listExtensions(id: string): Promise<BotExtension[]> {
        const preparedUrl = prepare_url('/api/bots/' + id + '/extensions', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

    public listUserBots(login: string): Promise<Bot[]> {
        const preparedUrl = prepare_url('/api/bots/' + login + '', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

}

export class BotExtensionController {
    baseURL: URL;


    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL;
    }

    public updateExtension(botId: string, extensionId: string, parameters: UpdateBotExtensionParameters): Promise<BotExtension> {
        const preparedUrl = prepare_url('/api/bot-extensions/' + botId + '/' + extensionId + '', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'put',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(parameters)
        };
        return axios(config).then(res => res.data);
    }

}

export class ClientController {
    baseURL: URL;


    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL;
    }

    public createClient(parameter: CreateClientParameter): Promise<SafeClient> {
        const preparedUrl = prepare_url('/api/clients', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'put',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(parameter)
        };
        return axios(config).then(res => res.data);
    }

    public listClients(): Promise<{ [key: string]: SafeClient }> {
        const preparedUrl = prepare_url('/api/clients', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

}

export class ExtensionController {
    baseURL: URL;


    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL;
    }

    public listExtensions(): Promise<Extension[]> {
        const preparedUrl = prepare_url('/api/extensions', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

    public updateExtension(extensionId: string, parameters: UpdateExtensionParameters): Promise<Extension> {
        const preparedUrl = prepare_url('/api/extensions/' + extensionId + '', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'put',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(parameters)
        };
        return axios(config).then(res => res.data);
    }

}

export class I18nController {
    baseURL: URL;


    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL;
    }

    public getAvailableLanguageTags(): Promise<string[]> {
        const preparedUrl = prepare_url('/api/dictionaries', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

    public getDictionary(languageTag: string): Promise<{ [key: string]: string }> {
        const preparedUrl = prepare_url('/api/dictionaries/' + languageTag + '', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

}

export class PluginController {
    baseURL: URL;


    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL;
    }

    public getPluginTemplate(type: string, groupId: string, artifactId: string): Promise<AxiosResponse> {
        const preparedUrl = prepare_url('/api/plugin/' + type + ':' + groupId + ':' + artifactId + '', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config);
    }

}

export class SecurityController {
    baseURL: URL;


    public changePassword(parameters: ChangePasswordParameters): Promise<AxiosResponse> {
        const preparedUrl = prepare_url('/api/password_change', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(parameters)
        };
        return axios(config);
    }

    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL;
    }

    public getOpenIdUser(id: string): Promise<JwtInfo> {
        const preparedUrl = prepare_url('/api/oauth/openId', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(id)
        };
        return axios(config).then(res => res.data);
    }

    public oauthWith(openIdPlatform: Platform): Promise<OAuthInfo> {
        const preparedUrl = prepare_url('/api/oauth', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(openIdPlatform)
        };
        return axios(config).then(res => res.data);
    }

    public signIn(credential: Credential): Promise<JwtInfo> {
        const preparedUrl = prepare_url('/api/signin', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(credential)
        };
        return axios(config).then(res => res.data);
    }

    public signUp(parameters: CreateUserParameters): Promise<SimpleUser> {
        const preparedUrl = prepare_url('/api/signup', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(parameters)
        };
        return axios(config).then(res => res.data);
    }

}

export class TokenController {
    baseURL: URL;


    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL;
    }

    public deleteUserToken(tokenId: string): Promise<AxiosResponse> {
        const preparedUrl = prepare_url('/api/tokens/' + tokenId + '', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'delete',
            url: url.toString()
        };
        return axios(config);
    }

    public getUserToken(): Promise<RestUserToken[]> {
        const preparedUrl = prepare_url('/api/tokens', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

    public initiateOAuth(platform: Platform): Promise<string> {
        const preparedUrl = prepare_url('/api/tokens/oauth', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(platform)
        };
        return axios(config).then(res => res.data);
    }

    public refreshUserToken(tokenId: string): Promise<RestUserToken> {
        const preparedUrl = prepare_url('/api/tokens/' + tokenId + '', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'put',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

}

export class UserController {
    baseURL: URL;


    public constructor(baseURL: URL = new URL(window.document.URL)) {
        this.baseURL = baseURL;
    }

    public createUser(parameters: CreateUserParameters): Promise<SimpleUser> {
        const preparedUrl = prepare_url('/api/users', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'post',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(parameters)
        };
        return axios(config).then(res => res.data);
    }

    public getUserByLogin(login: string): Promise<SimpleUser> {
        const preparedUrl = prepare_url('/api/users/' + login + '', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

    public getUserTokens(login: string): Promise<RestUserToken[]> {
        const preparedUrl = prepare_url('/api/users/' + login + '/tokens', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

    public listAllUsers(): Promise<SimpleUser[]> {
        const preparedUrl = prepare_url('/api/users', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'get',
            url: url.toString()
        };
        return axios(config).then(res => res.data);
    }

    public updateUser(login: string, parameters: UpdateUserParameters): Promise<SimpleUser> {
        const preparedUrl = prepare_url('/api/users/' + login + '', this.baseURL);
        const url = new URL(preparedUrl, this.baseURL);


        const config: AxiosRequestConfig = {
            method: 'patch',
            url: url.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(parameters)
        };
        return axios(config).then(res => res.data);
    }

}

