import { Routes } from '@angular/router';

// Layouts
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { AboutLayoutComponent } from './layouts/about-layout/about-layout.component';
import { ContactLayoutComponent } from './layouts/contact-layout/contact-layout.component';
import { AdsDetailsLayoutComponent } from './layouts/ads-details-layout/ads-details-layout.component';
import { CategoryAdsLayoutComponent } from './layouts/category-ads-layout/category-ads-layout.component';

// Error Pages
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { MaintenanceComponent } from './components/errors/maintenance/maintenance.component';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SigninComponent } from './auth/signin/signin/signin.component';
import { SignupComponent } from './auth/signup/signup/signup.component';
import { AdminComponent } from './admin/admin/admin.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { CategoryAdsComponent } from './components/category-ads/category-ads.component';
import { AdsDetailsComponent } from './components/ads-details/ads-details.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchResultsLayoutComponent } from './layouts/search-results-layout/search-results-layout.component';
import { LatestPostsComponent } from './components/latest-posts/latest-posts.component';
import { PostAdvertisementComponent } from './components/post-advertisement/post-advertisement.component';

// Guards
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // PUBLIC LAYOUT (Home)
  {
    path: '',
    component: PublicLayoutComponent,
  },

  // AUTH ROUTES (No Layout)
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },

  // PRIVATE LAYOUT (Protected)

  // Admin Routes
  {
    path: 'admin',
    component: PrivateLayoutComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Moderator'] }, // admin
    children: [{ path: '', component: AdminComponent }],
  },

  // Dashboard
  {
    path: 'dashboard',
    component: PrivateLayoutComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Seller', 'Buyer', 'Guest'] }, // Everyone else
    children: [{ path: '', component: DashboardComponent }],
  },

  // Post Advertisement
  {
    path: 'post-advertisement',
    component: PrivateLayoutComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Seller', 'Admin'] },
    children: [{ path: '', component: PostAdvertisementComponent }],
  },

  {
    path: 'not-authorized',
    component: NotAuthorizedComponent,
  },

  {
    path: 'about',
    component: AboutLayoutComponent,
  },

  {
    path: 'contact',
    component: ContactLayoutComponent,
  },

  // Route Redirecting based on Category
  {
    path: 'category/:id',
    component: CategoryAdsLayoutComponent,
    children: [{ path: '', component: CategoryAdsComponent }],
  },

  // Route Redirecting based on Ads
  {
    path: 'advertisement/:id',
    component: AdsDetailsLayoutComponent,
    children: [{ path: '', component: AdsDetailsComponent }],
  },

  // Search Results Page
  {
    path: 'search-results',
    component: SearchResultsLayoutComponent,
    children: [{ path: '', component: SearchResultsComponent }],
  },

  // Navigation for Advertisements
  {
    path: 'advertisements',
    component: LatestPostsComponent,
  },

  // ERROR PAGES
  {
    path: '404',
    component: NotFoundComponent,
  },

  {
    path: '500',
    component: ServerErrorComponent,
  },

  {
    path: 'maintenance',
    component: MaintenanceComponent,
  },

  // Wilcard Route
  { path: '**', redirectTo: '404' },
];
