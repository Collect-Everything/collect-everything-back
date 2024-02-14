export type FileUploadSource = "local" | "aws-s3";
export type UploadBaseConfig = {
  source: FileUploadSource;
  sizeLimit?: number;
};

export type LocalUploadConfig = UploadBaseConfig & {
  source: "local";
  destination: string;
  staticUrl: string;
};

export type AwsS3UploadConfig = UploadBaseConfig & {
  source: "aws-s3";
};

export type UploadConfig = LocalUploadConfig | AwsS3UploadConfig;

export type AppConfig = {
  [key: string]: any;
  name: string;
  logo: string;
  defaultLanguage?: string;
  apiUrl: string;
  languages?: {
    [key: string]: {
      urlSegment: string;
    };
  };
  staticUrl?: string;
};

export type ApiConfig = {
  baseUrl: string;
  apiPath: string;
  uploads?: UploadConfig;
  jwt?: {
    secret: string;
    expiresIn: string;
  };
  brevo?: {
    apiKey: string;
    mainListId: number;
    templates: { [key: string]: { [key: string]: number } };
  };
};

export interface S3Config {
  bucket: string;
}
