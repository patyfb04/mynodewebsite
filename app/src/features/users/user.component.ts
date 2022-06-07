import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-view',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent  implements OnInit  {
  public response: Observable<any>;

  constructor(private userService: UserService) {
    this.response = new Observable<any>();
  }

  public ngOnInit(): void {
    this.response = this.userService.getUsers();
}
}
