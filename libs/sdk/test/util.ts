import { HttpService } from '@nestjs/axios';
import { OgmaService } from '@ogma/nestjs-module';

export const MOCK_LOGGER_SERVICE = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
} as unknown as OgmaService;

export const MOCK_HTTP_SERVICE = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  request: jest.fn(),
  head: jest.fn(),
  patch: jest.fn(),
  options: jest.fn(),
} as unknown as HttpService;
