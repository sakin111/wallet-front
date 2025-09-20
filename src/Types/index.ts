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

export type TRole = "ADMIN" | "AGENT" | "USER";

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


export type DepositStatus = "SUCCESS" | "PENDING" | "FAILED" | "completed" | "pending";

export interface Deposit {
  _id: string;
  amount: number;
  status: DepositStatus;
  type: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedDepositData {
  data: Deposit[];
  meta: Meta;
}

export interface RawPaginatedDepositResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: PaginatedDepositData;
}


export interface PaginatedResponse<T> {
  data: T[];
  meta: Meta;
}

export interface DepositQueryParams {
  page?: number;
  limit?: number;
}



export interface IData {
  _id: string
  from: string;
  to: string;
  amount: number;
  email?: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}





export type Status = "ACTIVE" | "BLOCKED" | "SUSPENDED" | "APPROVED";
export interface IAuth {
  provider: "Credential"
  providerId: string;
}

export interface User {
  _id: string,
  name: string,
  email: string,
  password?: string,
  phone?: string
  role?: TRole,
  status: Status,
  isVerified?: boolean
  auth?: IAuth[]
  commissionRate?: number;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface Transaction {
  _id: string;
  amount: number;
  type: "SEND" | "RECEIVE" | "DEPOSIT" | "WITHDRAW" | "CASH_IN" | "CASH_OUT";
  status: "PENDING" | "SUCCESS" | "FAILED";
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}


export interface IUserTransactionSummary {
  _id: string;
  name: string;
  email: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED";
  role: "USER" | "ADMIN" | "AGENT";
  transactionsByType: Record<string, number>;
  totalTransactions: number;
  totalVolume: number;
  lastTransactionType: string;
  createdAt: Date | string;
}

export interface TransactionResponse {
  data: IUserTransactionSummary[];
  meta: Meta;
}

export interface Commission {
  _id: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  name?: string;
  email?: string;
  commissionRate: number;
  totalCommission: number;
  createdAt: string;
}



export interface CommissionFilter extends Record<string, string> {
  searchTerm: string;
  page: string;
  limit: string;
  type: string;
  sort: string;
}


export interface CommissionResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Commission[];
}


export interface CashOutTransaction {
  _id: string;
  amount: number;
  status: 'pending' | 'completed' | 'reversed';
  type: string;
  from: {
    email: string
  };
  to: {
    email: string
  };
  createdAt: string;
  updatedAt?: string;

}

export interface CashOutResponse {
  data: CashOutTransaction[];
  meta: Meta;
}


export interface TransactionFilter {
  page: string,
  limit: string,
  searchTerm: string
  type: string,
  sort: string,
}
