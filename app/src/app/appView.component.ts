import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/common/services/localStorage.service';

@Component({
  selector: 'app-view',
  templateUrl: './appView.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppViewComponent  implements OnInit{
  public response: Observable<any>;

  public display: any = {
    service: false,
    artist: false,
    books: false,
    artworks: false,
    testimonial: false,
    formInfo: false,
    home: false
  };

  public submenus: any = {
    portfolio : false
  };

  constructor(private appService: AppService,
    private localStorageService: LocalStorageService) {
    this.response = new Observable<any>();
  }

  ngOnInit(): void {
      let currentPage = this.localStorageService.get("viewPage")
      if(currentPage == null || currentPage == undefined) {
        currentPage = "home"
      }
      this.displayView(null, currentPage)
  }

  public displayView(event: Event | null, view: any) {
    if(event != null){
      event.preventDefault();
    }
    this.display = {
      service: false,
      artist: false,
      books: false,
      artworks: false,
      testimonial: false,
      formInfo: false,
      home: false
    };

    this.submenus = {
      portfolio : (view == 'artworks' || view == 'videos' || view == 'websites') ? true : false
    };

    let currentPage = this.localStorageService.set("viewPage", view)
    return this.display[view] = true
  }

  public displaySubMenu(submenu : any | null, display : boolean | null){
    this.submenus = {
      portfolio : false
    };
    if(submenu != 'all'){
      this.submenus[submenu] = display;
    }
}
}
