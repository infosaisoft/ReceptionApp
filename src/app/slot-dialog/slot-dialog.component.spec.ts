import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotDialogComponent } from './slot-dialog.component';

describe('SlotDialogComponent', () => {
  let component: SlotDialogComponent;
  let fixture: ComponentFixture<SlotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
