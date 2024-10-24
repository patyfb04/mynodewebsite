import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebsiteService } from './website.service';
import { Website } from './website';
import { Observable, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import {Router} from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { environment } from '../../environments/environment';

@Component({
  selector: 'websites-view',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.sass']
})
export class WebsiteComponent implements OnInit {
  public isAdmin: boolean = false;
  public isDetail: boolean = false;
  public displayedColumns: string[] = ['thumbnail', 'title', 'link', 'id'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;
  public selectedId: any;
  public selectedWebsite: Website;
  public dataSource: MatTableDataSource<Website>;
  public loading :boolean = true;
  public websiteList: Website[];

  public options = [];
  public filteredOptions: Observable<any>;

  public image: string="";
  public rootURL: string = environment.production ? "https://static.wixstatic.com/media/" :"http://localhost:5000/";
  public serverUrl: string = this.rootURL + "images";


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
    private websiteService: WebsiteService,
    private route:Router) {
    this.isAdmin = activateRoute.snapshot.url.length > 0 ? activateRoute.snapshot.url[0].path == "admin" : false;
    this.dataSource = new MatTableDataSource<Website>();

    this.myForm = new FormGroup({
      link: new FormControl(''),
      description: new FormControl(''),
      thumbnail : new FormControl(''),
      title: new FormControl('')
    });
  }

  public ngOnInit(): void {
    this.loadData();
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

    const website = new Website(form.value.thumbnail, form.value.link, form.value.description, form.value.title, 0);

    if (this.isEdit) {
      website.id = this.selectedId;
      this.update(website);
    }
    else {
      this.create(website);
      this.clearForm();
    }
  }

  public create(website: Website) {

    delete website['id'];

      this.websiteService.create(website).subscribe((result1: any) => {
          this.loadData();
      });
  }

  public update(website: Website) {
      this.websiteService.update(website).subscribe((result1: any) => {
        this.loadData();
      });
  }

  public delete(id: number) {
    this.websiteService.delete({ id: id }).subscribe((result: any) => {
      this.loadData();
    })
  }

  public clearForm() {
    this.myForm.reset();
  }

  public initForm(id: number) {
    this.websiteService.getById(id).subscribe((result: any) => {
      if (result.length > 0) {
         this.image = result[0].image;

        this.myForm.patchValue({
          description: result[0].description,
          link: result[0].link,
          thumbnail : result[0].thumbnail,
          title : result[0].title
        });
      }
    })
  }

  public loadData() {
    this.websiteService.getAll().subscribe((result: Website[]) => {
      this.websiteList = result;
      this.dataSource.data = result;
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

  public videoDetails(website:Website){
    this.selectedWebsite = website;
    this.isDetail = true;
  }
}
