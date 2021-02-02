import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
    production: false,
    name: 'dev',
    logging: {
      level: NgxLoggerLevel.ERROR,
      serverLogLevel: NgxLoggerLevel.ERROR
    }
  };