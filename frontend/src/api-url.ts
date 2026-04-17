export const AUTH = {
  LOGIN: "http://localhost:4000/api/v1/auth/login",
  REGISTER: "http://localhost:4000/api/v1/auth/register",
  GET_USER_BY_ID: (id: string) =>
    `http://localhost:4000/api/v1/auth/user/${id}`,
} as const;

export const EVENT = {
  EVENT: "http://localhost:4000/api/v1/event/",
  EVENT_BY_ID: (id: string) => `http://localhost:4000/api/v1/event/${id}`,
};
