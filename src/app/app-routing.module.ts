import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountFormComponent } from './pages/configuration/account/account-form/account-form.component';
import { AccountComponent } from './pages/configuration/account/account.component';
import { CategoryFormComponent } from './pages/configuration/category/category-form/category-form.component';
import { CategoryComponent } from './pages/configuration/category/category.component';
import { ExpenseFormComponent } from './pages/expense-form/expense-form.component';
import { HomeComponent } from './pages/home/home.component';
import { IncomingFormComponent } from './pages/incoming-form/incoming-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account-form', component: AccountFormComponent },
  { path: 'account-form/:id', component: AccountFormComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category-form', component: CategoryFormComponent },
  { path: 'category-form/:id', component: CategoryFormComponent },
  { path: 'expense-form', component: ExpenseFormComponent },
  { path: 'incoming-form', component: IncomingFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
