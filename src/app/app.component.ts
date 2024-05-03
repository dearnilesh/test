import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiData } from './user';
import { UserDailogComponent } from './user-dailog/user-dailog.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
const matModule = [
  MatTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  HttpClientModule
]
@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    matModule
  ],
  providers: [
    ApiService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'test';
  users: ApiData[] = [];
  constructor(private dialog: MatDialog, private apiService: ApiService) {
    this.calldata()
  }
  displayedColumns: string[] = ['viewAddress', 'edit', 'id', 'name', 'username', 'email'];
  dataSource = new MatTableDataSource<ApiData>();
  ngOnInit() {
  }
  calldata() {
    this.apiService.getData().subscribe((res: any) => {
      this.dataSource.data = res;
      this.users = res;
    })
  }

  editUser(user: ApiData) {
    const dialogRef = this.dialog.open(UserDailogComponent, {
      width: '450px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.users.findIndex(u => u.id === user.id);
        this.users[index] = result;
        this.dataSource.data = this.users;
      }
    });
  }

  viewAddress(user: ApiData) {
    console.log('User address:', user.address);
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '450px',
      data: user.address
    });
  }
}
