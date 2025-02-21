import { Injectable } from '@angular/core';
import { IAutocompleteOption } from '../../interfaces/autocomplete-option.interface';
import { AutoCompleteOption } from '../../models/autocomplete-option.model';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteSearchbarService {

  constructor() { }

  parseObjectToOption<T extends { [key: string]: any }>(obj: T, key: string, label: string): IAutocompleteOption {
    return new AutoCompleteOption(obj[key] as number, obj[label] as string);
  }
}
