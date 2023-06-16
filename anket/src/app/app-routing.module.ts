
import { AnketlisteleComponent } from './components/anketlistele/anketlistele.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnketComponent } from './components/anket/anket.component';
import { HomeComponent } from './components/home/home.component';
import { UyeComponent } from './components/uye/uye.component';
import { UyelisteleComponent } from './components/uyelistele/uyelistele.component';
import { LoginComponent } from './components/login/login.component';

import { SorulisteleComponent } from './components/sorulistele/sorulistele.component';
import { SoruComponent } from './components/soru/soru.component';
import { SecenekComponent } from './components/secenek/secenek.component';
import { SeceneklisteleComponent } from './components/seceneklistele/seceneklistele.component';
import { CevaplaComponent } from './components/cevapla/cevapla.component';
import { AuthGuard } from './services/AuthGuard';
import { CevapListeleComponent } from './components/cevaplistele/cevaplistele.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'girisyap', component: LoginComponent
  },
  {
    path: 'uye', component: UyeComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'anket', component: AnketComponent
  },
  {
    path: 'soru', component: SoruComponent
  },
  {
    path: 'secenek', component: SecenekComponent
  },
  {
    path: 'anketlistele/:uyeId', component: AnketlisteleComponent
  },
  {
    path: 'uyelistele/:anketId', component: UyelisteleComponent
  },
  {
    path: 'sorulistele/:anketId', component: SorulisteleComponent
  },
  {
    path: 'seceneklistele/:soruId', component: SeceneklisteleComponent
  },
  {
    path: 'cevapla', component: CevaplaComponent
  },
  {
    path: 'cevaplistele/:anketId', component: CevapListeleComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
