import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { Secenek } from 'src/app/models/Secenek';
import { MatTableDataSource } from '@angular/material/table';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { SecenekDialogComponent } from '../dialogs/secenek-dialog/secenek-dialog.component';

@Component({
  selector: 'app-seceneklistele',
  templateUrl: './seceneklistele.component.html',
  styleUrls: ['./seceneklistele.component.css']
})
export class SeceneklisteleComponent implements OnInit {
  secSoru: Soru;
  soruId: string;
  secenekId: string = "";
  secenekler: Secenek[];
  dataSource: any;
  displayedColumns = ['secenek', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<SecenekDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: AlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p) {
        this.soruId = p.soruId;
        this.SoruGetir();
        this.SecenekGetir(this.soruId);
      }
    });
  }
  SecenekGetir(soruId:string) {
    this.apiServis.SecenekListeleBySoruId(soruId).subscribe(d => {
      this.secenekler = d;
      console.log(d);
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  SoruGetir() {
    this.apiServis.SoruById(this.soruId).subscribe(d => {
      this.secSoru = d;
    });
  }

  SecenekSec(d: string) {
    this.secenekId = d;
  }
  Kaydet() {
    var yeniSecenek: Secenek = new Secenek();
    this.dialogRef = this.matDialog.open(SecenekDialogComponent, {
      width: "400px",
      height: "250px",
      data: {
        islem: 'ekle',
        secenek: yeniSecenek
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        yeniSecenek.secenek = d.secenek;
        yeniSecenek.secenekSoruId = this.soruId;
        this.apiServis.SecenekEkle(yeniSecenek).subscribe(s => {
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
      height: "250px",
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
    this.confirmDialogRef.componentInstance.dialogMesaj = secenek.secenek + " Secenek Kaydı Silinecektir Onaylıyor musunuz?";
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
  
}
