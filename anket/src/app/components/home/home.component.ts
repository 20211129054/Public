import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public apiServis:ApiService,
    public alert: AlertService
  ) { }

  ngOnInit() {
  }
  OturumAc(mail: string, parola: string) {
    
    this.apiServis.tokenAl(mail, parola).subscribe((d:any)=>{
      console.log(d);
      localStorage.setItem("token", d.access_token); 
      localStorage.setItem("uyeId", d.uyeId);
      localStorage.setItem("uyeMail", d.uyeMail);
      localStorage.setItem("uyeYetkileri", d.uyeYetkileri); 
      location.href="/";
    }, err =>{
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Kullanıcı Adı veya Parola Geçersizdir!"; 
      this.alert.AlertUygula(s);
    });
    
  }
}
