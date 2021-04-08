import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'kt-delete-confirm-box',
  templateUrl: './delete-confirm-box.component.html',
  styleUrls: ['./delete-confirm-box.component.scss']
})
export class DeleteConfirmBoxComponent implements OnInit {

  title: string;
  message: string;
  constructor(public dialogRef: MatDialogRef<DeleteConfirmBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
}
