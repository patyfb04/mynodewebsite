import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from './../users/user.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from './../users/user';
import { FormControl, FormGroup } from '@angular/forms';
import { EncrDecrService } from 'src/common/services/encr-decr.service';
import { LocalStorageService } from 'src/common/services/localStorage.service';

@Component({
  selector: 'login-view',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  public userModel: User;
  public myForm: FormGroup;
  public submitResult: string = '';
  @Output() authResult = new EventEmitter<User | null>();

  constructor(private activateRoute: ActivatedRoute,
              private userService: UserService,
              private encrDecrService: EncrDecrService,
              private localStorageService: LocalStorageService) {
              this.myForm = new FormGroup({
                login: new FormControl(''),
                password: new FormControl('')
              });
            }

  onSubmit(form: FormGroup) {
    this.submitResult = ''
    const user = new User(null, form.value.login, form.value.password)
    this.login(user)
  }

  public login(user: User) {
      this.userService.getAll().subscribe((result => {
          if(result != null && result.length > 0)
          {
              var item = result.filter((item: User) =>{
              var encryptedForm =  this.encrDecrService.encrypt(user.login, user.password)

                if(item.login == user.login && item.password == encryptedForm)
                {
                  this.authResult.emit(new User(null,item.login, item.password));
                }
                else
                {
                  this.authResult.emit(null);
                  this.submitResult = 'User was not found.'
                }
              })
          }
      }));
  }

  public closeNotification(){
    this.submitResult = ''
  }

}
