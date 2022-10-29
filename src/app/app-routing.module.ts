import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountFormComponent } from './pages/configuration/account/account-form/account-form.component';
import { AccountComponent } from './pages/configuration/account/account.component';
import { CategoryFormComponent } from './pages/configuration/category/category-form/category-form.component';
import { CategoryComponent } from './pages/configuration/category/category.component';

const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'account-form', component: AccountFormComponent },
  { path: 'account-form/:id', component: AccountFormComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category-form', component: CategoryFormComponent },
  { path: 'category-form/:id', component: CategoryFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
