import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Soru } from 'src/app/models/Soru';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';

@Component({
  selector: 'app-soru',
  templateUrl: './soru.component.html',
  styleUrls: ['./soru.component.css']
})
export class SoruComponent implements OnInit {
  sorular: Soru[];
  uyeId:string;
  anketId:string;
  dataSource: any;
  displayedColumns = ['soruAd', 'soruSecenekSayisi', 'islemler'];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<SoruDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.anketId = localStorage.getItem("anketId");
    if(this.anketId != null){
      this.SoruGetir(this.anketId);
    }
  }
  SoruGetir(anketId:string) {
    this.apiServis.SoruListeleByAnketId(anketId).subscribe(d => {
      this.sorular = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  SoruEkle() {
    var yeniSoru: Soru = new Soru();
    yeniSoru.soruAnketId = this.anketId;
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
        this.apiServis.SoruEkle(d).subscribe(s => {
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
      height: "250px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = soru.soru + " Sorui Silinecektir Onaylıyor musunuz?";
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

  Filterele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
