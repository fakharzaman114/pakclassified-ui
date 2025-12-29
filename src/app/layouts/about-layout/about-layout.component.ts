import { Component } from '@angular/core';
import { NavbarTopComponent } from '../../shared/navbar/navbar-top/navbar-top.component';
import { NavBarComponent } from '../../shared/navbar/nav-bar/nav-bar.component';
import { CarousalComponent } from '../../components/carousal/carousal.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { FooterComponent } from '../../shared/footer/footer/footer.component';

@Component({
  selector: 'app-about-layout',
  imports: [
    NavbarTopComponent,
    NavBarComponent,
    CarousalComponent,
    AboutUsComponent,
    FooterComponent,
  ],
  templateUrl: './about-layout.component.html',
  styleUrl: './about-layout.component.css',
})
export class AboutLayoutComponent {}
