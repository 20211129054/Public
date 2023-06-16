import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { Anket } from 'src/app/models/Anket';
import { MatTableDataSource } from '@angular/material/table';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { AnketDialogComponent } from '../dialogs/anket-dialog/anket-dialog.component';
import { Soru } from 'src/app/models/Soru';
import { Secenek } from 'src/app/models/Secenek';
import { FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Cevap } from 'src/app/models/Cevap';

@Component({
  selector: 'app-cevapla',
  templateUrl: './cevapla.component.html',
  styleUrls: ['./cevapla.component.css']
})
export class CevaplaComponent implements OnInit {

  uyeId: string;
  anketId: string = "";
  anketler: Anket[];
  sorular: Soru[];
  secenekler: Secenek[];
  secilenSecenekler: Secenek[] = [];
  frm!: FormGroup;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<AnketDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: AlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.uyeId = localStorage.getItem("uyeId");
    this.AnketGetir();
  }
  AnketGetir() {
    this.apiServis.AnketListe().subscribe(d => {
      this.anketler = d;
    });
  }

  SoruGetirByAnketId(anketId: string) {
    this.apiServis.SoruListeleByAnketId(anketId).subscribe(d => {
      this.sorular = d;
    });
  }

  AnketSec(d: string) {
    this.anketId = d;
    this.SoruGetirByAnketId(this.anketId);
  }
  Kaydet() {
    this.secilenSecenekler.forEach(x=>{
      var cevap:Cevap = new Cevap;
      cevap.cevapSecenekId = x.secenekId;
      cevap.cevapSecenek =x.secenek;
      cevap.cevapUyeId = this.uyeId;
      this.apiServis.CevapEkle(cevap).subscribe(d => {
        console.log(d.mesaj);
      });
    });
    
  }
  select(s: Secenek) {
    console.log(s);
  }

  onItemChange2(ddd: any, secenek: Secenek) {
    if (this.secilenSecenekler.length > 0) {
      this.secilenSecenekler.push(secenek);
      this.secilenSecenekler.forEach(x=>{
        if(x.secenekSoruId == secenek.secenekSoruId){
          if(x.secenek != secenek.secenek){
            var index = this.secilenSecenekler.indexOf(x);
            this.secilenSecenekler.splice(index,1);
          }
        }
      });

    }
    else {
      this.secilenSecenekler.push(secenek);
    }

  }
}
