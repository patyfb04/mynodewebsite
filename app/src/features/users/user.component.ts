import { Component, OnInit,ViewChild  } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, } from '@angular/material/table';
import { EncrDecrService } from 'src/common/services/encr-decr.service';
import { LocalStorageService } from 'src/common/services/localStorage.service';

@Component({
  selector: 'users-view',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  public displayedColumns: string[] = ['login', 'id'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;
  public selectedId : any;
  public users: Observable<any>;
  public dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator,  {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort,{static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }

  constructor(private activateRoute: ActivatedRoute,
              private userService: UserService,
              private encrDecrService: EncrDecrService,
              private localStorageService: LocalStorageService) {

    this.users = new Observable<any>();
    this.dataSource = new MatTableDataSource<User>();

    this.myForm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    });

  }

  public ngOnInit(): void {
    this.loadData();
  }


  public displayForm(eventName: any, id: any) {
    this.display = eventName == 'edit' ? true : !this.display;
    this.isEdit = eventName == 'edit' ? true : false;

    if (eventName == 'edit') {
      this.initForm(id);
      this.selectedId = id;
    } else {
      this.clearForm();
    }
  }

  onSubmit(form: FormGroup) {
    const client = new User(0, form.value.login, form.value.password);

    if (this.isEdit) {
      client.id = this.selectedId;
      this.update(client);
    }
    else {
      this.create(client);
      this.clearForm();
    }
  }

  public create(user: User) {
    delete user['id'];
    var encryptedPass = this.encrDecrService.encrypt(user.login, user.password);
    user.password = encryptedPass
    this.userService.create(user).subscribe((result: any) => {
      this.loadData();
    })
  }

  public update(user: User) {
    var encryptedPass = this.encrDecrService.encrypt(user.login, user.password);
    user.password = encryptedPass
    this.userService.update(user).subscribe((result: any) => {
      this.loadData();
    })
  }

  public delete(id: number) {
      this.userService.delete({id: id}).subscribe((result: any) => {
        this.loadData();
      })
  }

  public clearForm() {
    this.myForm.reset();
  }

  public initForm(id: number) {
    this.userService.getById(id).subscribe((result: any) => {
      if(result.length > 0)
      {
        this.myForm.patchValue({
          login: result[0].login,
          password: ""
        });
      }
    })
  }

  public loadData() {
    this.userService.getAll().subscribe((result: any) => {
       this.dataSource.data = result;
    })
  }

  public doFilter = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
