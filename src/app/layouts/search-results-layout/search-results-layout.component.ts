import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/navbar/nav-bar/nav-bar.component';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { FooterComponent } from '../../shared/footer/footer/footer.component';

@Component({
  selector: 'app-search-results-layout',
  imports: [NavBarComponent, SearchResultsComponent, FooterComponent],
  templateUrl: './search-results-layout.component.html',
  styleUrl: './search-results-layout.component.css',
})
export class SearchResultsLayoutComponent {}
