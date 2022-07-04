import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookService } from './book.service';
import { ClientService } from './../clients/client.service';
import { Book } from './book';
import { Client } from './../clients/client';
import { Observable, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'books-view',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {
  public isAdmin: boolean = false;
  public displayedColumns: string[] = ['thumbnail', 'author', 'title', 'status', 'link', 'id'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;
  public selectedId: any;
  public dataSource: MatTableDataSource<Book>;

  public author = new FormControl();
  public options = [];
  public filteredOptions: Observable<any>;
  public clientId: number = 0;

  public bookStatus = new FormControl();
  public status: string = '';

  public filename: string = 'Upload File';
  public serverUrl: string = "http://localhost:5000/src/assets/books/";
  public image: string="";

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

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private activateRoute: ActivatedRoute,
    private bookService: BookService,
    private clientService: ClientService) {
    this.isAdmin = activateRoute.snapshot.url.length > 0 ? activateRoute.snapshot.url[0].path == "admin" : false;
    this.dataSource = new MatTableDataSource<Book>();

    this.myForm = new FormGroup({
      title: new FormControl(''),
      link: new FormControl(''),
      thumbnail: new FormControl(''),
      author: new FormControl('')
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
    this.clientId = option.id === undefined ? 0 : option.id;
  }

  public onStatusChange(option: string) {
    this.status = option;
  }

  //FILE UPLOAD ----------------------------

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.filename = file.name;
      this.myForm.patchValue({
        thumbnail: file
      });
    }
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
    book.clientId = this.clientId;
    book.status = this.status;

    const file = this.myForm.get('thumbnail')?.value;
   
    if (file != null) 
    {
      const formData = new FormData();
      formData.append('file', file, this.filename);
      book.thumbnail = this.filename;
      
      this.bookService.uploadFile(formData).subscribe((result: any) => {
        this.bookService.create(book).subscribe((result1: any) => {
          this.loadData();
          this.filename = "";
        });
      });
    }
    else 
    {
      this.bookService.create(book).subscribe((result1: any) => {
        this.loadData();
        this.filename = "";
      });
    }
  }

  public update(book: Book) {
    book.clientId = this.clientId;
    book.status = this.status;
    book.clientId = this.clientId;
    book.status = this.status;
    book.thumbnail = this.image;
      this.bookService.update(book).subscribe((result1: any) => {
        this.loadData();
      });
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
         this.image = result[0].thumbnail

        this.myForm.patchValue({
          title: result[0].title,
          link: result[0].link
        });

        this.bookStatus.setValue(result[0].status);
        this.myForm.patchValue({
          bookStatus: result[0].status
        });

        this.clientService.getById(result[0].clientId).subscribe((result1: any) => {
          this.author.setValue(result1[0].name);

          this.myForm.patchValue({
            author: result[0].author
          });
        })
      }
    })
  }

  public loadData() {
    this.bookService.getAll().subscribe((result: Book[]) => {
      this.dataSource.data = result;
       this.dataSource.data.forEach((book: Book) => {
        this.clientService.getById(book.clientId).subscribe((result1: any) => {
          book.authorName = result1[0].name;
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
