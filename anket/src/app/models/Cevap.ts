import { Anket } from "./Anket";
import { Uye } from "./Uye";

export class Cevap {
    cevapId: string;
    cevapSecenek: string;
    cevapSecenekId: string;
    cevapUyeId: string;
    cevapSecenekSayisi: number;
    anketBilgi: Anket;
    cevaplamaZamani: Date;

}