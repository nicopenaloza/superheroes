import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TitleComponent, MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() showNewButton: boolean = false;
  @Output() onNewButtonClick: EventEmitter<void> = new EventEmitter<void>();
}
