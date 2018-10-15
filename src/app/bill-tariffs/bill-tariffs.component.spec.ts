import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTariffsComponent } from './bill-tariffs.component';

describe('BillTariffsComponent', () => {
  let component: BillTariffsComponent;
  let fixture: ComponentFixture<BillTariffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillTariffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillTariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
