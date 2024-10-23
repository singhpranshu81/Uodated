import { Component } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  name:string='';
  email:string='';
  message:string='';
  sendEmail(){
  emailjs.send('service_z94zs9i', 'template_k4m9smn', {
    message: this.message,
   email:this.email,
   name:this.name
  },{
    publicKey: 'M9HKel3zQOiiyqOpt'
  }).then((response)=> {
    this.name=''
    this.email=''
    this.message=''
    console.log('SUCCESS!', response.status, response.text);
    window.alert("Thanks for Contacting...")
  });
}
}
