import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorsComponent } from './investors/investors.component';
import { GuardService } from './shared/services/guard.service';
import { InvestorComponent } from './investor/investor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Investors',
    pathMatch: 'full',
  },
  {
    path: 'Investors',
    component: InvestorsComponent,
    canActivate: [GuardService]
  },
  {
    path: 'Investor/:id',
    component: InvestorComponent,
    canActivate: [GuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
