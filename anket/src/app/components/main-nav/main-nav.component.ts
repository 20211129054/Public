import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
uyeMail:string;
isAdmin:boolean;
uyeRol:string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis: ApiService
    ) {}

    ngOnInit (): void {
      if (this.apiServis.oturumKontrol){
      this.uyeMail = localStorage.getItem("uyeMail");
      // localStorage.getItem("uyeYetkileri").;
      }}

      OturumKapat(){ 
      localStorage.clear();
      location.href="/"}


}
