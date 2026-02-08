import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voyelles'
})
export class VoyellesPipe implements PipeTransform {

  transform(ch: string) {
    let tab: any = ["a", "e", "i", "u", "o", "y"];
    let result: string = "";
    for (let i = 0; i < ch.length; i++) {
      let inter = ch[i];
      for (let j = 0; j < tab.length; j++) {
        if (tab[j] == inter) {
          inter = "*";
          break;
        }
      }
      result += inter;
    }
    return result;
  }

}
