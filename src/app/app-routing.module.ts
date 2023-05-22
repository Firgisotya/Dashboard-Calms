import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { KalibrasiComponent } from './pages/kalibrasi/kalibrasi.component';
import { PendingComponent } from './pages/pending/pending.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'kalibrasi', component: KalibrasiComponent},
  { path: 'pending', component: PendingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
