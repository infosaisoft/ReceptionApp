import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppUtility } from '../app.utility';

@Component({
  selector: 'app-slot-dialog',
  templateUrl: './slot-dialog.component.html',
  styleUrls: ['./slot-dialog.component.css']
})
export class SlotDialogComponent implements OnInit {
  slots : any;
  selectedSlot : any;
  constructor(private utility: AppUtility,
    public dialogRef : MatDialogRef<SlotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any) {
      console.log(data);
      this.slots = data.slots;
     }

    

  ngOnInit() {
  }

formatDate(date){
  return  this.utility.formatDate(date);
}

onChangeslot(selectedSlot){
  this.selectedSlot = selectedSlot;
  console.log(this.selectedSlot);
}

setSlot(){
  this.dialogRef.close(this.selectedSlot);
}

}
