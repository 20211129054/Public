import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Anket } from 'src/app/models/Anket';
import { AnketSoru } from 'src/app/models/AnketSoru';
import { AnketSoruCevap } from 'src/app/models/AnketSoruCevap';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-anketsonuc',
  templateUrl: './anketsonuc.component.html',
  styleUrls: ['./anketsonuc.component.scss']
})
export class AnketsonucComponent {
  mevcutAnketler: Anket[] = [];
  anketSoruCevaplar: AnketSoruCevap[] = [];

  uye:any;
  anketId:any;
     
  constructor(
    public fbServis: FbservisService,
    public htoast: HotToastService,
    private route:ActivatedRoute
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
    this.secilenAnket = this.mevcutAnketler.find(x=>x.AnketId == this.selectedValue);
    this.AnketSonucListele(this.secilenAnket.AnketId);
  }
  AnketListele() {
    this.fbServis.AnketListele().subscribe(d => {
      this.mevcutAnketler = d;
    });
  }
  AnketSonucListele(anketId: string) {
    this.fbServis.AnketSonucListele(anketId).subscribe(d => {
      this.anketSoruCevaplar = d;         });
  }


  
 

 
 
}
