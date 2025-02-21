import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { IActionConfirmDialogData } from '../../interfaces/action-confirm-dialog.interface';

@Component({
  selector: 'app-action-confirm-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogClose,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './action-confirm-dialog.component.html',
  styleUrl: './action-confirm-dialog.component.scss'
})
export class ActionConfirmDialog {
  readonly dialogRef = inject(MatDialogRef<ActionConfirmDialog>);
  readonly data = inject<IActionConfirmDialogData>(MAT_DIALOG_DATA);

  loading: WritableSignal<boolean> = signal(false);

  confirm(): void {
    if (this.data?.onConfirm) {
      this.loading.set(true);
      const obs$ = this.data.onConfirm();

      if (obs$ instanceof Observable) {
        obs$.subscribe({
          next: () => {
            this.loading.set(false);
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.loading.set(false);
          }
        });
      } else {
        this.loading.set(false);
        this.dialogRef.close(false);
      }
      
    } else {
      this.dialogRef.close(true);
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
