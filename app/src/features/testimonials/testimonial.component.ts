import { Component, OnInit,ViewChild  } from '@angular/core';
import { TestimonialService } from './testimonial.service';
import { Testimonial } from './testimonial';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, } from '@angular/material/table';

@Component({
  selector: 'Testimonials-view',
  templateUrl: './Testimonial.component.html',
  styleUrls: ['./Testimonial.component.sass']
})
export class TestimonialComponent implements OnInit {
  public displayedColumns: string[] = ['author', 'id'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;
  public selectedId : any;
  public Testimonials: Observable<any>;
  public dataSource: MatTableDataSource<Testimonial>;

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
              private TestimonialService: TestimonialService) {

    this.Testimonials = new Observable<any>();
    this.dataSource = new MatTableDataSource<Testimonial>();

    this.myForm = new FormGroup({
      author: new FormControl(''),
      comment: new FormControl(''),
      display: new FormControl(false)
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

  }

  public create(Testimonial: Testimonial) {
    delete Testimonial['id'];
    this.TestimonialService.create(Testimonial).subscribe((result: any) => {
      this.loadData();
    })
  }

  public update(Testimonial: Testimonial) {
    this.TestimonialService.update(Testimonial).subscribe((result: any) => {
      this.loadData();
    })
  }

  public delete(id: number) {
      this.TestimonialService.delete({id: id}).subscribe((result: any) => {
        this.loadData();
      })
  }

  public clearForm() {
    this.myForm.reset();
  }

  public initForm(id: number) {
    this.TestimonialService.getById(id).subscribe((result: any) => {
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
    this.TestimonialService.getAll().subscribe((result: any) => {
       this.dataSource.data = result;
    })
  }

  public doFilter = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
