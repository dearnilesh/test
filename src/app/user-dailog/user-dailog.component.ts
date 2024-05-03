import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiData } from '../user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-user-dailog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    ApiService
  ],

  templateUrl: './user-dailog.component.html',
  styleUrl: './user-dailog.component.css'
})
export class UserDailogComponent implements OnInit {
  user: any
  users: ApiData[] = [];
  constructor(private apiService: ApiService,
    public dialogRef: MatDialogRef<UserDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApiData
  ) { }

  ngOnInit() {
    this.user = this.data;
  }
  onSave() {
    this.dialogRef.close(this.user);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
