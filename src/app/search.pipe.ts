import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(catcourses: any[], searchTerm:string): any[] {
    
    if(!searchTerm){
      return catcourses;
    }
    else{
      if(searchTerm=="category"){
        return catcourses.filter(obj=>obj.category.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
      }
  }

  }
}
