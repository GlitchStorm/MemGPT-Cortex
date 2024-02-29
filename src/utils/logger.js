import { createLogger, config, format as _format, transports as _transports } from 'winston';
import path from 'path';
import 'winston-daily-rotate-file';
import os from 'os';
import fs from 'fs';

const logDir = path.join(os.homedir(), 'AppData', 'Local', 'MemGPTBroker', 'Logs');

// Ensure the logs directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Create a logger instance with custom settings
const logger = createLogger({
  // Define the levels of logs and their corresponding colors
  levels: config.npm.levels,
  format: _format.combine(
    _format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    _format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: [
    // Console transport for logging to the console
    new _transports.Console({
      level: 'debug', // Log only if info.level is less than or equal to this level
      format: _format.combine(
        _format.colorize(), // Colorize log levels
        _format.printf(
          info => `${info.timestamp} [${info.level}]: ${info.message}`
        )
      )
    }),
    // File transport for logging to a file
    new _transports.DailyRotateFile({
      filename: path.join(logDir, 'memgptbroker-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'info', // Log only if info.level is less than or equal to this level
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export default logger;