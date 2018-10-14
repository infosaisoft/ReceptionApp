import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.less']
})
export class ConfirmDialogComponent implements OnInit {

  title: string = "Please confirm your action.";
  confirmMsg: string = "Are you sure you want to perform this action?";
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {

    console.log(dialogData);
    if (dialogData.hasOwnProperty("title"))
      this.title = dialogData.title;

    if (dialogData.hasOwnProperty("confirmMsg"))
      this.confirmMsg = dialogData.confirmMsg;


  }

  ngOnInit() {
  }

}
