import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UppercaseDirective } from './uppercase.directive';

@Component({
  template: `<input type="text" [formControl]="control" uppercase>`
})
class TestHostComponent {
  control = new FormControl('');
}

describe('UppercaseDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [ReactiveFormsModule, UppercaseDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should transform input text to uppercase', () => {
    inputEl.value = 'superman';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.value).toBe('SUPERMAN');
    expect(component.control.value).toBe('SUPERMAN');
  });

  it('should not change text if already uppercase', () => {
    inputEl.value = 'SUPERMAN';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.value).toBe('SUPERMAN');
    expect(component.control.value).toBe('SUPERMAN');
  });
});