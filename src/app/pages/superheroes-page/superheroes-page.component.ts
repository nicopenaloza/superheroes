import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PATHS } from '../../app.routes';
import { ISuperhero } from '../../interfaces/superheroes.interface';

@Component({
  selector: 'app-superheroes-page',
  templateUrl: './superheroes-page.component.html',
  styleUrls: ['./superheroes-page.component.scss']
})
export class SuperheroesPageComponent {
  @ViewChild('matDrawer', { static: true }) matDrawer!: MatDrawer;

  superHeroes$!: Observable<ISuperhero[]>;
  detailsOpened: boolean = false;

  constructor(
    private _router: Router,
  ) { }

  onDetailsClose(): void {
    this.detailsOpened = false;
    setTimeout(() => {
      this.matDrawer.close();
    });
  }

  openDetails(id: number | string = 'new'): void {
    this.detailsOpened = true;
    this._router.navigate([PATHS.SUPERHEROES, id]);
    setTimeout(() => {
      this.matDrawer.open();
    });
  }
}