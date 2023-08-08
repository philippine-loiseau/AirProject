import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent {

  protected deliveryForm!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<AddPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.deliveryForm = this._formBuilder.group({
      store: ['', Validators.required],
      customer: ['', Validators.required],
      product: ['', Validators.required],
      drone: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onCancel(): void {
    this._dialogRef.close();
  }

  onSubmit(): void {
    if (this.deliveryForm.valid) {
      const formData = this.deliveryForm.value;
      this._dialogRef.close(formData);
    }
  }
}
