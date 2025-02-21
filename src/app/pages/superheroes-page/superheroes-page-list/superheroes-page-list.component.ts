import { Component, EventEmitter, OnInit, Output, signal, ViewChild, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActionConfirmDialog } from '../../../components/action-confirm-dialog/action-confirm-dialog.component';
import { ISuperhero } from '../../../interfaces/superheroes.interface';
import { SuperHeroesService } from '../../../services/superheroes/superheroes.service';
import { IAutocompleteOption } from '../../../interfaces/autocomplete-option.interface';
import { AutocompleteSearchbarService } from '../../../services/autocomplete-searchbar/autocomplete-searchbar.service';

@Component({
  selector: 'app-superheroes-list',
  templateUrl: './superheroes-page-list.component.html',
  styleUrls: ['./superheroes-page-list.component.scss']
})
export class SuperheroesPageListComponent implements OnInit {
  @Output() onDetailsOpen: EventEmitter<number | string> = new EventEmitter<number | string>();

  superHeroes: ISuperhero[] = [];
  displayedColumns: string[] = ['avatar', 'name', 'power', 'actions'];
  dataSource = new MatTableDataSource<ISuperhero>([]);

  loading: WritableSignal<boolean> = signal(false);
  searchbarValue: WritableSignal<string> = signal('');
  searchbarOptions: WritableSignal<IAutocompleteOption[]> = signal([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _matDialog: MatDialog,
    private _superheroService: SuperHeroesService,
    private _searchbarService: AutocompleteSearchbarService
  ) { }

  ngOnInit(): void {
    this.loading.set(true);
    this._superheroService.getSuperheroes().subscribe(heroes => {
      this.dataSource.data = heroes;
      this.dataSource.paginator = this.paginator;
      this.loading.set(false);
    });

    this._superheroService.onSuperheroesChange.subscribe({
      next: heroes => {
        this.search(this.searchbarValue())
      }
    });
  }

  search(value: string = ''): void {
    this.loading.set(true);
    this._superheroService.getSuperheroesByName(value)
      .subscribe({
        next: heroes => {
          this.dataSource.data = heroes;
          this.loading.set(false);
        },
        error: () => {
          this.dataSource.data = [];
          this.loading.set(false);
        }
      });
  }

  onSearchChange(value: string): void {
    this.loading.set(true);
    this.searchbarValue.set(value);
    this._superheroService.getSuperheroesByName(this.searchbarValue())
      .subscribe(heroes => {
        this.searchbarOptions.set(
          heroes.map(hero => this._searchbarService.parseObjectToOption(hero, 'id', 'name'))
        );
        this.loading.set(false);
      });
  }

  openDetails(id: number | string): void {
    this.onDetailsOpen.emit(id);
  }

  deleteHero(hero: ISuperhero, event: Event): void {
    event.stopPropagation();
    const dialogRef = this._matDialog.open(ActionConfirmDialog, {
      data: {
        title: '¡Cuidado!',
        message: `¿Estás seguro de que deseas eliminar a ${hero.name}?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        onConfirm: () => this._superheroService.deleteSuperhero(hero.id)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Héroe eliminado: ${hero.name}`);
      }
    });
  }
}