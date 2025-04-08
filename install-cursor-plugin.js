#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

// Получаем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Читаем mcp-plugin.json
const pluginConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'mcp-plugin.json'), 'utf8'));

// Путь к директории плагинов Cursor
const cursorPluginsDir = path.join(os.homedir(), '.cursor', 'plugins');

// Создаем директорию, если она не существует
if (!fs.existsSync(cursorPluginsDir)) {
  fs.mkdirSync(cursorPluginsDir, { recursive: true });
}

// Имя плагина и путь к плагину
const pluginName = 'keitaro-tds-api';
const pluginDir = path.join(cursorPluginsDir, pluginName);

// Создаем директорию плагина, если она не существует
if (!fs.existsSync(pluginDir)) {
  fs.mkdirSync(pluginDir, { recursive: true });
}

// Копируем mcp-plugin.json в директорию плагина
fs.copyFileSync(
  path.join(__dirname, 'mcp-plugin.json'),
  path.join(pluginDir, 'mcp-plugin.json')
);

console.log(`Плагин Keitaro TDS API успешно установлен в Cursor!`);
console.log(`Путь к плагину: ${pluginDir}`);
console.log(`Чтобы использовать плагин, перезапустите Cursor и найдите его в палитре команд (Cmd+P).`); 