import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteSearchbarComponent } from '../../../components/autocomplete-searchbar/autocomplete-searchbar.component';
import { NoResultsComponent } from '../../../components/no-results/no-results.component';
import { SuperheroesPageListComponent } from './superheroes-page-list.component';

describe('SuperheroesPageListComponent', () => {
  let component: SuperheroesPageListComponent;
  let fixture: ComponentFixture<SuperheroesPageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperheroesPageListComponent],
      imports: [
        MatPaginatorModule,
        AutocompleteSearchbarComponent,
        NoResultsComponent,
        NoopAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuperheroesPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
