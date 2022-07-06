import { BookDeliverableService } from './bookDeliverable.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookService } from './../books/book.service';
import { Book } from './../books/book';
import { BookDeliverable } from './bookDeliverable';
import { Observable, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'book-deliverable-view',
  templateUrl: './bookDeliverable.component.html',
  styleUrls: ['./bookDeliverable.component.sass']
})
export class BookDeliverableComponent implements OnInit {
  public isAdmin: boolean = false;
  public displayedColumns: string[] = [ 'book', 'status', 'amount', 'modifiedDate', 'link', 'id'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;
  public selectedId: any;
  public dataSource: MatTableDataSource<BookDeliverable>;

  public book = new FormControl();
  public options = [];
  public filteredOptions: Observable<any>;
  public bookId: number = 0;

  public bookDeliverableStatus = new FormControl();
  public status: string = '';


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
    private bookDeliverableService: BookDeliverableService,
    private bookService: BookService,) {
    this.isAdmin = activateRoute.snapshot.url.length > 0 ? activateRoute.snapshot.url[0].path == "admin" : false;
    this.dataSource = new MatTableDataSource<BookDeliverable>();

    this.myForm = new FormGroup({
      description: new FormControl(''),
      link: new FormControl(''),
      amount: new FormControl('')
    });

    this.filteredOptions = this.book.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    )
  }

  
  filter(val: string): Observable<any> {
    return this.bookService.getAll()
      .pipe(
        map(response => response.filter((option: Book) => {
          return option.title.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )
  }

  public ngOnInit(): void {
    this.loadData();
  }

//dropdrowns

public onBookChange(option: Book) {
  this.bookId = option.id === undefined ? 0 : option.id;
}

public onStatusChange(option: string) {
  this.status = option;
}


//TABLE ---------------------------------------------------

public displayForm(eventName: any, id: any) {
  this.display = eventName == 'edit' ? true : !this.display;
  this.isEdit = eventName == 'edit' ? true : false;

  if(!this.display) {
    this.clearForm();
  }

  if (eventName == 'edit') {
    this.initForm(id);
    this.selectedId = id;
  } else {
    this.clearForm();
  }
}

onSubmit(form: FormGroup) {

  const bookdeliverable = new BookDeliverable(0, this.bookId, form.value.description, this.status, form.value.amount, form.value.link, new Date());

  if (this.isEdit) {
    bookdeliverable.id = this.selectedId;
    this.update(bookdeliverable);
  }
  else {
    this.create(bookdeliverable);
    this.clearForm();
  }
}

public create(bookdeliverable: BookDeliverable) {

  delete bookdeliverable['id'];
  bookdeliverable.bookId = this.bookId;
  bookdeliverable.status = this.status;

    this.bookDeliverableService.create(bookdeliverable).subscribe((result1: any) => {
      this.loadData();
    });
  
}

public update(bookdeliverable: BookDeliverable) {
  bookdeliverable.bookId = this.bookId;
  bookdeliverable.status = this.status;
    this.bookDeliverableService.update(bookdeliverable).subscribe((result1: any) => {
      this.loadData();
    });
}

public delete(id: number) {

  this.bookDeliverableService.delete({ id: id }).subscribe((result: any) => {
    this.loadData();
  })
}

public clearForm() {
  this.myForm.reset();
}



  public initForm(id: number) {
    this.bookDeliverableService.getById(id).subscribe((result: any) => {
      if (result.length > 0) {
        
        this.myForm.patchValue({
          description: result[0].description,
          amount: result[0].amount,
          modifiedDate: result[0].modifiedDate,
          link: result[0].link
        });

        this.bookDeliverableStatus.setValue(result[0].status);
        this.myForm.patchValue({
          bookDeliverableStatus: result[0].status
        });

        this.bookService.getById(result[0].bookId).subscribe((result1: any) => {
          this.book.setValue(result1[0].title);

          this.myForm.patchValue({
            book: result[0].title
          });
        })
      }
    })
  }

  public loadData() {
    this.bookDeliverableService.getAll().subscribe((result: BookDeliverable[]) => {
      this.dataSource.data = result;
       this.dataSource.data.forEach((bookDeliverable: BookDeliverable) => {
        this.bookService.getById(bookDeliverable.bookId).subscribe((result1: any) => {
          if(result1[0] != undefined) {
            bookDeliverable.bookId = result1[0].id;
            bookDeliverable.bookTitle =  result1[0].title;
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

  public goToUrl(url: string) {
    window.open(url, '_blank')
  }

}
