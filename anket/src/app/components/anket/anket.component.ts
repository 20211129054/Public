import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Anket } from 'src/app/models/Anket';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { AnketDialogComponent } from '../dialogs/anket-dialog/anket-dialog.component';

@Component({
  selector: 'app-anket',
  templateUrl: './anket.component.html',
  styleUrls: ['./anket.component.css']
})
export class AnketComponent implements OnInit {
  anketler: Anket[];
  uyeId:string;
  dataSource: any;
  displayedColumns = ['anketAdi', 'anketSoruSayisi', 'islemler'];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<AnketDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.uyeId = localStorage.getItem("uyeId");
    if(this.uyeId != null){
      this.AnketGetir(this.uyeId);
    }
  }
  AnketGetir(uyeId:string) {
    this.apiServis.AnketListeleByUyeId(uyeId).subscribe(d => {
      this.anketler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  AnketEkle() {
    var yeniAnket: Anket = new Anket();
    yeniAnket.anketUyeId = this.uyeId;
    this.dialogRef = this.matDialog.open(AnketDialogComponent, {
      width: "400px",      height: "350px",
      data: {
        islem: 'ekle',
        anket: yeniAnket
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.AnketEkle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AnketGetir(this.uyeId);
          }
        });
      }
    });
  }
  AnketDuzenle(anket: Anket) {
    this.dialogRef = this.matDialog.open(AnketDialogComponent, {
      width: "400px",
      data: {
        islem: 'duzenle',
        anket: anket
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        anket.anketAdi = d.anketAdi;
        this.apiServis.AnketDuzenle(anket).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AnketGetir(this.uyeId);
          }
        });
      }
    });

  }
  AnketSil(anket: Anket) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px",
      height: "250px",
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = anket.anketAdi + " Anketi Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.AnketSil(anket.anketId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AnketGetir(this.uyeId);
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
