import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from  './../http.service';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {



  name = new FormControl('',
  [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z]+$')
  ]
);
  surname = new FormControl('',
  [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z]+$')
  ]
);

  // id = new FormControl('');
  id: any;
  constructor(
    private httpService:HttpService,
    public dialogRef: MatDialogRef<NewCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
    this.id = this.data;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close('');
  }

  addCustomer(): any{
    let customer ={
      name: this.name.value,
      surname: this.surname.value,
      id: parseInt(this.id)+1,
      //popunjavam prazan discount da ne bi doslo do greske prilikom selektovanja
      discount: []
    }
   this.httpService.postRequest('http://localhost:3000/customers', customer)
   .subscribe((response)=>{
   })
   this.closeDialog();
  }

}
