import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiData, Users } from '../user';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

const matModule = [
  MatTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatError

]
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    matModule,


  ],
  providers: [
    ApiService
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  myForm!: FormGroup;
  dataAll: Users[] = []
  iddata: number = 0;
  constructor(private apiService: ApiService,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users
  ) {

  }

  ngOnInit() {
    this.myForm = new FormGroup({
      id: new FormControl(Number),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      number: new FormControl('', [Validators.required])
    });


    debugger
    if (Array.isArray(this.data)) {
      // Iterate over dataAll as an array
      for (const item of this.data) {
        console.log(item, "item");
        this.iddata = item.id
      }
      console.log(this.iddata, "iddata")

    } else if (typeof this.data === 'object') {
      for (const key in this.data) {
      }
    } else {
      console.error('dataAll is not iterable');
    }
  }


  users: Users[] = []
  onNoClick() {
this.dialogRef.close()
  }

  generateId() {
    this.iddata += 1;
    return this.iddata;
  }



  onSubmit() {


    if (this.myForm.valid) {

      const generatedId = this.generateId(); // Call the function
      console.log(generatedId, "generatedId")
      this.myForm.controls['id'].setValue(generatedId);
      console.log(this.myForm.value); // Now includes generated ID
      this.apiService.newdataPost(this.myForm.value)
        .subscribe((res: any) => {
          if (res.name == null && undefined) {
            this.dialogRef.close()
          }
          console.log(res, "new data")
        })
    }
  }
}
