import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentForm: FormGroup;
    showCardPayment = false;
    paymentSuccessMessage: string = '';

    constructor(private fb: FormBuilder,private router:Router) {
        // Initialize the payment form with validation rules
        this.paymentForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
            expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
            cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
            cardholderName: ['', Validators.required],
            country: ['', Validators.required],
        });
    }

    ngOnInit(): void {}

    toggleCardPayment() {
        this.showCardPayment = !this.showCardPayment;
    }
    email:string | undefined= JSON.parse(localStorage.getItem('user') || '{}').email;
otp:number | undefined;
    processApplePay() {
        this.otp=Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem('otp',this.otp.toString());
        emailjs.send('service_3ccghdr', 'template_8cw6nm9', {
          OTP: this.otp,
         email:this.email
        },{
          publicKey: 'l_8NkYnlAjt3gNZ0h'
        }).then((response)=> {
          
          console.log('SUCCESS!', response.status, response.text);
          window.alert("Otp sent successfully...")
        });

        this.router.navigate(['/otp']);
    }

    processCardPayment() {
        this.otp=Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem('otp',this.otp.toString());
        emailjs.send('service_3ccghdr', 'template_8cw6nm9', {
          OTP: this.otp,
         email:this.email
        },{
          publicKey: 'l_8NkYnlAjt3gNZ0h'
        }).then((response)=> {
          
          console.log('SUCCESS!', response.status, response.text);
          window.alert("Otp sent successfully...")
        });

        this.router.navigate(['/otp']);
        // Check if the form is valid before processing card payment
        // if (this.paymentForm.valid) {
        //     const { cardholderName, cardNumber, expiryDate, email } = this.paymentForm.value;
        //     this.paymentSuccessMessage = `Payment successful via Card! 
        //     Cardholder: ${cardholderName}, 
        //     Card Number: **** **** **** ${cardNumber.slice(-4)}, 
        //     Expiry Date: ${expiryDate}, 
        //     Email: ${email}`;
        //     this.displaySuccessMessage(this.paymentSuccessMessage);
        // } else {
        //     alert('Please correct the errors in the form.');
        // }
    }

    displaySuccessMessage(message: string) {
        console.log(message); // Log the message to the console
        alert(message); // Display the message using an alert
    }

    // Card type detection methods
    isDiscover(): boolean {
        const cardNumber = this.paymentForm.get('cardNumber')?.value;
        return cardNumber.startsWith('6011') || 
               cardNumber.startsWith('622') || 
               cardNumber.startsWith('64') || 
               cardNumber.startsWith('65');
    }

    isVisa(): boolean {
        const cardNumber = this.paymentForm.get('cardNumber')?.value;
        return cardNumber.startsWith('4');
    }

    isMasterCard(): boolean {
        const cardNumber = this.paymentForm.get('cardNumber')?.value;
        return cardNumber.startsWith('5');
    }

    isAmex(): boolean {
        const cardNumber = this.paymentForm.get('cardNumber')?.value;
        return cardNumber.startsWith('34') || cardNumber.startsWith('37');
    }

    formatCardNumber() {
        const cardNumber = this.paymentForm.get('cardNumber')?.value.replace(/\D/g, '').match(/.{1,4}/g);
        this.paymentForm.get('cardNumber')?.setValue(cardNumber ? cardNumber.join(' ') : '');
    }

    formatExpiryDate() {
        const expiryDate = this.paymentForm.get('expiryDate')?.value.replace(/\D/g, '');
        if (expiryDate.length >= 2) {
            this.paymentForm.get('expiryDate')?.setValue(`${expiryDate.slice(0, 2)}/${expiryDate.slice(2)}`);
        }
    }
}
