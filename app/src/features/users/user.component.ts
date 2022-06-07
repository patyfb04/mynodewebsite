import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'users-view',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  public usersList: Observable<any>;
  public userId: any;

  constructor(private activateRoute: ActivatedRoute, private userService: UserService) {
    this.usersList = new Observable<any>();
  }

  public ngOnInit(): void {
    this.userService.getAll().subscribe((result) => {
      this.usersList = result;
    })

    this.activateRoute.params.subscribe(params => {
      if (params["id"] !== undefined) {
        this.userId = params["id"]
      }
    })
  }
}
