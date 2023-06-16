import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anket } from '../models/Anket';
import { Uye } from '../models/Uye';
import { Sonuc } from '../models/Sonuc';
import { Soru } from '../models/Soru';
import { Secenek } from '../models/Secenek';
import { Cevap } from '../models/Cevap';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public apiUrl = "https://localhost:44346/";
  constructor(
    public http: HttpClient
  ) {
  }

  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "api/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else { return false; }
  }

  yetkiKontrol(yetkiler: string[]) {
    var sonuc: boolean = false;
    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));

    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
        } else {
          sonuc = false;
        }
      });
    }
    return sonuc;
  }

  IsAdmin() {
    var sonuc: boolean = false;
    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));

    if (uyeYetkiler) {
      uyeYetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          
          if (element === "Admin") {
            sonuc = true;
          }
          else {
            sonuc = false;
          }
        } 
        else {
          sonuc = false;
        }
      });
    }
    console.log(sonuc);
    return sonuc;
  }

  /* Üye API  */
  UyeListe() {
    return this.http.get<Uye[]>(this.apiUrl + "api/uyeliste");
  }
  UyeById(uyeId: string) {
    return this.http.get<Uye>(this.apiUrl + "api/uyebyid/" + uyeId);
  }
  UyeEkle(uye: Uye) {
    return this.http.post<Sonuc>(this.apiUrl + "api/uyeekle", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put<Sonuc>(this.apiUrl + "api/uyeduzenle", uye);
  }
  UyeSil(uyeId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "api/uyesil/" + uyeId);
  }
  /* Anket API  */
  AnketListe() {
    return this.http.get<Anket[]>(this.apiUrl + "api/anketliste");
  }
  AnketById(anketId: string) {
    return this.http.get<Anket>(this.apiUrl + "api/anketbyid/" + anketId);
  }
  AnketEkle(anket: Anket) {
    return this.http.post<Sonuc>(this.apiUrl + "api/anketekle", anket);
  }
  AnketDuzenle(anket: Anket) {
    return this.http.put<Sonuc>(this.apiUrl + "api/anketduzenle", anket);
  }
  AnketSil(anketId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "api/anketsil/" + anketId);
  }
  AnketListeleByUyeId(uyeId: string) {
    return this.http.get<Anket[]>(this.apiUrl + "api/anketlistelebyuyeid/" + uyeId);
  }
  /* Soru API  */
  SoruListe() {
    return this.http.get<Soru[]>(this.apiUrl + "api/soruliste");
  }
  SoruById(soruId: string) {
    return this.http.get<Soru>(this.apiUrl + "api/sorubyid/" + soruId);
  }
  SoruEkle(soru: Soru) {
    return this.http.post<Sonuc>(this.apiUrl + "api/soruekle", soru);
  }
  SoruDuzenle(soru: Soru) {
    return this.http.put<Sonuc>(this.apiUrl + "api/soruduzenle", soru);
  }
  SoruSil(soruId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "api/sorusil/" + soruId);
  }
  SoruListeleByAnketId(anketId: string) {
    return this.http.get<Soru[]>(this.apiUrl + "api/sorulistelebyanketid/" + anketId);
  }
  /* Seçenek API  */
  SecenekListe() {
    return this.http.get<Secenek[]>(this.apiUrl + "api/secenekliste");
  }
  SecenekById(secenekId: string) {
    return this.http.get<Soru>(this.apiUrl + "api/secenekbyid/" + secenekId);
  }
  SecenekEkle(secenek: Secenek) {
    return this.http.post<Sonuc>(this.apiUrl + "api/secenekekle", secenek);
  }
  SecenekDuzenle(secenek: Secenek) {
    return this.http.put<Sonuc>(this.apiUrl + "api/secenekduzenle", secenek);
  }
  SecenekSil(secenekId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "api/seceneksil/" + secenekId);
  }
  SecenekListeleBySoruId(soruId: string) {
    return this.http.get<Secenek[]>(this.apiUrl + "api/seceneklistelebysoruid/" + soruId);
  }

  CevapEkle(cevap: Cevap) {
    return this.http.post<Sonuc>(this.apiUrl + "api/cevapekle", cevap);
  }
  CevapGoruntule(secenekId: string) {
    return this.http.get<Cevap[]>(this.apiUrl + "api/cevapekle/cevapgoruntule" + secenekId);
  }




}
