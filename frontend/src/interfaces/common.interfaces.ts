import { Dispatch, SetStateAction } from "react";
import { SxProps } from "@mui/system";

export type TGlobalContext = TContext<IGlobalContext>;

export interface IUser {
    email: string;
}

export interface IGlobalContext {
    user: IUser | null;
    isLoading: boolean;
}

export type TDispatch<T = any> = Dispatch<SetStateAction<T>>;

export type TContext<T = any> = [ T, TDispatch<T> ];

export type SxStylesMap = {
    [key: string]: SxProps;
}

export type TComponentStyles = (...args: any[]) => SxStylesMap;

export type TObjectProperties<T = any> = {
    [key:string | number | symbol]: T
}