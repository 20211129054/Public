import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Anket } from 'src/app/models/Anket';
import { AnketSoru } from 'src/app/models/AnketSoru';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-anketsoru',
  templateUrl: './anketsoru.component.html',
  styleUrls: ['./anketsoru.component.scss']
})
export class AnketsoruComponent {
  anketSorular: AnketSoru[] = [];
  anketler: Anket[] = [];
  anket: any;
  uye:any;
  anketId:any;
  yeniEkle:boolean;
  duzenle:boolean;
  duzenleAnketSoruAd:any="";
  duzenleAnketSoruId:any="";
  frm: FormGroup = new FormGroup({
    Ad: new FormControl()
  });
  frmDuzenle: FormGroup = new FormGroup({
    Ad: new FormControl(),
    AnketSoruId: new FormControl(),
  });
  constructor(
    public fbServis: FbservisService,
    public htoast: HotToastService,
    private route:ActivatedRoute
  ) { 
    this.yeniEkle = true;
    this.duzenle = false;
  }

  ngOnInit() {
   
    this.fbServis.aktifUye.subscribe(d => {
      this.uye = d;
    });
    this.route.paramMap.subscribe( paramMap => {
      this.anketId = paramMap.get('anketId');
    });

    this.AnketSoruListele(this.anketId);
    this.AnketGetir(this.anketId);

  }
  AnketSoruListele(anketId:string) {
    this.fbServis.AnketSoruListele(anketId).subscribe(d => {
      this.anketSorular = d;
    });
  }
  AnketGetir(anketId:string) {
    this.fbServis.AnketGetir(anketId).subscribe(d => {
      this.anket = d;
       });
  }
  YeniEkleme(){
    this.yeniEkle = true;
    this.duzenle = false;
  }
  AnketSoruEkle() {
    // console.log(this.frm.value);
    let uid = this.uye.uid;
    let OlusturmaTarihi = new Date().getTime().toString();
    this.fbServis.AnketSoruEkle({
      uid: uid, 
      Ad: this.frm.value.Ad, 
      OlusturmaTarihi: OlusturmaTarihi,
      AnketId: this.anketId
    })
      .pipe(
        this.htoast.observe({
          success: 'Anket Soru Eklendi',
          loading: 'Anket Soru Ekleniyor...',
          error: ({ message }) => `${message}`
        })
      )
      .subscribe();
  }
  AnketSoruDuzenle(){
    let uid = this.uye.uid;
    let OlusturmaTarihi = new Date().getTime().toString();
    this.fbServis.AnketSoruDuzenle({
      uid: uid, 
      Ad: this.frmDuzenle.value.Ad, 
      OlusturmaTarihi: OlusturmaTarihi,
      AnketId: this.anketId,
      AnketSoruId:this.frmDuzenle.value.AnketSoruId
    }).then(()=>{
      this.htoast.observe({
      success: 'Anket Soru Düzenlendi',
      loading: 'Anket Soru  Düzenleniyor...',
      error: ({ message }) => `${message}`
    })});
  }

  Sil(anketSoru: AnketSoru) {
    this.fbServis.AnketSoruSil(anketSoru)
    .pipe(
      this.htoast.observe({
        success: 'Anket Soru Silindi',
        loading: 'Anket Soru  Siliniyor...',
        error: ({ message }) => `${message}`
      })
    )
    .subscribe();

  }
  Duzenle(anketSoru:AnketSoru){
    this.duzenle = true;
    this.yeniEkle = false;
    this.duzenleAnketSoruId = anketSoru.AnketSoruId;
    this.duzenleAnketSoruAd= anketSoru.Ad;
  }
}
