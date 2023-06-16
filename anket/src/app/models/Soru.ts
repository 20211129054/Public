import { Anket } from "./Anket";
import { Secenek } from "./Secenek";
import { Uye } from "./Uye";

export class Soru {
    soruId: string;
    soru: string;
    soruAnketId: string;
    soruSecenekSayisi: number;
    anketBilgi: Anket
    secenekler:Secenek[]

}