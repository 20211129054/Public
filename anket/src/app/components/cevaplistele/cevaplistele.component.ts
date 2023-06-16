/* import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Soru } from 'src/app/models/Soru';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cevaplistele',
  templateUrl: './cevaplistele.component.html',
  styleUrls: ['./cevaplistele.component.css']
})
export class CevaplisteleComponent implements OnInit {

  anketId: string = "";
  sorular: Soru[];
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: AlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p) {
        this.anketId = p.anketId;
        this.SoruGetirByAnketId(this.anketId);
      }
    });
  }

  SoruGetirByAnketId(anketId: string) {
    this.apiServis.SoruListeleByAnketId(anketId).subscribe(d => {
      this.sorular = d;
    });
  }
  CevapGoruntule(){

  }

}
 */

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
  selector: 'app-cevaplistele',
  templateUrl: './cevaplistele.component.html',
  styleUrls: ['./cevaplistele.component.css']
})
export class CevapListeleComponent implements OnInit {
  dataSource: any;
  uyeId: string;
  anketId: string = "";
  anketAd: string;
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
    if (this.apiServis.IsAdmin()) {
      this.AnketGetir();
    }
    else {
      if (this.uyeId != null) {
        this.AnketGetirByUye(this.uyeId);
      }
    }
  }
  AnketGetir() {
    this.apiServis.AnketListe().subscribe(d => {
      this.anketler = d;
    });
  }
  AnketGetirByUye(uyeId: string) {
    this.apiServis.AnketListeleByUyeId(uyeId).subscribe(d => {
      this.anketler = d;
    });
  }

  SoruGetirByAnketId(anketId: string) {
    this.apiServis.SoruListeleByAnketId(anketId).subscribe(d => {
      this.sorular = d;
    });
  }

  AnketSec(d: Anket) {
    this.anketAd = d.anketAdi;
    this.anketId = d.anketId;
    this.SoruGetirByAnketId(this.anketId);
  }

  Filterele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
  }
}

