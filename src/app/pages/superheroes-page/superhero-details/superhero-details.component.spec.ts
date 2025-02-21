import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroDetailsComponent } from './superhero-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SuperheroesPageComponent } from '../superheroes-page.component';
import { ContentComponent } from '../../../layouts/content/content.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SuperheroDetailsHeaderComponent } from './superhero-details-header/superhero-details-header.component';
import { SuperheroDetailsDataComponent } from './superhero-details-data/superhero-details-data.component';

class SuperheroesPageComponentStub {
  matDrawer = {
    open: jasmine.createSpy('open'),
    close: jasmine.createSpy('close')
  };
  detailsOpened = false;
}

describe('SuperheroDetailsComponent', () => {
  let component: SuperheroDetailsComponent;
  let fixture: ComponentFixture<SuperheroDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SuperheroDetailsComponent,
        SuperheroDetailsHeaderComponent,
        SuperheroDetailsDataComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'new' }) } },
        { provide: SuperheroesPageComponent, useClass: SuperheroesPageComponentStub },
        { provide: MatDialogRef, useValue: {} }
      ],
      imports: [
        MatIconModule,
        ContentComponent
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(SuperheroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
