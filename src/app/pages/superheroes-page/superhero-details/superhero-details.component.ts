import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { PATHS } from '../../../app.routes';
import { SuperHeroesService } from '../../../services/superheroes/superheroes.service';
import { SuperheroesPageComponent } from '../superheroes-page.component';
import { ISuperhero } from '../../../interfaces/superheroes.interface';

@Component({
  selector: 'app-superhero-details',
  templateUrl: './superhero-details.component.html',
  styleUrl: './superhero-details.component.scss',
})
export class SuperheroDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  loading: WritableSignal<boolean> = signal(true);
  isEditing: WritableSignal<boolean> = signal(false);
  notFound: WritableSignal<boolean> = signal(false);

  saveButtonText = computed(() => this.isNewHero() ? 'Crear' : 'Guardar');
  formsDisabled = computed(() => this.loading() || !this.isEditing());

  private routeSub!: Subscription;

  heroPreEdit: ISuperhero | null = null;
  superHeroForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl({ value: '', disabled: true }, [Validators.required]),
    power: new FormControl({ value: '', disabled: true }, [Validators.required]),
    photo: new FormControl({ value: '', disabled: true }),
  });

  constructor(
    private _router: Router,
    private cdr: ChangeDetectorRef,
    private _activeRoute: ActivatedRoute,
    private _superheroesService: SuperHeroesService,
    private _superHeroPage: SuperheroesPageComponent,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this._superHeroPage.matDrawer.open();
    this._superHeroPage.detailsOpened = true;

    this.routeSub = this._activeRoute.params.subscribe(params => {
      this.retrieveHeroDetails(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  edit(): void {
    this.isEditing.set(true);
    this.superHeroForm.enable();
    this.loading.set(false);
  }

  cancelEdit(): void {
    if (this.superHeroForm.dirty && this.heroPreEdit) {
      this.superHeroForm.patchValue(this.heroPreEdit);
    }

    this.superHeroForm.disable();
    this.isEditing.set(false);
  }

  initForm(): void {
    this.isEditing.set(false);
    this.superHeroForm.reset();
  }

  isNewHero(): boolean {
    return this.superHeroForm.get('id')?.value === null;
  }

  retrieveHeroDetails(id: string): void {
    this.loading.set(true);
    this.cdr.detectChanges();

    if (id === 'new') {
      this.edit();
      return;
    }

    this._superheroesService.getSuperheroById(parseInt(id)).pipe(first()).subscribe({
      next: hero => {
        if (!hero) {
          this.notFound.set(true);
          this.loading.set(false);
          this.cdr.detectChanges();
          return;
        }

        this.heroPreEdit = hero;
        this.superHeroForm.patchValue(hero);
        this.superHeroForm.disable();
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading.set(false);
        this.notFound.set(true);
        this.cdr.detectChanges();
      }
    });
  }

  createNewHero(): void {
    this._superheroesService.addSuperhero(this.superHeroForm.value).pipe(first()).subscribe({
      next: (value) => {
        if (this.isNewHero()) {
          this._router.navigate([PATHS.SUPERHEROES, value.data.id]);
        }

        this._stopEditing();
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  updateHero(): void {
    this._superheroesService.updateSuperhero(this.superHeroForm.value).pipe(first()).subscribe({
      next: (value) => {
        this.heroPreEdit = value.data;
        this._stopEditing();
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  private _stopEditing(): void {
    this.superHeroForm.disable();
    this.isEditing.set(false);
    this.loading.set(false);
  }

  saveHero(): void {
    if (!this.superHeroForm.valid) return;

    this.loading.set(true);

    if (this.superHeroForm.get('id')?.value === null) {
      this.createNewHero();
    } else {
      this.updateHero();
    }
  }
}
