import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/entity/Food';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
orderd:number=0;
getTotalPrice() {
return this.cart.food ? this.cart.food.reduce((total: number, foodItem: { price: number; orderdQuantity: number; }) => {
  return total + (foodItem.price * foodItem.orderdQuantity);
}, 0) : 0;
}
storeTotalPriceInLocalStorage() {
  const totalPrice = this.getTotalPrice();
  localStorage.setItem('totalPrice', totalPrice.toString());
}
dummyfood: Food = {
  foodId: 0,
  foodName: '',
  description: '',
  price: 0,
  orderdQuantity:1,
  isDisable: false,
  quantity: 0,
  url: '',
  category: {
    categoryId: 0,
    categoryName: '',
  },
  cart: {
    cartId: 0,
  },
};
  cart: any = {};
  cart_id: number = 0;
  constructor(private foodService: FoodService, private cartService: CartService, private router: Router) {
    const currentUserId = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).customerId;
    this.cart_id = currentUserId;
  }
  ngOnInit(): void {
    console.log("cart"+this.cart_id);
    
    this.cartService.getCartbyId(this.cart_id).subscribe(  //change here user.id
      (data: any) => {
        this.cart = data;
        //console.log(this.cart); 
      },
      (error) => {
        console.error('Error fetching cart:', error); 
      }
    );
  }

  deleteItem(food:any){
    food.cart =0;
    this.foodService.updateFood(food).subscribe(
      (data: any) => {
       window.alert("Item removed successfully");
       this.router.navigate(['/cart']);
      }
    );
  }
  goToOrderDetails(){
    this.storeTotalPriceInLocalStorage();
      this.router.navigate(['/orderDetails']);
  }
  updateOrderQuantity(food: any, newQuantity: number) {
    this.dummyfood.foodId = food.foodId
    this.dummyfood.foodName = food.foodName
    this.dummyfood.orderdQuantity=newQuantity
    this.dummyfood.quantity=food.quantity-newQuantity
    this.dummyfood.isDisable=food.isDisable
    this.dummyfood.price=food.price
    this.dummyfood.description=food.description
    this.dummyfood.url=food.url
 
    this.dummyfood.category.categoryId=food.category.categoryId;
    this.dummyfood.category.categoryName=food.category.categoryName;
    this.dummyfood.cart.cartId=this.cart_id;

   
    
    
   this.foodService.updateFood(this.dummyfood).subscribe((data) => {
    window.alert("Quanity updated...")
    console.log("updated"+data); // Log the response
  });
  }
  increment(food: any) {
    this.dummyfood.foodId = food.foodId
    this.dummyfood.foodName = food.foodName
   
    this.dummyfood.isDisable=food.isDisable
    this.dummyfood.price=food.price
    this.dummyfood.description=food.description
    this.dummyfood.url=food.url
    console.log("lkk"+this.cart_id)
    this.dummyfood.category.categoryId=food.category.categoryId;
    this.dummyfood.category.categoryName=food.category.categoryName;
    this.dummyfood.cart.cartId=this.cart_id;

    if (food.quantity > food.orderdQuantity){
      food.orderdQuantity++;this.orderd++;}

      this.dummyfood.orderdQuantity= food.orderdQuantity
      this.dummyfood.quantity=food.quantity- food.orderdQuantity
 this.foodService.updateFood(this.dummyfood).subscribe((data) => {
    // window.alert("Quanity updated...")
    console.log("updated"+data); // Log the response
  });

  }
   
  decrement(food: any) {
    this.dummyfood.foodId = food.foodId
    this.dummyfood.foodName = food.foodName
   
    this.dummyfood.isDisable=food.isDisable
    this.dummyfood.price=food.price
    this.dummyfood.description=food.description
    this.dummyfood.url=food.url
 
    this.dummyfood.category.categoryId=food.category.categoryId;
    this.dummyfood.category.categoryName=food.category.categoryName;
    this.dummyfood.cart.cartId=this.cart_id;

    if (food.quantity > 0 && food.orderdQuantity > 0) {
      food.orderdQuantity--;this.orderd--;
    }

    this.dummyfood.orderdQuantity= food.orderdQuantity
    this.dummyfood.quantity=food.quantity- food.orderdQuantity
this.foodService.updateFood(this.dummyfood).subscribe((data) => {
  // window.alert("Quanity updated...")
  console.log("updated"+data); // Log the response
});
  }
  goTODash(){
    this.router.navigate(['/dashboard']);
  }
}
