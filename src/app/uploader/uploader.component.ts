import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  @ViewChild(DropzoneComponent) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;

  files:any = [];


  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    acceptedFiles: ""
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public matDialogData: any) {
      console.log('onUploadError:', matDialogData);

  }

  ngOnInit() {

  }


  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);

  }

  public addedFile($event){
    console.log($event);
    this.files.push({name: $event.name});
  }

  public uploadProgress($event){
    console.log($event);
  }

}
