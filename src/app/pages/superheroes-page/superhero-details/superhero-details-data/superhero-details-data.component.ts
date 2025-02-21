import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-superhero-details-data',
  templateUrl: './superhero-details-data.component.html',
  styleUrl: './superhero-details-data.component.scss'
})
export class SuperheroDetailsDataComponent {
  @Input() superHeroForm!: FormGroup;
  @Input() isEditing!: boolean;
}
