import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-image-input',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss'
})
export class ImageInputComponent {
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;
  @Output() onFileChange: EventEmitter<string> = new EventEmitter<string>();

  onFileSelected() {
    const file = this.fileInput.nativeElement?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.onFileChange.emit(base64String);
      };
      reader.readAsDataURL(file);
    }
  }
}
