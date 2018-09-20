import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  close(reason: string) {
    this.sidenav.close();
  }

}
