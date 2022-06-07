import { Component, OnInit } from '@angular/core';
import { HttpService } from  './../http.service';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { NewCustomerComponent} from './../new-customer/new-customer.component'
import { EditCustomerComponent} from './../edit-customer/edit-customer.component'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: any;
  allCustomers: any;
  filterText: String;


  constructor(private httpService:HttpService, private newCustomerDialogRef: MatDialog,private editCustomerDialogRef: MatDialog) {
     this.allCustomers=[];
     this.getCustomers();
     this.filterText='';
   }

  ngOnInit(): void {

  }

  openNewCustomerDialog(){
    const matDialogRefNew = this.newCustomerDialogRef.open(
      NewCustomerComponent,
      {
        data:this.allCustomers.length
      }
    );
    matDialogRefNew.afterClosed().subscribe(result => {
      this.getCustomers();
      this.filterText='';
    });
  }

  openEditCustomerDialog(customerToEdit:any){
    const matDialogRefEdit = this.editCustomerDialogRef.open(
      EditCustomerComponent,
      {
        data:customerToEdit
      }
    );
     matDialogRefEdit.afterClosed().subscribe(result => {
      this.getCustomers();
      this.filterText='';
    });
  }

  updateCustomersList(): void{
    this.customers=[];
    for (let index = 0; index < this.allCustomers.length; index++) {
      //alternativno startsWith umesto includes...
      if(this.allCustomers[index].name.toLowerCase().includes(this.filterText.toLowerCase())){
        this.customers.push(this.allCustomers[index]);
      }
    }
  }

  getCustomers(): any{
   this.httpService.getRequest('http://localhost:3000/customers')
   .subscribe((response)=>{
     this.allCustomers = response;
     this.customers=this.allCustomers;
   })
  }

}
