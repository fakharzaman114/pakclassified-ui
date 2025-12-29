import { Component } from '@angular/core';
import { NavbarTopComponent } from '../../shared/navbar/navbar-top/navbar-top.component';
import { NavBarComponent } from '../../shared/navbar/nav-bar/nav-bar.component';
import { CarousalComponent } from '../../components/carousal/carousal.component';
import { FooterComponent } from '../../shared/footer/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-category-ads-layout',
  imports: [
    NavbarTopComponent,
    NavBarComponent,
    CarousalComponent,
    FooterComponent,
    RouterOutlet,
  ],
  templateUrl: './category-ads-layout.component.html',
  styleUrl: './category-ads-layout.component.css',
})
export class CategoryAdsLayoutComponent {}
