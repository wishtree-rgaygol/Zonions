import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
	production: true,
	isMockEnabled: true, // You have to switch this, when your real back-end is done
	authTokenKey: '',
	logging: {
		level: NgxLoggerLevel.ERROR,
		serverLogLevel: NgxLoggerLevel.ERROR
	  }
};
