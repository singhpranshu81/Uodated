import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
xyz:number=0;

constructor(private router:Router) { }

otp:number=JSON.parse(localStorage.getItem('otp') || '{}')

  goToBill(){
          if(this.otp==this.xyz){
            this.router.navigate(['/bill']);
          }
          else{
            window.alert("Invalid OTP")
            this.router.navigate(['/payment']);
          }
  }
}
