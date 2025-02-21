import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroesPageComponent } from './superheroes-page.component';
import { SuperheroDetailsComponent } from './superhero-details/superhero-details.component';

const routes: Routes = [
  {
    path: '',
    component: SuperheroesPageComponent,
    children: [
      { path: ':id', component: SuperheroDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperheroesPageRoutingModule { }
