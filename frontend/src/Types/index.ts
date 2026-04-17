export interface StoreUser {
  _id: string;
  name: string;
  email: string;
}

export interface ResponseType {
  success: boolean;
  status: number;
  data?: unknown;
  message?: string;
}

export interface CreatedBy {
  _id: string;
  name: string;
  email: string;
}

export interface EventType {
  _id:string;
  name:string;
  eventTime:string;
  createdBy: CreatedBy;
  location: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
