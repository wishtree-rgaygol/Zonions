import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { PushNotificationService } from '../services/pushNotification.service';

@Component({
  selector: 'kt-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent{
  private title: string = 'Browser Push Notifications!';

  constructor(private _notificationService: PushNotificationService) {
      this._notificationService.requestPermission();
  }

  ngOnInit() {}

  notify() {
      let data: Array < any >= [];
      data.push({
          'title': 'Successfully Subscribe',
          'alertContent': 'we will send our updated content on your mail.'
      });
      data.push({
          'title': 'Message',
          'alertContent': 'Alert- Please verify your mail'
      });
      data.push({
          'title': 'Request',
          'alertContent': 'Share our content to your friends'
      });
      data.push({
          'title': 'Thanks',
          'alertContent': 'Thanks to visit us..Visit again..!'
      });
      /*data.push({
          'title': 'To Do Task',
          'alertContent': 'This is Fifth Alert'
      });*/

      this._notificationService.generateNotification(data);
  }
}
