import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
 
  generatePdf(cart: any, userName: any, totalPrice: any) {
    const doc = new jsPDF();
    
    const cartsArray = Array.isArray(cart.food) ? cart.food : [cart];
    console.log(cart);
     
    const foodData = cartsArray.map(
      (food: {
        foodName: any;
        orderdQuantity: any;
        price: any;
      }) => [
        food.foodName,
        food.orderdQuantity,
        food.price,
        food.orderdQuantity * food.price,
      ]
    );

    doc.text(`Hey ${userName} !! Thanks For Ordering ❤️`, 10, 10);
    const table = autoTable(doc, {
      startY: 20,
      head: [['Food Name', 'Ordered Quantity', 'Price/item', 'Total Price']],
      body: foodData,
    });
    
    const pdfOutput = doc.output('blob');
    saveAs(pdfOutput, 'ticket-details.pdf');
  }
}
