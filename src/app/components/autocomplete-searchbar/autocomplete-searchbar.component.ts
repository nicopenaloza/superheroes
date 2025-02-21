import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { IAutocompleteOption } from '../../interfaces/autocomplete-option.interface';

@Component({
  selector: 'app-autocomplete-searchbar',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinner,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  templateUrl: './autocomplete-searchbar.component.html',
  styleUrls: ['./autocomplete-searchbar.component.scss']
})
export class AutocompleteSearchbarComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() options: IAutocompleteOption[] = [];
  @Input() loading: boolean = false;
  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

  formControl: FormControl = new FormControl('');

  onSubmitEvent(): void {
    this.onSubmit.emit(this.formControl.value);
  }  

  onChangeEvent(): void {
    this.onChange.emit(this.formControl.value);
  }
}