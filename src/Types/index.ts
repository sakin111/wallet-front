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
    icon?: ComponentType;
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


export interface IData {
  _id:string
  from: string;
  to: string;
  amount: number;
  email?: string;
  type:string;
  status: string;
  createdAt: string;
  updatedAt: string;
}


export type Status = "ACTIVE" | "BLOCKED" | "SUSPENDED" | "APPROVED";
export interface IAuth {
    provider: "Credential"
    providerId: string;
}

export interface User{
    _id: string,
    name: string,
    email: string,
    password?: string,
    phone?: string 
    role?: TRole,
    status: Status,
    isVerified ? : boolean
    auth ?: IAuth[]
    commissionRate?: number;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface Transaction {
  _id: string;
  amount: number;
  type: "SEND" | "RECEIVE" | "DEPOSIT" | "WITHDRAW";
  status: "PENDING" | "SUCCESS" | "FAILED";
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}


export interface CommissionFilter {
  search?: string;
  page?: string;
  limit?: string;
  type?: string; 
}
