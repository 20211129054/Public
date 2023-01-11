import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Anket } from 'src/app/models/Anket';
import { AnketSoru } from 'src/app/models/AnketSoru';
import { AnketSoruCevap } from 'src/app/models/AnketSoruCevap';
import { AnketSoruSecenek } from 'src/app/models/AnketSoruSecenek';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-anketcevapla',
  templateUrl: './anketcevapla.component.html',
  styleUrls: ['./anketcevapla.component.scss']
})
export class AnketcevaplaComponent implements OnInit {
  mevcutAnketler: Anket[] = [];
  anketSorular: AnketSoru[] = [];
  anketSoruCevaplar: AnketSoruCevap[] = [];

  anketSoruSecenekler: AnketSoruSecenek[] = [];
  anketSoruSecenekler2: AnketSoruSecenek[] = [];
  uye: any;

  formYanit!:FormGroup;
  @ViewChild("frm") frm: ElementRef | undefined;
  constructor(
    public fbServis: FbservisService,
    public htoast: HotToastService
  ) {
  }
  secilenAnket:any;
  ngOnInit() {
    this.AnketListele();
    this.fbServis.aktifUye.subscribe(d => {
      this.uye = d;
    });
  }
  selectedValue: any = "Anket Seçiniz";

  onChange(value: any) {
    this.selectedValue = value;
    this.AnketSoruListele(value);
    this.secilenAnket = this.mevcutAnketler.find(x=>x.AnketId == this.selectedValue);
  }
  AnketListele() {
    this.fbServis.TumAnketListele().subscribe(d => {
      this.mevcutAnketler = d;
    });
  }
  AnketSoruListele(anketId: string) {
    this.fbServis.AnketSoruListele(anketId).subscribe(d => {
      this.anketSorular = d;
      let groupaa:any=[]
      d.forEach((dd)=>{
        groupaa[dd.Ad] = new FormControl('')
      })
      this.formYanit = new FormGroup(groupaa);
      console.log(this.formYanit);
      this.AnketSoruSListele2();
      // this.anketSorular.forEach((soru)=>{
      //   this.AnketSoruSListele(soru.AnketSoruId!);
      // });
    });
  }

  AnketSoruSListele(soruId:string) {
    this.fbServis.AnketSoruSListele(soruId).subscribe(d => {
      this.anketSoruSecenekler = d;
      console.log(d);
    });
  }

  AnketSoruSListele2() {
    this.fbServis.AnketSoruSListe2().subscribe(d => {
      this.anketSoruSecenekler2 = d;
      // let groupaa:any=[]
      // d.forEach((dd)=>{
      //   groupaa[dd.Ad] = new FormControl('')
      // })
      // this.formYanit = new FormGroup(groupaa);
      // console.log(this.formYanit);
    });
  }
  AnketSoruCevapla(){
    for(let item in this.formYanit.controls) {
     
      this.fbServis.AnketSoruCevapEkle({
        AnketSoruAd: item.toString(),
        uid: this.uye.uid,
        AnketAd: this.secilenAnket.Ad,
        AnketId: this.secilenAnket.AnketId,
        Cevap: this.formYanit.value[item],
        OlusturmaTarihi:new Date().getTime().toString()
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
    
  }

  AnketSoruCevapEkle() {
    // console.log(this.frm.value);
    // this.formYanit.;


    // let uid = this.uye.uid;
    // let OlusturmaTarihi = new Date().getTime().toString();
    // this.fbServis.AnketSoruCevapEkle({
    //   uid: uid,
    //   AnketSoruAd = this.formYanit.
    //   Ad: this.frm.value.Ad, 
    //   OlusturmaTarihi: OlusturmaTarihi,
    //   AnketId: this.anketId
    // })
    //   .pipe(
    //     this.htoast.observe({
    //       success: 'Anket Soru Eklendi',
    //       loading: 'Anket Soru Ekleniyor...',
    //       error: ({ message }) => `${message}`
    //     })
    //   )
    //   .subscribe();
  }
}
