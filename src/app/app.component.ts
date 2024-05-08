import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiData, Users } from './user';
import { UserDailogComponent } from './user-dailog/user-dailog.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import { AddComponent } from './add/add.component';
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
  data:Users[]=[]

  datas :string ="neelesh"
   
  constructor(private dialog: MatDialog, private apiService: ApiService,private viewCaontainerRef :ViewContainerRef) {
    this.calldata()
  }
  displayedColumns: string[] = ['viewAddress', 'edit', 'id', 'name', 'username', 'email'];
  dataSource = new MatTableDataSource<ApiData>();
  ngOnInit() {
this.apiService.newdataGet().subscribe((res:any)=>{
  console.log(res,"new data")
  this.data =res
})
  }

//  async callComponent(){
//   debugger
//     // this.viewCaontainerRef.clear()
//     const { DemondLodingComponent} = await import('./demond-loding/demond-loding.component') 
//     this.viewCaontainerRef.createComponent(DemondLodingComponent)
//   }

  addData(){

    this.dialog.open(AddComponent,{
      width:"50%",
      height:'60%',
      data:this.data
    })
    debugger
    // this.apiService.newdataPost(this.data).subscribe((res:any)=>{
    //   console.log(res,"new data")
    
    // })
  }
  calldata() {
    this.apiService.getData().subscribe((res: any) => {
      this.dataSource.data = res;
      this.users = res;
    })
  }

  editUser(user: ApiData) {
    debugger
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
