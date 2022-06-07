import { Component, OnInit } from '@angular/core';
import { HttpService } from  './../http.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {


  customers: any;
  commodities: any;
  selectedCustomer: any;
  selectedComodity: any;
  cooperationDiscount: number;
  quantityDiscount: number;
  totalPrice: number;
  priceReduction: number;
  basePrice:number;

  quantity = new FormControl('',
  [
    Validators.required,
    Validators.pattern('^[1-9]+[0-9]*$')
  ]
);

  constructor(private httpService:HttpService) {
    this.selectedCustomer={};
    this.selectedComodity={};
    this.quantity.setValue(0);
    this.cooperationDiscount=0;
    this.quantityDiscount=0;
    this.priceReduction=0;
    this.totalPrice=0;
    this.basePrice=0;
    this.customers=[];
    this.commodities=[];
    this.getCustomers();
    this.getCommodities();
  }

  onChange(): void{
    if(this.quantity.valid){
    this.cooperationDiscountCalc();
    this.quantityDiscountCalc();
    this.totalPriceCalc();
  }else{
    this.cooperationDiscount=0;
    this.totalPrice=0;
    this.priceReduction=0;
    this.basePrice=0;
    this.quantityDiscount=0;
  }
  }

  totalPriceCalc():void{
    this.totalPrice= parseInt(this.quantity.value) * (this.selectedComodity.price) * (100 - this.cooperationDiscount - this.quantityDiscount) /100;
    this.priceReduction=  parseInt(this.quantity.value) * (this.selectedComodity.price) * (this.cooperationDiscount + this.quantityDiscount) /100;
    this.basePrice=parseInt(this.quantity.value)*(this.selectedComodity.price);
  }

  quantityDiscountCalc(): void{
    if(this.quantity.value >= this.selectedComodity.quantity){
      this.quantityDiscount= this.selectedComodity.discount;
    }else{
      this.quantityDiscount=0;
    }
  }

  cooperationDiscountCalc(): void{
    let noDiscount = true;
    for (let index = 0; index < this.selectedCustomer.discount.length; index++) {
      if(this.selectedCustomer.discount[index].commodityId == this.selectedComodity.id){
        this.cooperationDiscount=parseInt(this.selectedCustomer.discount[index].percentage);
        noDiscount=false;
      }
    }
    if(noDiscount){
      this.cooperationDiscount=0;
    }
  }

  ngOnInit(): void {
  }

  getCustomers(): any{
   this.httpService.getRequest('http://localhost:3000/customers')
   .subscribe((response)=>{
     this.customers = response;

     this.selectedCustomer=this.customers[0];
   })
  }

  getCommodities(): any{
   this.httpService.getRequest('http://localhost:3004/commodity')
   .subscribe((response)=>{
     this.commodities = response;

     this.selectedComodity=this.commodities[0];
   })
  }

}
