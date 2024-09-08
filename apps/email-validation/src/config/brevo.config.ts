import { ZodSchema, z } from 'zod';
import { env } from '../env';

export interface BrevoConfig {
  apiKey: string;
  mainListId: number;
  sender: {
    name: string;
    email: string;
  };
  templates: {
    [key: string]: {
      id: number;
      paramsSchema: ZodSchema<any>;
    };
  };
}

export const brevoConfig: BrevoConfig = {
  apiKey: env.brevoApiKey,
  mainListId: 1,
  sender: {
    name: 'Collect&Verything',
    email: 'ce@gmail.com'
  },
  templates: {
    'email-validation': {
      id: 1,
      paramsSchema: z.object({
        CALLBACK_URL: z.string()
      })
    },

  }
};



