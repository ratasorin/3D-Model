import { ManagedUpload } from 'aws-sdk/clients/s3';

export interface UploadInfo {
  data: ManagedUpload.SendData;
  mimetype: string;
}

export interface SuccessResponse<T> {
  error: false;
  payload: T | null;
}

export interface ErrorResponse {
  error: true;
  payload: string;
}

export type ServerResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface Image {
  src: string;
  filename: string;
}

export interface ChurchInfo {
  editedBy: string | null;
  churchDescription: string;
  churchName: string;
}
