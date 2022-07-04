import { Component, OnInit,ViewChild  } from '@angular/core';
import { TestimonialService } from './testimonial.service';
import { Testimonial } from './testimonial';
import { Client } from './../clients/client';
import { Observable, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, } from '@angular/material/table';
import { ClientService } from './../clients/client.service';

@Component({
  selector: 'testimonial-view',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.sass']
})
export class TestimonialComponent implements OnInit {
  public displayedColumns: string[] = ['author', 'id'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;
  public selectedId : any;
  public testimonials: Observable<any>;
  public dataSource: MatTableDataSource<Testimonial>;
  public clientId: number = 0;
  public filteredOptions: Observable<any>;
  public author = new FormControl();

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
              private testimonialService: TestimonialService,
              private clientService: ClientService) {

    this.testimonials = new Observable<any>();
    this.dataSource = new MatTableDataSource<Testimonial>();

    this.myForm = new FormGroup({
      author: new FormControl(''),
      comment: new FormControl(''),
      display: new FormControl(false)
    });

    
    this.filteredOptions = this.author.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    )

  }

    //AUTOCOMPLETE /DROPDOWNS----------------

    filter(val: string): Observable<any> {
      return this.clientService.getAll()
        .pipe(
          map(response => response.filter((option: Client) => {
            return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
          }))
        )
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

  }

  public create(Testimonial: Testimonial) {
    delete Testimonial['id'];
    this.testimonialService.create(Testimonial).subscribe((result: any) => {
      this.loadData();
    })
  }

  public update(Testimonial: Testimonial) {
    this.testimonialService.update(Testimonial).subscribe((result: any) => {
      this.loadData();
    })
  }

  public delete(id: number) {
      this.testimonialService.delete({id: id}).subscribe((result: any) => {
        this.loadData();
      })
  }

  public clearForm() {
    this.myForm.reset();
  }

  public initForm(id: number) {
    this.testimonialService.getById(id).subscribe((result: any) => {
      if(result.length > 0) 
      {
        this.myForm.patchValue({
          login: result[0].login,
          password: result[0].password
        });
      }
    })
  }

  public loadData() {
    this.testimonialService.getAll().subscribe((result: any) => {
      this.dataSource.data = result;
      this.dataSource.data.forEach((testimonial: Testimonial) => {
       this.clientService.getById(testimonial.clientId).subscribe((result1: any) => {
         if(result1[0] != undefined) {
          testimonial.authorName = result1[0].name;
         }
       });
     });
    })
  }

  public doFilter = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public onAuthorChange(option: Client) {
    this.clientId = option.id === undefined ? 0 : option.id;
  }
}
