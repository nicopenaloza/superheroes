import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { AutocompleteSearchbarComponent } from '../../components/autocomplete-searchbar/autocomplete-searchbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ImageInputComponent } from '../../components/image-input/image-input.component';
import { NoResultsComponent } from '../../components/no-results/no-results.component';
import { ContentComponent } from '../../layouts/content/content.component';
import { AvatarPipe } from '../../pipes/avatar/avatar.pipe';
import { SuperheroDetailsDataComponent } from './superhero-details/superhero-details-data/superhero-details-data.component';
import { SuperheroDetailsHeaderComponent } from './superhero-details/superhero-details-header/superhero-details-header.component';
import { SuperheroDetailsComponent } from './superhero-details/superhero-details.component';
import { SuperheroesPageListComponent } from './superheroes-page-list/superheroes-page-list.component';
import { SuperheroesPageRoutingModule } from './superheroes-page-routing.module';
import { SuperheroesPageComponent } from './superheroes-page.component';


@NgModule({
  declarations: [
    SuperheroesPageComponent,
    SuperheroDetailsComponent,
    SuperheroesPageListComponent,
    SuperheroDetailsDataComponent,
    SuperheroDetailsHeaderComponent
  ],
  imports: [
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,

    AvatarPipe,
    ButtonComponent,
    HeaderComponent,
    ContentComponent,
    NoResultsComponent,
    ImageInputComponent,
    AutocompleteSearchbarComponent,

    SuperheroesPageRoutingModule,
  ]
})
export class SuperheroesPageModule { }
