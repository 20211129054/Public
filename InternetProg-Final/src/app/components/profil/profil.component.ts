import { Uye } from './../../models/Uye';
import { HotToastService } from '@ngneat/hot-toast';
import { FormGroup, FormControl } from '@angular/forms';
import { FbservisService } from 'src/app/services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  uye = this.fbServis.AktifUyeBilgi;
  frm: FormGroup = new FormGroup({
    uid: new FormControl(),
    email: new FormControl(),
    displayName: new FormControl(),
    tel: new FormControl(),
    adres: new FormControl(),
  });
  constructor(
    public fbServis: FbservisService,
    public htoast: HotToastService

  ) { }

  ngOnInit() {
    this.fbServis.AktifUyeBilgi
      .subscribe((user) => {
        this.frm.patchValue({ ...user });
      });
  }
  Kaydet() {
    this.fbServis
      .UyeDuzenle(this.frm.value)
      .pipe(
        this.htoast.observe({
          loading: 'Güncelleniyor',
          success: 'Güncellendi',
          error: 'Hata Oluştu',
        })
      )
      .subscribe();
  }
}


