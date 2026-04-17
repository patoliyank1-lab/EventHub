import type { Response } from "express";
const ONE_HOUR = 60 * 60 * 1000;

/**
 * send formatted Response
 * @param req express Request
 * @param res express Response
 * @param data data which is send to be user.
 * @param status - optional - status code by default 200. 
 * @param accessToken - optional - access Token.
 * @param refreshToken - optional - refresh Token.
 */
export const formattedResponse = (
  res: Response,
  data: unknown,
  status: number = 200,
  accessToken?: string,
  refreshToken?: string,
) => {
  if (accessToken) {
    res.cookie("access-token", accessToken, {
      maxAge: ONE_HOUR,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  }
  if (refreshToken) {
    res.cookie("refresh-token", refreshToken, {
      maxAge: 24 * ONE_HOUR,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  }
  return res.status(status).json({
    success: true,
    status: status,
    data,
  });
};
