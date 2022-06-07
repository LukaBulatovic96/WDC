import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from  './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'WDC';

  constructor(private router: Router,private httpService:HttpService){

  }

  goToRoute(route: string='/customer'): void {
    this.router.navigateByUrl(route).then(()=>{
      console.log(this.router.url);
    });
  }


}
