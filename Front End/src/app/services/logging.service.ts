export class LoggingService{
  logStatus(message: any): void{
      const currentDateTime = new Date();
      const currentDateTimeString = currentDateTime.toDateString + ' ' + currentDateTime.getHours() +
      currentDateTime.getMinutes() + currentDateTime.getSeconds();
      console.log(`${currentDateTimeString} : `, message );
  }
}
