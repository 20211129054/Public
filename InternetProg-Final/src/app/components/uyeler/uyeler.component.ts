import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { FbservisService } from 'src/app/services/fbservis.service';
import { Uye } from './../../models/Uye';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-uye',
  templateUrl: './uyeler.component.html',
  styleUrls: ['./uyeler.component.css']
})
export class UyelerComponent implements OnInit {

  uyeler: Uye[] = [];
  adminBilgi!: Uye[];
  modal!: Modal;
  modalBaslik: string = "";
  secUye!: Uye;
  IsAdmin?:boolean = false;

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
  ) { }

  ngOnInit() {
    this.UyeListele();
    this.fbServis.AktifUyeBilgi.subscribe((d)=>{
      this.IsAdmin = d?.admin;
    });

  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Üye Ekle";
    this.modal.show();
  }
  Duzenle(uye: Uye, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = "Üye Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uye: Uye, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = "Üye Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  UyeListele() {
    this.fbServis.UyeListele().subscribe(d => {
      this.uyeler = d;
    });

  }
  UyeEkle() {
    this.fbServis.
      KayitOl(this.frm.value.email, this.frm.value.password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.fbServis.UyeEkle({ uid, email:this.frm.value.email, admin:this.frm.value.admin, Ad: this.frm.value.Ad,Soyad: this.frm.value.Soyad})
        ),
        this.htoast.observe({
          success: 'Tebrikler Kayıt Yapıldı',
          loading: 'Kayıt Yapılıyor...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['uyeler']);
      });
    }

  

  UyeSil(uye: Uye) {
    this.fbServis.UyeSil(uye)
    .pipe(
      this.htoast.observe({
        success: 'Üye Silindi',
        loading: 'Üye Siliniyor...',
        error: ({ message }) => `${message}`

      })
    )
    .subscribe();
  }

  UyeAdmin(admin: Uye, d: boolean) {
    admin.admin = d;
    this.fbServis.AktifUyeBilgi
  }
}