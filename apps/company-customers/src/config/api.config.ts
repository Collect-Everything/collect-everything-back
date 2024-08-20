import { ApiConfig } from '@ce/shared-core';
import { env } from '../env';
import { SERVICES_CONFIG } from '@ce/server-core';

export const apiConfig = {
  baseUrl: `http://localhost:${env.port}/`,
  apiPath: SERVICES_CONFIG.COMPANY_CUSTOMERS.basePath || '/'
} satisfies ApiConfig;

export const STATIC_PATH = '/static';

export const __PROD__ = env.nodeEnv === 'production';
export const __DEV__ = env.nodeEnv === 'development';
