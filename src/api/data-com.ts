
export interface CreateUserParameters {
  login: string;
  password: string;
}

export interface Extension {
  activated: boolean;
  name: string;
}

export interface UpdateUserParameters {
  languageTag: string | string | null;
}

