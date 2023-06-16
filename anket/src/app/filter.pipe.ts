import { Pipe, PipeTransform } from "@angular/core";
import { Secenek } from "./models/Secenek";

@Pipe({
    name:"filterId"
})

export class FilterPipe implements PipeTransform {
    transform(anketSoruSecenekler: Secenek[], filterId: string) {

        if (anketSoruSecenekler.length === 0 || filterId === "") {
            return anketSoruSecenekler;
        }
        else {
            return anketSoruSecenekler.filter(x => x.secenekSoruId == filterId);
        }
    }
}
