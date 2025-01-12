export enum UserStatus {
  ALLOWED = "allowed",
  BLOCKED = "blocked",
  PENDING = "pending",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum USER_ROLE {
  ADMIN = "admin",
  MODERATOR = "moderator",
  NORMAL_USER = "normalUser",
}

export interface IName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IPagination {
  page: number;
  limit: number;
  totalCount?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  nextPageLink?: string;
  prevPageLink?: string;
}

export type Email = string & { _brand: "email" };
