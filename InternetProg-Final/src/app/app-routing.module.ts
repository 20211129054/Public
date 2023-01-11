import { ProfilComponent } from './components/profil/profil.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { UyelerComponent } from './components/uyeler/uyeler.component';
import { AnketsoruComponent } from './components/anketsoru/anketsoru.component';
import { AnketsorusecenekComponent } from './components/anketsorusecenek/anketsorusecenek.component';
import { AnketcevaplaComponent } from './components/anketcevapla/anketcevapla.component';
import { AnketsonucComponent } from './components/anketsonuc/anketsonuc.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['anketcevapla']);
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'anketsorular/:anketId',
    component: AnketsoruComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'anketsorusecenekler/:anketSoruId',
    component: AnketsorusecenekComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'anketcevapla',
    component: AnketcevaplaComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'anketsonuc',
    component: AnketsonucComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'profil',
    component: ProfilComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'uyeler',
    component: UyelerComponent,
    ...canActivate(redirectToLogin),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
