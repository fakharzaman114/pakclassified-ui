import { Component } from '@angular/core';
import { NavbarTopComponent } from '../../shared/navbar/navbar-top/navbar-top.component';
import { NavBarComponent } from '../../shared/navbar/nav-bar/nav-bar.component';
import { CarousalComponent } from '../../components/carousal/carousal.component';
import { SearchSectionComponent } from '../../components/search-section/search-section.component';
import { CategoriesSectionComponent } from '../../components/categories-section/categories-section.component';
import { LatestPostsComponent } from '../../components/latest-posts/latest-posts.component';
import { FooterComponent } from '../../shared/footer/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  imports: [
    NavbarTopComponent,
    NavBarComponent,
    CarousalComponent,
    SearchSectionComponent,
    CategoriesSectionComponent,
    LatestPostsComponent,
    FooterComponent,
  ],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {}
