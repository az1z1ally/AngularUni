import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ClickOutsideDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchString: string = ''
  isMenuOpened: boolean = false

  toggleMenu() : void {
    this.isMenuOpened = !this.isMenuOpened
  }

  clickedOutside(): void {
    this.isMenuOpened = false
  }
}
