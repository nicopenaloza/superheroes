import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AvatarPipe } from '../../../../pipes/avatar/avatar.pipe';
import { SuperheroDetailsDataComponent } from './superhero-details-data.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SuperheroDetailsDataComponent', () => {
  let component: SuperheroDetailsDataComponent;
  let fixture: ComponentFixture<SuperheroDetailsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperheroDetailsDataComponent],
      imports: [
        ReactiveFormsModule,
        AvatarPipe,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperheroDetailsDataComponent);
    component = fixture.componentInstance;

    component.superHeroForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(''),
      power: new FormControl(''),
      photo: new FormControl('')
    });
    component.isEditing = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
