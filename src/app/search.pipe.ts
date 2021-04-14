import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchTerm: string, select: string): any[] {

    
    
    if(!searchTerm){
      
      return products;
    }
    
    else {
      console.log("else in bookname"+products)
      console.log("the select is ",select)
      console.log("the searchterm is ",searchTerm)
      if(select=="All"){
        let booktitle=products.filter(obj=>obj.bookname.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
        let category= products.filter(obj=>obj.category.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
        let author=products.filter(obj=>obj.author.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
        if(category.length!==0){
          return category;
        }
        else if(booktitle.length!==0){
          return booktitle;
        }
        else{
          return author;
        }
        
      }
     else if(select=="Bookname"){
       // let data=products.filter(obj=>obj.bookname==searchTerm )
        let data=products.filter(obj=>obj.bookname.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);

        console.log(data)
        if(data.length!==0){
          return data;
        }
        else{
          alert("No match found for your search");
        }
      }
      else if(select=="Category"){
      //  let data= products.filter(obj=>obj.category==(searchTerm))
      let data=products.filter(obj=>obj.category.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);

        console.log(data)
        if(data.length!==0){
          return data;
        }
        else{
          alert("No match found for your search");
        }
      }
     else if(select=="Author"){
        let data= products.filter(obj=>obj.author.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1)
        if(data.length!==0){
          return data;
        }
        else{
          alert("No match found for your search");
        }
      }
      
     /* else{
        let data= dataArray.filter(obj=>obj.title.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1)
        if(data.length!==0){
          return data;
        }
        else{
          alert("No match found for your search");
        }
      }*/

      }
      
    
  
  }


}
