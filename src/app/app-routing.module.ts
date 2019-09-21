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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
