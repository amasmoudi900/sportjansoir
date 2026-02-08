import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamFilter'
})
export class TeamFilterPipe implements PipeTransform {

  transform(tab: any, val: string) {
    if (!val) {
      return tab;
    }

    return tab.filter((elt: any) => {
      return elt.teamOne.toLowerCase().includes(val.toLowerCase()) ||
        elt.teamTwo.toLowerCase().includes(val.toLowerCase())
    })
  }

}
