import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroesPageListComponent } from './superheroes-page-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AutocompleteSearchbarComponent } from '../../../components/autocomplete-searchbar/autocomplete-searchbar.component';
import { NoResultsComponent } from '../../../components/no-results/no-results.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

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
