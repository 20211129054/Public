import { Pipe, PipeTransform } from "@angular/core";
import { AnketSoruSecenek } from "./models/AnketSoruSecenek";

@Pipe({
    name:"filterId"
})

export class FilterPipe implements PipeTransform {
    transform(anketSoruSecenekler: AnketSoruSecenek[], filterId: string) {

        if (anketSoruSecenekler.length === 0 || filterId === "") {
            return anketSoruSecenekler;
        }
        else {
            return anketSoruSecenekler.filter(x => x.SoruId == filterId);
        }
    }
}
