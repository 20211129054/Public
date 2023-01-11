import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { FbservisService } from 'src/app/services/fbservis.service';
import {FormControl, FormGroup} from '@angular/forms';
import { Uye } from 'src/app/models/Uye';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {
  frm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    Ad: new FormControl(),
    Soyad: new FormControl(),
    admin: new FormControl()
  });

  constructor(
    public fbServis: FbservisService,
    public htoast: HotToastService,
    public router: Router
  ) { 
    
  }

  ngOnInit() {
  }
  UyeOl() {
    console.log(this.frm.value);

    this.fbServis.
      KayitOl(this.frm.value.email, this.frm.value.password)
      .pipe(
        switchMap(({ user: { uid } }) =>
      
        this.fbServis.UyeEkle({uid, email:this.frm.value.email, admin:this.frm.value.admin, Ad: this.frm.value.Ad,Soyad: this.frm.value.Soyad})
        ),
        this.htoast.observe({
          success: 'Tebrikler Kayıt Yapıldı',
          loading: 'Kayıt Yapılıyor...',
          error: ({ message }) => `${message}`,
          
        })
      )
      .subscribe(() => {
        this.router.navigate(['anketcevapla']);
      });
  }

}
