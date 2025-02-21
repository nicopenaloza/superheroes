import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SuperheroesPageComponent } from '../../superheroes-page.component';
import { MatDialog } from '@angular/material/dialog';
import { ActionConfirmDialog } from '../../../../components/action-confirm-dialog/action-confirm-dialog.component';

@Component({
  selector: 'app-superhero-details-header',
  templateUrl: './superhero-details-header.component.html',
  styleUrl: './superhero-details-header.component.scss'
})
export class SuperheroDetailsHeaderComponent {
  @Input() isEditing!: boolean;
  @Input() isNewHero!: boolean;
  @Input() loading!: boolean;
  @Input() isFormDirty!: boolean;
  @Input() isFormValid!: boolean;
  @Input() showActions!: boolean;
  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() resetForm: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _router: Router,
    private _matDialog: MatDialog,
    private _superHeroPage: SuperheroesPageComponent
  ) { }

  close(): void {
    this._router.navigate(['/superheroes']);
    this._superHeroPage.onDetailsClose();
  }

  cancel(): void {
    if (this.isFormDirty) {
      const dialogRef = this._matDialog.open(ActionConfirmDialog, {
        data: {
          title: '¡Cuidado!',
          message: '¿Estás seguro de que deseas cancelar? Se perderán los datos no guardados.',
          confirmText: 'Continuar de todas formas',
          cancelText: 'Volver',
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.resetForm.emit()
        }
      });

    } else {
      this.resetForm.emit()
    }
  }

}
