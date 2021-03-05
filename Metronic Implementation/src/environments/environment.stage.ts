import { NgxLoggerLevel } from "ngx-logger";
export const environment = {
  production: false,
  isMockEnabled: true, 
  name: 'stage',
  authTokenKey: '',
  logging: {
		level: NgxLoggerLevel.ERROR,
		serverLogLevel: NgxLoggerLevel.ERROR
	  }
};