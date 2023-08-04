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
    contact: false,
    books: false,
    artworks: false,
    testimonial: false
  };

  constructor(private appService: AppService,
    private localStorageService: LocalStorageService) {
    this.response = new Observable<any>();
  }

  ngOnInit(): void {
      let currentPage = this.localStorageService.get("viewPage")
      this.displayView(null, currentPage)
  }

  public displayView(event: Event | null, view: any) {
    if(event != null){
      event.preventDefault();
    }
    this.display = {
      service: false,
      contact: false,
      books: false,
      artworks: false,
      testimonial: false
    };

    let currentPage = this.localStorageService.set("viewPage", view)
    return this.display[view] = true

    return this.display[view] = true;
  }
}
