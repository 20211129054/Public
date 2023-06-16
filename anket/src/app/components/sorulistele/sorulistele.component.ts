import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { Soru } from 'src/app/models/Soru';
import { MatTableDataSource } from '@angular/material/table';
import { Anket } from 'src/app/models/Anket';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';

@Component({
  selector: 'app-sorulistele',
  templateUrl: './sorulistele.component.html',
  styleUrls: ['./sorulistele.component.css']
})
export class SorulisteleComponent implements OnInit {
  secAnket: Anket;
  anketId: string;
  soruId: string = "";
  sorular: Soru[];
  dataSource: any;
  displayedColumns = ['soru','secenekSayi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<SoruDialogComponent>;

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
        this.AnketGetir();
        this.SoruGetir(this.anketId);
      }
    });
  }
  SoruGetir(anketId:string) {
    this.apiServis.SoruListeleByAnketId(anketId).subscribe(d => {
      this.sorular = d;
      console.log(d);
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  AnketGetir() {
    this.apiServis.AnketById(this.anketId).subscribe(d => {
      this.secAnket = d;
    });
  }

  SoruSec(d: string) {
    this.soruId = d;
  }
  Kaydet() {
    var yeniSoru: Soru = new Soru();
    this.dialogRef = this.matDialog.open(SoruDialogComponent, {
      width: "400px",
      height: "250px",
      data: {
        islem: 'ekle',
        soru: yeniSoru
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        yeniSoru.soru = d.soru;
        yeniSoru.soruAnketId = this.anketId;
        this.apiServis.SoruEkle(yeniSoru).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SoruGetir(this.anketId);
          }
        });
      }
    });

  }
  SoruDuzenle(soru: Soru) {
    this.dialogRef = this.matDialog.open(SoruDialogComponent, {
      width: "400px",
      height: "250px",
      data: {
        islem: 'duzenle',
        soru: soru
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        soru.soru = d.soru;
        this.apiServis.SoruDuzenle(soru).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SoruGetir(this.anketId);
          }
        });
      }
    });

  }

  SoruSil(soru: Soru) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px",
      height: "250px",
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = soru.soru + " Soru Kaydı Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.SoruSil(soru.soruId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SoruGetir(this.anketId);
          }
        });
      }
    });
  }
  
}
