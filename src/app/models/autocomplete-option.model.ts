import { IAutocompleteOption } from "../interfaces/autocomplete-option.interface";

export class AutoCompleteOption implements IAutocompleteOption {
    id: number;
    label: string;

    constructor(id: number, label: string) {
        this.id = id;
        this.label = label;
    }
}