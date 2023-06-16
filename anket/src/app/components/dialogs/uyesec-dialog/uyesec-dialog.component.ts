import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Uye } from 'src/app/models/Uye';

@Component({
  selector: 'app-uyesec-dialog',
  templateUrl: './uyesec-dialog.component.html',
  styleUrls: ['./uyesec-dialog.component.css']
})
export class UyesecDialogComponent implements OnInit {
  dataSource: any;
  uyeler: Uye[];
  displayedColumns = ['uyeNo', 'uyeAdsoyad', 'uyeDogTarih', 'uyeAnketSayisi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public dialogRef: MatDialogRef<UyesecDialogComponent>
  ) { }

  ngOnInit() {
    this.UyeGetir();
  }
  UyeGetir() {
    this.apiServis.UyeListe().subscribe(d => {
      this.uyeler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Filterele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Ekle(uye: Uye) {
    this.dialogRef.close(uye);
  }
}
