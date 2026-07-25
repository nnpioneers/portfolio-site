import { Response } from 'express';
import { BaseResponse } from '../dto/response.dto';
import * as crypto from 'crypto';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  data: T | null,
  error: { code: string; message: string } | null = null
) => {
  const requestId = res.locals.requestId || crypto.randomUUID();
  
  const responsePayload: BaseResponse<T> = {
    success,
    data,
    error,
    requestId,
    timestamp: new Date().toISOString()
  };

  res.status(statusCode).json(responsePayload);
};

export const sendSuccess = <T>(res: Response, data: T, statusCode = 200) => {
  return sendResponse(res, statusCode, true, data, null);
};

export const sendError = (res: Response, code: string, message: string, statusCode = 400) => {
  return sendResponse(res, statusCode, false, null, { code, message });
};
