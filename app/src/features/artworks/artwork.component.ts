import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArtworkService } from './artwork.service';
import { ClientService } from './../clients/client.service';
import { Artwork } from './artwork';
import { Client } from './../clients/client';
import { Observable, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import {Router} from '@angular/router';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'artworks-view',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.sass']
})
export class ArtworkComponent implements OnInit {
  public isAdmin: boolean = false;
  public isDetail: boolean = false;
  public displayedColumns: string[] = ['thumbnail', 'title', 'category', 'tools', 'createdDate', 'display', 'totalPaid', 'link', 'id'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;
  public selectedId: any;
  public dataSource: MatTableDataSource<Artwork>;

  public artworkList: Artwork[];

  public client = new FormControl();
  public options = [];
  public filteredOptions: Observable<any>;
  public clientId: number = 0;

  public category = new FormControl();
  public categoryName: string = '';

  public filename: string = 'Upload File';
  public filename_thumbnail: string = 'Upload File';
  public image: string="";
  public image_thumbnail: string="";
  public serverUrl: string = "http://localhost:5000/src/assets/artworks/";
  
  public selectedCategory: string ='';

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
    private artworkService: ArtworkService,
    private clientService: ClientService,
    private route:Router) {
    this.isAdmin = activateRoute.snapshot.url.length > 0 ? activateRoute.snapshot.url[0].path == "admin" : false;
    this.dataSource = new MatTableDataSource<Artwork>();

    this.myForm = new FormGroup({
      title: new FormControl(''),
      link: new FormControl(''),
      thumbnail: new FormControl(''),
      image: new FormControl(''),
      client: new FormControl(''),
      description: new FormControl(''),
      tools: new FormControl(''),
      totalPaid: new FormControl(''),
      display: new FormControl('')
    });

    this.filteredOptions = this.client.valueChanges.pipe(
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

  public onClientChange(option: Client) {
    this.clientId = option.id === undefined ? 0 : option.id;
  }

  public onCategoryChange(option: string) {
    this.categoryName = option;
  }

  //FILE UPLOAD ----------------------------

  get f() {
    return this.myForm.controls;
  }

  onFileThumbChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.filename_thumbnail = file.name;
      this.myForm.patchValue({
        thumbnail: file
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.filename = file.name;
      this.myForm.patchValue({
        image: file
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

    const artwork = new Artwork(0, this.clientId, form.value.title, form.value.description, form.value.tools, form.value.thumbnail, 
                                form.value.image, form.value.link, form.value.category, new Date(), form.value.totalPaid, form.value.display);

    if (this.isEdit) {
      artwork.id = this.selectedId;
      this.update(artwork);
    }
    else {
      this.create(artwork);
      this.clearForm();
    }
  }

  public create(artwork: Artwork) {

    delete artwork['id'];
    artwork.clientId = this.clientId;
    artwork.category = this.categoryName;

    const file_thumb = this.myForm.get('thumbnail')?.value;
    const file= this.myForm.get('image')?.value;

    if (file != null && file_thumb != null) 
    {
      const formData = new FormData();
      formData.append('file_thumbnail', file_thumb, this.filename_thumbnail);
      formData.append('file', file, this.filename);

      artwork.thumbnail = this.filename_thumbnail;
      artwork.image = this.filename;

      this.artworkService.uploadFile(formData).subscribe((result: any) => {
        this.artworkService.create(artwork).subscribe((result1: any) => {
          this.loadData();
          this.filename_thumbnail = "";
          this.filename = "";
        });
      });
    }
    else 
    {
      this.artworkService.create(artwork).subscribe((result1: any) => {
          this.loadData();
          this.filename_thumbnail = "";
          this.filename = "";
      });
    }
  }

  public update(artwork: Artwork) {
    artwork.clientId = this.clientId;
    artwork.category = this.categoryName;
    artwork.thumbnail = this.image_thumbnail;
    artwork.image = this.image;
      this.artworkService.update(artwork).subscribe((result1: any) => {
        this.loadData();
      });
  }

  public delete(id: number) {
    this.artworkService.delete({ id: id }).subscribe((result: any) => {
      this.loadData();
    })
  }

  public clearForm() {
    this.myForm.reset();
  }

  public initForm(id: number) {
    this.artworkService.getById(id).subscribe((result: any) => {
      if (result.length > 0) {
         this.image_thumbnail = result[0].thumbnail;
         this.image = result[0].image;

        this.myForm.patchValue({
          title: result[0].title,
          description: result[0].description,
          tools: result[0].tools,
          category: result[0].category,
          display: result[0].display,
          totalPaid: result[0].totalPaid,
          link: result[0].link
        });

        this.category.setValue(result[0].category);
        
        this.myForm.patchValue({
          category: result[0].category
        });

        this.clientService.getById(result[0].clientId).subscribe((result1: any) => {
          if(result1[0] != undefined) {
            this.client.setValue(result1[0].name);
            this.myForm.patchValue({
              clientId: result[0].id
            });
          }
        })
      }
    })
  }

  public loadData() {
    this.artworkService.getAll().subscribe((result: Artwork[]) => {
      this.artworkList = result;
      this.dataSource.data = result;
       this.dataSource.data.forEach((artwork: Artwork) => {
        this.clientService.getById(artwork.clientId != null ? artwork.clientId : 0).subscribe((result1: any) => {
          if(result1[0] != undefined) {
            artwork.clientId = result1[0].id;
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

//------------ app view ------------------

  public artworkDetails(artwork: Artwork){
    this.isDetail = true;
  }

  public filterByStyle(val: string) {
    this.selectedCategory = val;
  }
}
