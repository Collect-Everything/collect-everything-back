import 'dotenv/config';
import './env';
import { createGatewayApp } from '@ce/server-core';
import { createApiRouter } from './lib/router';
import { STATIC_PATH, UPLOAD_PATH, apiConfig } from './config/api.config';
import express from 'express';

const app = createGatewayApp('SHOWCASE_GATEWAY', createApiRouter, apiConfig);

app.use(STATIC_PATH, express.static(UPLOAD_PATH));

app.start();
