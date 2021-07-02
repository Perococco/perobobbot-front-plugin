
export interface CreateUserParameters {
  login: string;
  password: string;
}

export interface Extension {
  activated: boolean;
  name: string;
}

export interface UpdateUserParameters {
  language_tag: string | string | null;
}

