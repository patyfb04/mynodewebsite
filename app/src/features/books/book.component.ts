import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BookService } from './book.service';
import { ClientService } from './../clients/client.service';
import { Book } from './book';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';


@Component({
  selector: 'books-view',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class BookComponent implements OnInit {
  public displayedColumns: string[] = ['thumbnail', 'author', 'title', 'status', 'link', 'id'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;
  public selectedId: any;
  public clients: Observable<any>;
  public dataSource: MatTableDataSource<Book>;
  public isAdmin: boolean = false;

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
    private bookService: BookService,
    private clientService: ClientService) {
    this.isAdmin = activateRoute.snapshot.url.length > 0 ? activateRoute.snapshot.url[0].path == "admin" : false;
    this.clients = new Observable<any>();
    this.dataSource = new MatTableDataSource<Book>();

    this.myForm = new FormGroup({
      author: new FormControl(''),
      title: new FormControl(''),
      status: new FormControl(''),
      link: new FormControl(''),
      thumbnail: new FormControl('')
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

    const book = new Book(0, form.value.author, form.value.title, form.value.status, form.value.link, form.value.thumbnail);

    if (this.isEdit) {
      book.id = this.selectedId;
      this.update(book);
    }
    else {
      this.create(book);
      this.clearForm();
    }
  }

  public create(book: Book) {
    delete book['id'];
    this.bookService.create(book).subscribe((result: any) => {
      this.loadData();
    })
  }

  public update(book: Book) {
    this.bookService.update(book).subscribe((result: any) => {
      this.loadData();
    })
  }

  public delete(id: number) {
    this.bookService.delete({ id: id }).subscribe((result: any) => {
      this.loadData();
    })
  }

  public clearForm() {
    this.myForm.reset();
  }

  public initForm(id: number) {
    this.bookService.getById(id).subscribe((result: any) => {
      if (result.length > 0) {
        this.myForm.patchValue({
          author: result[0].author,
          title: result[0].title,
          status: result[0].status,
          link: result[0].link,
          thumbnail: result[0].thumbnail
        });
      }
    })
  }

  public loadData() {
  
    this.bookService.getAll().subscribe((result: Book[]) => {
      this.dataSource.data = result;

      this.dataSource.data.forEach((book: Book) => {
        this.clientService.getById(book.clientId).subscribe((result1: any) => {
          book.authorName = result1[0].name;
        })
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
