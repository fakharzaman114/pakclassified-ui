import { Component } from '@angular/core';
import { NavbarTopComponent } from '../../shared/navbar/navbar-top/navbar-top.component';
import { NavBarComponent } from '../../shared/navbar/nav-bar/nav-bar.component';
import { CarousalComponent } from '../../components/carousal/carousal.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer/footer.component';

@Component({
  selector: 'app-ads-details-layout',
  imports: [
    NavbarTopComponent,
    NavBarComponent,
    CarousalComponent,
    RouterOutlet,
    FooterComponent,
  ],
  templateUrl: './ads-details-layout.component.html',
  styleUrl: './ads-details-layout.component.css',
})
export class AdsDetailsLayoutComponent {}
