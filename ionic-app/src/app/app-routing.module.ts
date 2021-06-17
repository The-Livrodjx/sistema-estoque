import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './pages/services/auth-guard.service';

const routes: Routes = [


  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) }
  ,
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'new-product',
    loadChildren: () => import('./pages/new-product/new-product.module').then( m => m.NewProductPageModule)
  },  {
    path: 'add-quantity-product',
    loadChildren: () => import('./pages/add-quantity-product/add-quantity-product.module').then( m => m.AddQuantityProductPageModule)
  },
  {
    path: 'money-dashboard',
    loadChildren: () => import('./pages/money-dashboard/money-dashboard.module').then( m => m.MoneyDashboardPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
