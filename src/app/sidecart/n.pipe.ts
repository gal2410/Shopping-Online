import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args)
     return value;
    return value.filter(
      waffle => waffle.title.toLowerCase().indexOf(args.toLowerCase()) > -1
   );
  }
}