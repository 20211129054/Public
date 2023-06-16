import { Anket } from "./Anket";
import { Soru } from "./Soru";
import { Uye } from "./Uye";

export class Secenek {
    secenekId: string;
    secenek: string;
    secenekSoruId: string;
    secenekSayisi: number;
    soruBilgi: Soru;
    secCevap:boolean;
    cevapSayisi:number;
}