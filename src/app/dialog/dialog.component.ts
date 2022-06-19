import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    });

    if (this.editData) {
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct(): void {
    if (this.productForm.valid) {
      this.api.addProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert('Product added successfully.');
          this.productForm.reset();
          this.dialogRef.close('Save');
        },
        error: (err) => {
          alert('An error occured while adding product.');
        },
      });
    }
  }

  updateProduct(): void {
    if (this.productForm.valid) {
      this.api
        .updateProduct(this.productForm.value, this.editData.id)
        .subscribe({
          next: (res) => {
            alert('Product updated successfully.');
            this.productForm.reset();
            this.dialogRef.close('Update');
          },
          error: (err) => {
            alert('An error occured while updating product.');
          },
        });
    }
  }
}
