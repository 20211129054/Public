import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AnketSoruSecenek } from 'src/app/models/AnketSoruSecenek';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-anketsorusecenek',
  templateUrl: './anketsorusecenek.component.html',
  styleUrls: ['./anketsorusecenek.component.scss']
})
export class AnketsorusecenekComponent {
  anketSoruSecenekler: AnketSoruSecenek[] = [];
  SoruId:any;
  soru: any;
  uye:any;
  yeniEkle:boolean;
  duzenle:boolean;
  duzenleAnketSoruSAd:any="";
  duzenleAnketSoruSId:any="";
  frm: FormGroup = new FormGroup({
    Ad: new FormControl()
  });
  frmDuzenle: FormGroup = new FormGroup({
    Ad: new FormControl(),
    AnketSoruSId: new FormControl(),
  });
  constructor(public fbServis: FbservisService,
    public htoast: HotToastService,
    private route:ActivatedRoute){    this.yeniEkle = true;
    this.duzenle = false;}

  ngOnInit() {
   
    this.fbServis.aktifUye.subscribe(d => {
      this.uye = d;
    });
    this.route.paramMap.subscribe( paramMap => {
      this.SoruId = paramMap.get('anketSoruId');
    });
    this.AnketSoruSListele(this.SoruId);
    this.SoruGetir(this.SoruId);
  }
  AnketSoruSListele(anketId:string) {
    this.fbServis.AnketSoruSListele(anketId).subscribe(d => {
      this.anketSoruSecenekler = d;
    });
  }
  YeniEkleme(){
    this.yeniEkle = true;
    this.duzenle = false;
  }
  AnketSoruSEkle() {
    // console.log(this.frm.value);
    let uid = this.uye.uid;
    let OlusturmaTarihi = new Date().getTime().toString();
    this.fbServis.AnketSoruSEkle({
      uid: uid, 
      Ad: this.frm.value.Ad, 
      OlusturmaTarihi: OlusturmaTarihi,
      SoruId: this.SoruId
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
  AnketSoruSDuzenle(){
    let uid = this.uye.uid;
    let OlusturmaTarihi = new Date().getTime().toString();
    this.fbServis.AnketSoruSDuzenle({
      uid: uid, 
      Ad: this.frmDuzenle.value.Ad, 
      OlusturmaTarihi: OlusturmaTarihi,
      SoruId: this.SoruId,
      AnketSoruSId:this.frmDuzenle.value.AnketSoruSId
    }).then(()=>{
      this.htoast.observe({
      success: 'Seçenek Düzenlendi',
      loading: 'Seçenek  Düzenleniyor...',
      error: ({ message }) => `${message}`
    })});
  }

  Sil(AnketSoruSecenek: AnketSoruSecenek) {
    this.fbServis.AnketSoruSSil(AnketSoruSecenek)
    .pipe(
      this.htoast.observe({
        success: 'Seçenek Silindi',
        loading: 'Seçenek  Siliniyor...',
        error: ({ message }) => `${message}`
      })
    )
    .subscribe();

  }
  Duzenle(AnketSoruSecenek:AnketSoruSecenek){
    this.duzenle = true;
    this.yeniEkle = false;
    this.duzenleAnketSoruSId = AnketSoruSecenek.AnketSoruSId;
    this.duzenleAnketSoruSAd= AnketSoruSecenek.Ad;
  }
  SoruGetir(AnketSoruId:string) {
    this.fbServis.SoruGetir(AnketSoruId).subscribe(d => {
      this.soru = d;
      console.log(d);
       });
  }
  }













