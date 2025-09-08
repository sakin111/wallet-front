import type { ComponentType } from "react";


export type ILogin = {
    email: string,
    password: string
}


export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
    global?: boolean; 
  }[];
}

export type TRole =  "ADMIN" | "AGENT" | "USER" ;

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}


export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: UserProfile;
}