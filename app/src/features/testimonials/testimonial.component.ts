import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TestimonialService } from './testimonial.service';
import { ClientService } from './../clients/client.service';
import { Testimonial } from './testimonial';
import { Client } from './../clients/client';
import { Observable, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'testimonial-view',
  templateUrl: './Testimonial.component.html',
  styleUrls: ['./Testimonial.component.sass']
})
export class TestimonialComponent implements OnInit {
  public isAdmin: boolean = false;
  public displayedColumns: string[] = ['author', 'display', 'id'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;
  public selectedId: any;
  public dataSource: MatTableDataSource<Testimonial>;

  public author = new FormControl();
  public options = [];
  public filteredOptions: Observable<any>;
  public selectedClient: Client;
  public authorName?: string = '';


  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  constructor(private activateRoute: ActivatedRoute,
    private testimonialService: TestimonialService,
    private clientService: ClientService) {
    this.isAdmin = activateRoute.snapshot.url.length > 0 ? activateRoute.snapshot.url[0].path == "admin" : false;
    this.dataSource = new MatTableDataSource<Testimonial>();

    this.myForm = new FormGroup({
      display: new FormControl(false),
      author: new FormControl(''),
      comment: new FormControl('')
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

  public onAuthorChange(option: Client) {
    this.selectedClient = option;
  }

  //TABLE ---------------------------------------------------

  public displayForm(eventName: any, id: any, author?: string) {
    this.display = eventName == 'edit' ? true : !this.display;
    this.isEdit = eventName == 'edit' ? true : false;

    if(!this.display) {
      this.clearForm();
    }

    if (eventName == 'edit') {
      this.authorName = author;
      this.selectedId = id;
      this.initForm(id);
    } else {
      this.clearForm();
    }
  }

  onSubmit(form: FormGroup) {

    const testimonial = new Testimonial(0, form.value.author, form.value.comment, form.value.display);

    if (this.isEdit) {
      testimonial.id = this.selectedId;
      this.update(testimonial);
    }
    else {
      this.create(testimonial);
      this.clearForm();
    }
  }

  public create(testimonial: Testimonial) {

    delete testimonial['id'];
    testimonial.author = this.selectedClient.name;
    this.testimonialService.create(testimonial).subscribe((result1: any) => {
        this.loadData();
    });
  }

  public update(testimonial: Testimonial) {
      testimonial.author = this.selectedClient.name;
      this.testimonialService.update(testimonial).subscribe((result1: any) => {
        this.loadData();
        this.display = false;
      });
  }

  public delete(id: number) {
    this.testimonialService.delete({ id: id }).subscribe((result: any) => {
      this.loadData();
    })
  }

  public clearForm() {
    this.myForm.reset();
  }

  public initForm(id: number) {
    this.testimonialService.getById(id).subscribe((result: any) => {
      if (result.length > 0) {
        this.myForm.patchValue({
          comment: result[0].comment,
          display: result[0].display,
          author: result[0].author
        });

        this.author.setValue(result[0].author);
      }
    })
  }

  public loadData() {
    this.testimonialService.getAll().subscribe((result: Testimonial[]) => {
      this.dataSource.data = result;

    })
  }

  public doFilter = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
