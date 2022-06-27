import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from 'src/app/service/payment.service';
import { Payment } from '../payment/payment';

@Component({
  selector: 'app-example-dialog',
  templateUrl: 'sale-dialog.component.html',
})
export class SaleDialogComponent {
  payments: Payment[] = [];

  constructor(
    public dialogRef: MatDialogRef<SaleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paymentService: PaymentService) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listPayment();
  }

  listPayment() {
    this.paymentService.findAll().subscribe((response) => {
      console.log(response + "ENTREI NO PAGAMENTO");
      this.payments = response;
    });
  }
}