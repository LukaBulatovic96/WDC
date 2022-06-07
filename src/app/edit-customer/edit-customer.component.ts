import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from  './../http.service';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

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

  constructor(
    private httpService:HttpService,
    public dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
    this.name.setValue(this.data.name)
    this.surname.setValue(this.data.surname)
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close('');
  }

  editCustomer(): any{
    let customer ={
      name: this.name.value,
      surname: this.surname.value,
      //uzimam iz data da ne bi izgubio podatke
      id: this.data.id,
      discount: this.data.discount,
    }
   this.httpService.updateRequest('http://localhost:3000/customers/'+customer.id, customer)
   .subscribe((response)=>{
   })
   this.closeDialog();
  }


}
