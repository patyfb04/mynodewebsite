import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormInfoService } from './formInfo.service';
import { FormInfo } from './formInfo';
import { Client } from '../clients/client';
import { Observable, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';

@Component({
  selector: 'form-info-view',
  templateUrl: './formInfo.component.html',
  styleUrls: ['./formInfo.component.sass']
})
export class FormInfoComponent implements OnInit {
  public myForm: FormGroup;
  public selectedId: any;
  public dataSource: MatTableDataSource<FormInfo>;
  public submitResult: boolean = false;
  public submitResultMessage: string = '';

  constructor(private activateRoute: ActivatedRoute,
    private formInfoService: FormInfoService) {

    this.myForm = new FormGroup({
      name: new FormControl('',Validators.required),
      message: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required)
    });
  }

  public ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    const formInfo = new FormInfo(form.value.name, form.value.email, form.value.message);
     if(this.isValidForm(formInfo)){
       this.sendEmail(formInfo);
     } else{
       this.submitResult = true;
       this.submitResultMessage = 'Error: all fields are required and should be valid.';
     }
  }

  public isValidForm(formInfo: FormInfo){
     const result = formInfo.name.trim() != '' && formInfo.email.trim() != '' && this.validateEmail(formInfo.email.trim());
     return result;
  }

  public validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  public sendEmail(formInfo: FormInfo) {
    this.formInfoService.sendEmail(formInfo).subscribe((result: any) => {
        console.log("email send",result.rejected.length <= 0);
          this.submitResult = result.rejected.length <= 0;
          this.submitResultMessage = result.rejected.length <= 0 ? 'Message submitted!' : 'Error: Message not submitted.';
    });
  }

  public closeNotification(){
    this.submitResult = false
    this.submitResultMessage = ''
  }
}
