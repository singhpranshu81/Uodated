import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {
  userId= JSON.parse(localStorage.getItem('user') || '{}').customerId;
  dummyOrder = {
    orderId: this.userId,
    orderDate: new Date().toISOString(),
    orderStatus: 'Success',
    cart: {
      cartId: this.userId
    }
  };  
  carty: any = {};
   
  constructor(private cartService:CartService,private orderService:OrderService,private pdfService:PdfService,private router:Router) { } 
 totalPrice = localStorage.getItem('totalPrice');
 userName = JSON.parse(localStorage.getItem('user') || '{}').fullName;

 emailId= JSON.parse(localStorage.getItem('user') || '{}').email;
  ngOnInit(): void {
    this.cartService.getCartbyId(this.userId).subscribe( //change here user.id
      (data: any) => {
        this.carty = data;
        console.log(this.carty); 
      },
      (error) => {
        console.error('Error fetching cart:', error); 
      }
    );

    this.orderService.updateOrder(this.dummyOrder).subscribe( 
      (data: any) => {
        console.log('Order updated:', data); 
      },
      (error) => {
        console.error('Error updating order:', error); 
      }
    );
  } 
  download(){
         
       this.pdfService.generatePdf(this.carty,this.userName,this.totalPrice);
  }

  email(){
    
    emailjs.send('service_3ccghdr', 'template_hfzwem2', {
      date: new Date().toISOString(),
      name:this.userName,
      price:this.totalPrice,
     email:this.emailId
    },{
      publicKey: 'l_8NkYnlAjt3gNZ0h'
    }).then((response)=> {
      
      console.log('SUCCESS!', response.status, response.text);
      window.alert("Order sent successfully...")
      this.router.navigate(['/dashboard']);
    });
  }

}
