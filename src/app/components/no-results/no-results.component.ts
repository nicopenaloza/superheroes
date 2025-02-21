import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PATHS } from '../../app.routes';

@Component({
  selector: 'app-no-results',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './no-results.component.html',
  styleUrl: './no-results.component.scss'
})
export class NoResultsComponent {
  @Input() size: 'small' | 'large' = 'large';
  @Input() message: string = 'No hay superhéroes registrados.';
  @Input() showButton: boolean = true;

  readonly _router: Router = inject(Router);

  addSuperhero(): void {
    this._router.navigate([PATHS.SUPERHEROES, 'new']);
  }
}
