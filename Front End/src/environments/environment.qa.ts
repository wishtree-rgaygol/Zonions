import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
    production: false,
    name: 'qa',
    logging: {
      level: NgxLoggerLevel.ERROR,
      serverLogLevel: NgxLoggerLevel.ERROR
    }
  };