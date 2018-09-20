import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSidenav, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { GetBillData } from './get-bill.model';
import { GetBillService } from './get-bill.service';




@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css'],
  providers: [GetBillService]
})
export class ViewBillComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
 
  hid:string = "hid1";
  results: GetBillData[];
  dataSource = new MatTableDataSource(this.results);

  constructor( private viewBillService: GetBillService , public snackbar: MatSnackBar) { }

  ngOnInit() {
      this.getBills(this.hid);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getBills(hid){
    this.viewBillService.getBills(this.hid)
      .subscribe( data=>{
          this.results=data;
      }, error=>{
        this.snackbar.open('Unable to fetch Bills', '', {
          duration: 4000
        });
      });
  }


  close(reason: string) {
    this.sidenav.close();
  }

}
