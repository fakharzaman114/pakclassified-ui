import { Component } from '@angular/core';
import { NavbarTopComponent } from '../../shared/navbar/navbar-top/navbar-top.component';
import { NavBarComponent } from '../../shared/navbar/nav-bar/nav-bar.component';
import { CarousalComponent } from '../../components/carousal/carousal.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../shared/footer/footer/footer.component';

@Component({
  selector: 'app-contact-layout',
  imports: [
    NavbarTopComponent,
    NavBarComponent,
    CarousalComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './contact-layout.component.html',
  styleUrl: './contact-layout.component.css',
})
export class ContactLayoutComponent {}
