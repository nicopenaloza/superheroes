import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { AutocompleteSearchbarComponent } from '../../components/autocomplete-searchbar/autocomplete-searchbar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NoResultsComponent } from '../../components/no-results/no-results.component';
import { ContentComponent } from '../../layouts/content/content.component';
import { SuperheroesPageListComponent } from './superheroes-page-list/superheroes-page-list.component';
import { SuperheroesPageComponent } from './superheroes-page.component';

describe('SuperheroesPageComponent', () => {
  let component: SuperheroesPageComponent;
  let fixture: ComponentFixture<SuperheroesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperheroesPageComponent, SuperheroesPageListComponent],
      imports: [
        RouterOutlet,
        HeaderComponent,
        MatSidenavModule,
        ContentComponent,
        NoResultsComponent,
        MatPaginatorModule,
        NoopAnimationsModule,
        AutocompleteSearchbarComponent,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuperheroesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
