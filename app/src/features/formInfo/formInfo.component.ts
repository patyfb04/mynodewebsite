import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormInfoService } from './formInfo.service';
import { FormInfo } from './formInfo';
import { Client } from '../clients/client';
import { Observable, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private activateRoute: ActivatedRoute,
    private formInfoService: FormInfoService) {

    this.myForm = new FormGroup({
      name: new FormControl(''),
      message: new FormControl(''),
      email: new FormControl('')
    });
  }

  public ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    const formInfo = new FormInfo(form.value.name, form.value.email, form.value.message);
      this.sendEmail(formInfo);
  }

  public sendEmail(formInfo: FormInfo) {
    this.formInfoService.sendEmail(formInfo).subscribe((result: any) => {
        console.log("email send");
    });
  }
}
