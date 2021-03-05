import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogConfig {
  title?: string,
  content?: string,
  ok?: string,
  close: string
}
@Component({
  selector: 'kt-alert-confirm-box',
  templateUrl: './alert-confirm-box.component.html',
  styleUrls: ['./alert-confirm-box.component.scss']
})
export class AlertConfirmBoxComponent{

 /*  message: string = ""
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertConfirmBoxComponent>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('300vw','300vw')
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  } */
  get dialog(): DialogConfig {
      return this.data;
  }

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: DialogConfig,
      public dialogRef: MatDialogRef<AlertConfirmBoxComponent>
  ) {}
}
