import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroDetailsHeaderComponent } from './superhero-details-header.component';
import { ActivatedRoute } from '@angular/router';
import { SuperheroesPageComponent } from '../../superheroes-page.component';
import { MatIconModule } from '@angular/material/icon';

describe('SuperheroDetailsHeaderComponent', () => {
  let component: SuperheroDetailsHeaderComponent;
  let fixture: ComponentFixture<SuperheroDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperheroDetailsHeaderComponent],
      imports: [MatIconModule],
      providers: [
        { provide: SuperheroesPageComponent },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuperheroDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
