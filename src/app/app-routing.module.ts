import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { KalibrasiComponent } from './pages/kalibrasi/kalibrasi.component';
import { PendingComponent } from './pages/pending/pending.component';
import { ReportComponent } from './pages/report/report.component';
import { CetakComponent } from './pages/cetak/cetak.component';
import { HasilCetakComponent } from './pages/hasil-cetak/hasil-cetak.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'kalibrasi', component: KalibrasiComponent},
  { path: 'pending', component: PendingComponent},
  { path: 'report', component: ReportComponent},
  { path: 'cetak', component: CetakComponent},
  { path: 'print/:id', component: HasilCetakComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
