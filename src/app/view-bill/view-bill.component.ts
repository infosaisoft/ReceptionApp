import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSidenav, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { GetBillData } from './get-bill.model';
import { GetBillService } from './get-bill.service';
import { BillService } from '../services/bill.service';




@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css'],
  providers: [GetBillService]
})
export class ViewBillComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  hid: string = "hid1";
  results: any = [];
  dataSource = new MatTableDataSource(this.results);

  constructor(private billService: BillService, public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.getBills({});
  }

  applyFilter(filterValue: string) {
    this.getBills({ id: filterValue.trim() });
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getBills(criteria: any) {
    this.billService.getBills(criteria)
      .subscribe(data => {
        let res: any = data;
        this.results = res.response;
      }, error => {
        this.snackbar.open('Unable to fetch Bills', '', {
          duration: 4000
        });
      });
  }


  close(reason: string) {
    this.sidenav.close();
  }

}
