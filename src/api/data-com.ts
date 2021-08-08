
export interface CreateUserParameters {
  identification: any;
  login: string;
}

export interface Extension {
  activated: boolean;
  name: string;
}

export enum PromotionManager {
INSTANCE = 'INSTANCE'
}

export interface UpdateUserParameters {
  language_tag: string | string | null;
}

