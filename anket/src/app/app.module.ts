import { AnketDialogComponent } from './components/dialogs/anket-dialog/anket-dialog.component';
import { AnketlisteleComponent } from './components/anketlistele/anketlistele.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AnketComponent } from './components/anket/anket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UyeComponent } from './components/uye/uye.component';
import { UyesecDialogComponent } from './components/dialogs/uyesec-dialog/uyesec-dialog.component';
import { UyelisteleComponent } from './components/uyelistele/uyelistele.component';
import { LoginComponent } from './components/login/login.component';
import { SoruComponent } from './components/soru/soru.component';
import { SorulisteleComponent } from './components/sorulistele/sorulistele.component';
import { SoruDialogComponent } from './components/dialogs/soru-dialog/soru-dialog.component';
import { SecenekComponent } from './components/secenek/secenek.component';
import { SeceneklisteleComponent } from './components/seceneklistele/seceneklistele.component';
import { SecenekDialogComponent } from './components/dialogs/secenek-dialog/secenek-dialog.component';
import { CevaplaComponent } from './components/cevapla/cevapla.component';
import { MatRadioModule } from '@angular/material/radio';
import { ApiService } from './services/api.service';
import { Authlnterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AuthGuard';
import { CevapListeleComponent } from './components/cevaplistele/cevaplistele.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UyeComponent,
    AnketComponent,
    AnketlisteleComponent,
    UyelisteleComponent,
    SoruComponent,
    SorulisteleComponent,
    SecenekComponent,
    SeceneklisteleComponent,
    CevaplaComponent,
    CevapListeleComponent,
    BackButtonComponent,


    //dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    AnketDialogComponent,
    UyesecDialogComponent,
    LoginComponent,
    SoruDialogComponent,
    SecenekDialogComponent,
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatMenuModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    AnketDialogComponent,
    UyesecDialogComponent

  ],

  providers: [ApiService, AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: Authlnterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
