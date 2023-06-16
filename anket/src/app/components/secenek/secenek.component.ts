import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Secenek } from 'src/app/models/Secenek';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { SecenekDialogComponent } from '../dialogs/secenek-dialog/secenek-dialog.component';

@Component({
  selector: 'app-secenek',
  templateUrl: './secenek.component.html',
  styleUrls: ['./secenek.component.css']
})
export class SecenekComponent implements OnInit {
  secenekler: Secenek[];
  uyeId:string;
  soruId:string;
  dataSource: any;
  displayedColumns = ['secenek', 'secenekSecenekSayisi', 'islemler'];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<SecenekDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.soruId = localStorage.getItem("soruId");
    if(this.soruId != null){
      this.SecenekGetir(this.soruId);
    }
  }
  SecenekGetir(soruId:string) {
    this.apiServis.SecenekListeleBySoruId(soruId).subscribe(d => {
      this.secenekler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  SecenekEkle() {
    var yeniSecenek: Secenek = new Secenek();
    yeniSecenek.secenekSoruId = this.soruId;
    this.dialogRef = this.matDialog.open(SecenekDialogComponent, {
      width: "400px",
      data: {
        islem: 'ekle',
        secenek: yeniSecenek
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.SecenekEkle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SecenekGetir(this.soruId);
          }
        });
      }
    });
  }
  SecenekDuzenle(secenek: Secenek) {
    this.dialogRef = this.matDialog.open(SecenekDialogComponent, {
      width: "400px",
      data: {
        islem: 'duzenle',
        secenek: secenek
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        secenek.secenek = d.secenek;
        this.apiServis.SecenekDuzenle(secenek).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SecenekGetir(this.soruId);
          }
        });
      }
    });

  }
  SecenekSil(secenek: Secenek) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px",
      height: "250px",
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = secenek.secenek + " Seceneki Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.SecenekSil(secenek.secenekId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SecenekGetir(this.soruId);
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
