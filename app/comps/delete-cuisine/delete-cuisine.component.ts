import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/entity/Category';

@Component({
  selector: 'app-delete-cuisine',
  templateUrl: './delete-cuisine.component.html',
  styleUrls: ['./delete-cuisine.component.css']
})
export class DeleteCuisineComponent {
  dummyCat: Category ={
    categoryId:0,
    categoryName:'',
    
  }
  constructor(private router:Router,private categoryService:CategoryService){}

name:string='';
id:number=0;
  goToDash(){   
   // console.log(this.name);
    this.categoryService.getByName(this.name).subscribe(
      (data)=>{ 
        this.dummyCat=data;
        this.id=this.dummyCat.categoryId;
        this.categoryService.deleteCategory(this.id).subscribe(
          {
            next: (response) => {
              console.log('Category Deleted..', response);
              window.alert("Category Deleted Successfully....")
              this.router.navigate(['/dashboard']);
            },
            error: (error) => {
              console.error('Error Deleting Category...', error);
            },
          }
        )
      }
    )
    console.log(this.id);
   

  }
}
