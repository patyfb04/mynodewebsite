import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VideoService } from './video.service';
import { Video } from './video';
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
  selector: 'videos-view',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.sass']
})
export class VideoComponent implements OnInit {
  public isAdmin: boolean = false;
  public isDetail: boolean = false;
  public displayedColumns: string[] = ['thumbnail', 'title','display', 'link', 'id'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;
  public selectedId: any;
  public selectedVideo: Video;
  public dataSource: MatTableDataSource<Video>;
  public loading :boolean = true;
  public videoList: Video[];

  public options = [];
  public filteredOptions: Observable<any>;
  public clientId: number = 0;

  public image: string="";
  public rootURL: string = environment.production ? "https://static.wixstatic.com/media/" :"http://localhost:5000/";
  public serverUrl: string = this.rootURL + "images";

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

  constructor(private activateRoute: ActivatedRoute,
    private videoService: VideoService,
    private route:Router) {
    this.isAdmin = activateRoute.snapshot.url.length > 0 ? activateRoute.snapshot.url[0].path == "admin" : false;
    this.dataSource = new MatTableDataSource<Video>();

    this.myForm = new FormGroup({
      link: new FormControl(''),
      description: new FormControl(''),
      display: new FormControl(''),
      thumbnail : new FormControl('')
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

    const video = new Video(0, form.value.title, form.value.description,form.value.thumbnail, form.value.link,form.value.display);

    if (this.isEdit) {
      video.id = this.selectedId;
      this.update(video);
    }
    else {
      this.create(video);
      this.clearForm();
    }
  }

  public create(video: Video) {

    delete video['id'];

      this.videoService.create(video).subscribe((result1: any) => {
          this.loadData();
      });
  }

  public update(video: Video) {
      this.videoService.update(video).subscribe((result1: any) => {
        this.loadData();
      });
  }

  public delete(id: number) {
    this.videoService.delete({ id: id }).subscribe((result: any) => {
      this.loadData();
    })
  }

  public clearForm() {
    this.myForm.reset();
  }

  public initForm(id: number) {
    this.videoService.getById(id).subscribe((result: any) => {
      if (result.length > 0) {
         this.image = result[0].image;

        this.myForm.patchValue({
          description: result[0].description,
          display: result[0].display,
          link: result[0].link,
          thumbnail : result[0].thumbnail,
          title : result[0].title
        });
      }
    })
  }

  public loadData() {
    this.videoService.getAll().subscribe((result: Video[]) => {
      this.videoList = result.filter(c=> c.display);
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

  public videoDetails(video: Video){
    this.selectedVideo = video;
    this.isDetail = true;
  }
}
