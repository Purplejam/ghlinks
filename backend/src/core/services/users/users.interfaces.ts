export interface ILoginParams {
    email: string;
    password: string;
}

export interface IRegisterParams {
    email: string;
    password: string; 
}

export interface IFindParams {
    email: string;
}

export interface IUserEntity {
    email: string;
    password: string; 
}