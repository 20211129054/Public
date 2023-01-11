import { HotToastService } from '@ngneat/hot-toast';
import { Anket } from '../../models/Anket';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Uye } from 'src/app/models/Uye';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mevcutAnketler: Anket[] = [];
  uye:any;
  yeniEkle:boolean;
  duzenle:boolean;
  duzenleAnketAd:any="";
  duzenleAnketId:any="";

  frm: FormGroup = new FormGroup({
    Ad: new FormControl()
  });
  frmDuzenle: FormGroup = new FormGroup({
    Ad: new FormControl(),
    AnketId: new FormControl(),
  });

  constructor(
    public fbServis: FbservisService,
    public htoast: HotToastService,
    private route:ActivatedRoute
  ) {     
    this.yeniEkle = true;
    this.duzenle = false;}

  ngOnInit() {
    this.AnketListele();
    this.fbServis.aktifUye.subscribe(d => {
      this.uye = d;
    });
  }
  AnketListele() {
    this.fbServis.AnketListele().subscribe(d => {
      this.mevcutAnketler = d;
      console.log(d);
    });
  }

  YeniEkleme(){
    this.yeniEkle = true;
    this.duzenle = false;
  }
  
  AnketEkle() {
    // console.log(this.frm.value);
    let uid = this.uye.uid;
    let OlusturmaTarihi = new Date().getTime().toString();
    this.fbServis.AnketEkle({
      uid: uid, Ad: this.frm.value.Ad, OlusturmaTarihi: OlusturmaTarihi, DegistirmeTarihi:""
    })
      .pipe(
        this.htoast.observe({
          success: 'Anket Eklendi',
          loading: 'Anket Ekleniyor...',
          error: ({ message }) => `${message}`
        })
      )
      .subscribe();
  }

  AnketDuzenle(){
    let uid = this.uye.uid;
    let OlusturmaTarihi = new Date().getTime().toString();
    this.fbServis.AnketDuzenle({
      uid: uid, 
      Ad: this.frmDuzenle.value.Ad, 
      OlusturmaTarihi: OlusturmaTarihi,
      AnketId:this.frmDuzenle.value.AnketId
    }).then(()=>{
      this.htoast.observe({
      success: 'Anket Düzenlendi',
      loading: 'Anket Düzenleniyor...',
      error: ({ message }) => `${message}`
    })});
  }
  Duzenle(anket:Anket){
    this.duzenle = true;
    this.yeniEkle = false;
    this.duzenleAnketId = anket.AnketId;
    this.duzenleAnketAd= anket.Ad;
  }

  Sil(anket: Anket) {
    this.fbServis.AnketSil(anket)
    .pipe(
      this.htoast.observe({
        success: 'Görev Silindi',
        loading: 'Görev Siliniyor...',
        error: ({ message }) => `${message}`
      })
    )
    .subscribe();

  }
  

}
