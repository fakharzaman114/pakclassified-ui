import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/navbar/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer/footer.component';

@Component({
  selector: 'app-private-layout',
  imports: [NavBarComponent, RouterOutlet, FooterComponent],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.css',
})
export class PrivateLayoutComponent {}
