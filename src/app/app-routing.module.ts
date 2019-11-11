import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'portfolio', loadChildren: './portfolio/portfolio.module#PortfolioPageModule' },
  { path: 'investment-history', loadChildren: './investment-history/investment-history.module#InvestmentHistoryPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'chats', loadChildren: './chats/chats.module#ChatsPageModule' },
  { path: 'support', loadChildren: './support/support.module#SupportPageModule' },
  { path: 'investor-signup', loadChildren: './investor-signup/investor-signup.module#InvestorSignupPageModule' },
  { path: 'investor-home', loadChildren: './investor-home/investor-home.module#InvestorHomePageModule' },
  { path: 'investment-profile', loadChildren: './investment-profile/investment-profile.module#InvestmentProfilePageModule' },
  { path: 'investments', loadChildren: './investments/investments.module#InvestmentsPageModule' },
  { path: 'companies', loadChildren: './companies/companies.module#CompaniesPageModule' },
  { path: 'landing', loadChildren: './landing/landing.module#LandingPageModule' },
  { path: 'investor-landing', loadChildren: './investor-landing/investor-landing.module#InvestorLandingPageModule' },
  { path: 'entrepreneur-landing', loadChildren: './entrepreneur-landing/entrepreneur-landing.module#EntrepreneurLandingPageModule' },
  { path: 'investor-login', loadChildren: './investor-login/investor-login.module#InvestorLoginPageModule' },
  { path: 'entrepreneur-login', loadChildren: './entrepreneur-login/entrepreneur-login.module#EntrepreneurLoginPageModule' },
  { path: 'entrepreneur-signup', loadChildren: './entrepreneur-signup/entrepreneur-signup.module#EntrepreneurSignupPageModule' },
  { path: 'terms', loadChildren: './terms/terms.module#TermsPageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
