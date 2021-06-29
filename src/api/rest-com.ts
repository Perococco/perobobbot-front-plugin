import type { Platform } from './perobobbot-lang'

export interface CreateBotParameters {
    name: string
}

export interface OAuthProcessParameter {
    platform: Platform
    scopes: string[]
}

export interface RestUserToken {
    expirationInstant: any
    id: string
    ownerLogin: string
    viewerIdentity: any
}
