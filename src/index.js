#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { server } from './server.js';
import { config } from './config.js';

console.log('Starting Keitaro TDS API MCP server...');

if (!config.isConfigured()) {
  console.warn('⚠️ Keitaro API is not configured. Please set KEITARO_API_URL and KEITARO_API_KEY in .env file.');
}

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
