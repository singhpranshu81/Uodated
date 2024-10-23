import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/entity/Food';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isDisable: boolean =false;
   isAdmin: boolean =false;
   cart_id:number=0;
searchQuery: any='';

  
  dummyfood: Food = {
    foodId: 0,
    foodName: '',
    orderdQuantity:0,
    isDisable:false,
    quantity: 0,
    price: 0,
    description:'',
    url:'',
    category: {
      categoryId: 0,
      categoryName: '',
    },
    cart: {
      cartId: 0,
    },
  };
 

  food: any[] = []; //hold all food
  categoryfoodarray: any={}; 
  khojo:string='';
  name:string='';
  
  constructor(private foodService: FoodService,private categoryService:CategoryService, private router: Router) {}
   
  category:any=[]

   

  ngOnInit(): void {
     this.categoryService.getAllCategory().subscribe((data)=>{
      this.category=data;
     })

    this.foodService.getAllFood().subscribe((data) => {
      this.food = data; // Store the list of all food
    });  
     


    const currentUserRole = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).role;

   const currentUserId= JSON.parse(
      localStorage.getItem('user') || '{}'
    ).customerId;
    this.cart_id=currentUserId;
    const currentUserName=JSON.parse(
      localStorage.getItem('user') || '{}'
    ).fullName;

    this.name=currentUserName;
    if(currentUserRole === 'Admin'){
      this.isAdmin=true;
    }
    console.log(this.isAdmin);
  }
  addToCart(food: any) {
    console.log( this.cart_id);
    this.dummyfood.foodId = food.foodId;
    this.dummyfood.foodName = food.foodName;
    this.dummyfood.price = food.price;
    this.dummyfood.description = food.description;
    this.dummyfood.url = food.url;
    this.dummyfood.orderdQuantity =food.orderdQuantity
    this.dummyfood.quantity = food.quantity;
    this.dummyfood.category = food.category;
    this.dummyfood.cart.cartId = this.cart_id;
    console.log(this.dummyfood);
    //  console.log(this.dummyfood.foodId)
    //  debugger;
    // food.cart.cartId = 1;
    this.foodService.updateFood(this.dummyfood).subscribe((data) => {
      // Update the food item
      console.log("assdsdeee"+data); // Log the response
    });
    this.router.navigate(['/cart']);
  }
  deleteFood(id: any) {
          if (window.confirm('Are you sure you want to delete this food item?')) {
            this.foodService.deleteFood(id).subscribe(
              {
                next: (response) => {
                  console.log("Food deleted..", response);
                  this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                  console.error("Error deleting food...", error);
                },
              }
            );
          }
  }
  goToYourOrders(){
    this.router.navigate(['/yourorders'])
  }
  goToAddFood(){
    this.router.navigate(['/addfood'])
  }
  currentFilter: string = 'all';
  
  foodbyCat: any = {};  //store the category food

  disable:Food = {
    foodId: 0,
    foodName: '',
    orderdQuantity:0,
    isDisable:false,
    quantity: 0,
    price: 0,
    description:'',
    url:'',
    category: {
      categoryId: 0,
      categoryName: '',
    },
    cart: {
      cartId: 0,
    },
  };


  
  disableFood(food: any){
    //  this.isDisable=!this.isDisable;
    if(food.isDisable == true){
      this.disable.isDisable =false;
    }
    else{
      this.disable.isDisable =true;
    }
    // this.disable.isDisable= !this.disable.isDisable;
     this.disable.foodId= food.foodId;
     this.disable.foodName= food.foodName;
     this.disable.orderdQuantity= food.orderdQuantity;
     this.disable.quantity= food.quantity;
     this.disable.price= food.price;
     this.disable.description= food.description;
     this.disable.url= food.url;
     this.disable.category.categoryId= food.category.categoryId;
     this.disable.category.categoryName= food.category.categoryName;
    //  if(food.foodId===1)
    //   this.disable.cart.cartId= food.cart.cartId;
    //   else
     this.disable.cart.cartId= food.cart.cartId;
         this.foodService.updateFood(this.disable).subscribe(
          (data) => {
            window.alert("isDisable Updated...")
            console.log("updated"+data); // Log the response
          }
         )
  }
  getTheStatus(food:any):boolean{
    console.log(food.isDisable);
    
    return food.isDisable;
  }
  goToUpdateProfile(){
    this.router.navigate(['/updateprofile'])
  }
  getNameofCat(id:number){
    let name='';
    for(let i=0;i<this.category.length;i++){
      if(this.category[i].categoryId===id){
        name=this.category[i].categoryName;
        break;
      }
    }
    return name
  }
  goToReview(){
    this.router.navigate(['/review'])
  }
  searchIDFromCategory(categoryName: any): number {
    let categoryID = 0;
    for (let i = 0; i < this.category.length; i++) {
      if (this.category[i].categoryName === categoryName) {
        categoryID = this.category[i].categoryId;
        break;
      }
    }
    return categoryID;
  }

  goToAddCuisine(){
       this.router.navigate(['/addcuisine'])
  }
goToDeleteCuisine(){
  this.router.navigate(['/deletecuisine'])
}


  isClose : boolean=false
  toggleNav(): void {
    this.isClose = !this.isClose; // Toggle the sidebar state
    const sidenav = document.getElementById("mySidenav");
    const mainContent = document.getElementById("main");
 
    if (this.isClose) {
      // Open the sidenav
      if (sidenav && mainContent) {
        sidenav.style.width = "175px"; // Open the sidenav
        mainContent.style.marginLeft = "200px"; // Shift main content
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)"; // Change background
      }
    } else {
      // Close the sidenav
      if (sidenav && mainContent) {
        sidenav.style.width = "0"; // Close the sidenav
        mainContent.style.marginLeft = "0"; // Reset main content margin
        document.body.style.backgroundColor = "white"; // Reset background color
      }
    }
  }
}
