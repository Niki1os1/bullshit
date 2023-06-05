import {Component, OnInit} from '@angular/core';
import {AnswerDto} from "../_models/answer-dto";
import {User} from "../_models/user";
import {PageEvent} from "@angular/material/paginator";
import {VideoService} from "../_services/video.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../_services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Course} from "../_models/course.model";
import {DialogContentExampleDialog} from "../my-course/my-course.component";
import {DialogContentDeleteVideoDialog} from "../video-of-the-course/video-of-the-course.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit{
  users: User[] = [];
  videoId: string | null | undefined;
  usersMap: { [key: string]: User } = {};

  page = 1;
  pageSize = 5;
  startIndex = 0;
  endIndex = 5;
  collectionSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  public pageSlice : User[] = [];

  currentSortColumn: string = '';
  sortDirection: string = 'asc';

  selectedRoles: string[] = ['ROLE_TEACHER', 'ROLE_ADMIN'];

  myForm: FormGroup | undefined;

  handlePageEvent(e: PageEvent) {
    this.startIndex = e.pageIndex * e.pageSize;
    this.endIndex = (e.pageIndex + 1) * e.pageSize;
    if(this.endIndex>this.collectionSize){
      this.endIndex = this.collectionSize;
    }
    this.pageSlice = this.users.slice(this.startIndex, this.endIndex);

  }

  constructor(private videoService: VideoService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private dialog: MatDialog

  ) {
  }

  ngOnInit() {

    this.myForm = new FormGroup({
      role: new FormControl()
    });

      this.userService.getAllUser().subscribe(
        (users: User[]) => {
          this.users = users;
          this.collectionSize = users.length;
          this.pageSlice = this.users.slice(0, 5)
          // Установка selectedRoles для каждого пользователя
          this.users.forEach((user: User) => {
            user.selectedRoles = user.roles.filter((role: string) => this.selectedRoles.includes(role));
            console.log(user.selectedRoles)
          });
        },
        (error) => {
          console.log('Error retrieving users: ', error);
        }
      );
    }

  sortByLogin() {
    if (this.currentSortColumn === 'login') {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        // Удаление сортировки и возврат к исходной коллекции
        this.currentSortColumn = '';
        this.sortDirection = '';
        this.pageSlice = this.users.slice(this.startIndex, this.endIndex);
        return; // Выходим из метода, чтобы не выполнять сортировку
      }
    } else {
      this.currentSortColumn = 'login';
      this.sortDirection = 'asc';
    }

    this.pageSlice.sort((a, b) => {
      const compareResult = a.username.localeCompare(b.username);
      return this.sortDirection === 'asc' ? compareResult : -compareResult;
    });

  }

  sortByEmail() {
    if (this.currentSortColumn === 'email') {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        // Удаление сортировки и возврат к исходной коллекции
        this.currentSortColumn = '';
        this.sortDirection = '';
        this.pageSlice = this.users.slice(this.startIndex, this.endIndex);
        return; // Выходим из метода, чтобы не выполнять сортировку
      }
    } else {
      this.currentSortColumn = 'email';
      this.sortDirection = 'asc';
    }

    this.pageSlice.sort((a, b) => {
      const compareResult = a.email.localeCompare(b.email);
      return this.sortDirection === 'asc' ? compareResult : -compareResult;
    });
  }

  sortById() {
    if (this.currentSortColumn === 'id') {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        // Удаление сортировки и возврат к исходной коллекции
        this.currentSortColumn = '';
        this.sortDirection = '';
        this.pageSlice = this.users.slice(this.startIndex, this.endIndex);
        return; // Выходим из метода, чтобы не выполнять сортировку
      }
    } else {
      this.currentSortColumn = 'id';
      this.sortDirection = 'asc';
    }

    this.pageSlice.sort((a, b) => {
      const compareResult = a.id - b.id;
      return this.sortDirection === 'asc' ? compareResult : -compareResult;
    });
  }

  editRoleUserById(userId: number, selectedRoles: string[]) {
    this.userService.editRoleUserById(userId, selectedRoles).subscribe(
      (response) => {
        const updatedUser = this.users.find((user) => user.id === userId);
        if (updatedUser) {
          updatedUser.roles = selectedRoles;

          if (!selectedRoles.includes('ROLE_STUDENT')) {
            updatedUser.roles.push('ROLE_STUDENT');
          }

          updatedUser.selectedRoles = selectedRoles.filter((role: string) => this.selectedRoles.includes(role));
        }
      },
      (error) => {
        console.log('Error editing user role: ', error);
      }
    );
  }

  deleteUserById(userId: number) {
    const dialogRef = this.dialog.open(DialogContentDeleteUserDialog);

    dialogRef.afterClosed().subscribe(result => {
    if (result === 'confirm') {
      this.userService.deleteUserById(userId).subscribe(
        () => {
          // Удалите пользователя из массива this.users
          const deletedIndex = this.users.findIndex((user) => user.id === userId);
          if (deletedIndex !== -1) {
            this.users.splice(deletedIndex, 1);
          }

          // Сортировка массива this.users
          this.sortUsers();

          // Обновите значение collectionSize и пересчитайте pageSlice
          this.collectionSize = this.users.length;
          this.pageSlice = this.users.slice(this.startIndex, this.endIndex);

          console.log("Пользователь успешно удален.");
        },
        (error: any) => {
          console.error("Ошибка при удалении пользователя:", error);
        }
      );
    }
  });
  }

  sortUsers() {
    switch (this.currentSortColumn) {
      case 'login':
        this.users.sort((a, b) => {
          const compareResult = a.username.localeCompare(b.username);
          return this.sortDirection === 'asc' ? compareResult : -compareResult;
        });
        break;
      case 'email':
        this.users.sort((a, b) => {
          const compareResult = a.email.localeCompare(b.email);
          return this.sortDirection === 'asc' ? compareResult : -compareResult;
        });
        break;
      case 'id':
        this.users.sort((a, b) => this.sortDirection === 'asc' ? a.id - b.id : b.id - a.id);
        break;
      default:
        break;
    }
  }

  // loadUserNames() {
  //
  //   for (const answer of this.answers) {
  //     this.userService.getUserById(answer.authorId).subscribe(
  //       (data) => {
  //         console.log(data);
  //         answer.authorName = data.first_name + ' ' + data.last_name;
  //       },
  //       (error) => {
  //         console.log('Error retrieving user: ', error);
  //       }
  //     );
  //   }
  // }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentDeleteUserDialog {}
