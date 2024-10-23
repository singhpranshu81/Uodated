import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/entity/Order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  userId= JSON.parse(localStorage.getItem('user') || '{}').customerId;
  dummyOrder = {
    orderId: this.userId,
    orderDate: new Date(),
    orderStatus: 'Pending',
    cart: {
      cartId: this.userId,
    }
  };  
  carty: any = {};
   
  constructor(private cartService:CartService,private orderService:OrderService,private router:Router) { } 
 totalPrice = localStorage.getItem('totalPrice');
 userName = JSON.parse(localStorage.getItem('user') || '{}').fullName;
 
  ngOnInit(): void {
    console.log("order "+this.userId);
    
    this.cartService.getCartbyId(this.userId).subscribe( 
      (data: any) => {
        this.carty = data;
        console.log(this.carty); 
      },
      (error) => {
        console.error('Error fetching cart:', error); 
      }
    );
    console.log("Order details:", JSON.stringify(this.dummyOrder, null, 2));
     
    this.orderService.createOrder(this.dummyOrder).subscribe( 
      (data: any) => {
        console.log('Order created:', data); 
      },
      (error) => {
        console.error('Error creating order:', error); 
      }
    );
  } 
  
  makePayment(){
  
    this.router.navigate(['/payment']);
    console.log('Payment made successfully  for order:', this.dummyOrder);
  }
}
