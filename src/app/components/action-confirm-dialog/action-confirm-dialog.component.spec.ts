import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionConfirmDialog } from './action-confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ActionConfirmDialog', () => {
  let component: ActionConfirmDialog;
  let fixture: ComponentFixture<ActionConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionConfirmDialog],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActionConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
