import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
    production: false,
    name: 'test',
    logging: {
      level: NgxLoggerLevel.ERROR,
      serverLogLevel: NgxLoggerLevel.ERROR
    }
  };