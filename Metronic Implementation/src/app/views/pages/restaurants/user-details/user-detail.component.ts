import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertConfirmBoxComponent, DialogConfig } from '../DialogBoxes/alert-confirm-box/alert-confirm-box.component';
import { DeleteConfirmBoxComponent } from '../DialogBoxes/delete-confirm-box/delete-confirm-box.component';
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
  constructor(private router: Router, private userService: UserService,
              private activatedRoute: ActivatedRoute,private dialog: MatDialog) { }

  ngOnInit(): void {
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
  removeUser(id: number) {
		const confirmDialog = this.dialog.open(DeleteConfirmBoxComponent, {
		  data: {
			title: 'Confirm Remove User',
			message: 'Are you sure, you want to remove an User'+id
		  }
		});
		confirmDialog.afterClosed().subscribe(result => {
		  if (result === true) {
        this.userService.deleteUser(id).subscribe(
          (data) => {
            console.log(data);
            this.reloadUser();
           /*  alert('Deleted Successfully'); */
           this.openAlertDialog();
          },
          (error) => console.log(error)
        );
		  }
		});
	  }
    openAlertDialog(): void {
      const dialog: DialogConfig = {
        title: 'User Deleted Successfully',
        close: 'OK'
      };
      this.dialog.open(AlertConfirmBoxComponent, { width: '287px', data: dialog });
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
