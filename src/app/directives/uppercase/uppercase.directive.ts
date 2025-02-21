import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uppercase]',
  standalone: true
})
export class UppercaseDirective {

  constructor(private el: ElementRef, @Optional() private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.el.nativeElement;
    const originalValue: string = input.value;
    const upperValue: string = originalValue.toUpperCase();

    if (upperValue !== originalValue) {
      input.value = upperValue;

      if (this.control && this.control.control) {
        this.control.control.setValue(upperValue, { emitEvent: false });
      }
    }
  }
}
