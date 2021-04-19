import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertConfirmBoxComponent, DialogConfig } from '../DialogBoxes/alert-confirm-box/alert-confirm-box.component';
import { DeleteConfirmBoxComponent } from '../DialogBoxes/delete-confirm-box/delete-confirm-box.component';
import TitleName from '../_helpers/TitleName';
import { User } from '../_helpers/user';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'kt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['user-details.component.scss']
})
export class UserDetailComponent implements OnInit {
  users: User[];
  role: any[];
  user = new User();
  titleName: any = TitleName;
  constructor(private router: Router, private userService: UserService,
              private activatedRoute: ActivatedRoute,private dialog: MatDialog,private title:Title) { }

  ngOnInit(): void {
    for (let i = 0; i < this.titleName.length; i++) {
			console.log(this.titleName[i].name);
			this.title.setTitle(this.titleName[i].name + '|User Datails');
		  }
    this.reloadUser();
  }

  reloadUser() {

       this.userService.getAllUsers().subscribe(data => {
          console.log(data);
          this.users = data;
       }, error => console.log(error));

  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      (data) => {
        console.log(data);
        this.reloadUser();
        alert('Deleted Successfully');
      },
      (error) => console.log(error)
    );
  }
  
    removeUser(id: number){
      Swal.fire({
        title: 'Are you sure, you want to remove an User?',
        text: 'This process is irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, go ahead.',
        cancelButtonText: 'No, let me think'
      }).then((result) => {
        if (result.value) {
          this.userService.deleteUser(id).subscribe(
            (data) => {
              console.log(data);
              this.reloadUser();
              this.openAlertDialog();
            },
            (error) => console.log(error)
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'User still in our database.)',
          'error'
        )
        }
      })
      }
   
    openAlertDialog(){
      Swal.fire('User Deleted Successfully..!');
    }
  changeRole(id: number, ) {
    console.log('id in change status=', id);
    this.userService.getUserById(id).subscribe((resp) => {
      console.log(resp);
      this.user = resp;
      console.log(this.user);
      this.userService.changeUserRole(id, this.user).subscribe(
        (data) => {
          console.log(data);
          this.reloadUser();
        },
        (error) => console.log(error)
      );
    });
  }


}
