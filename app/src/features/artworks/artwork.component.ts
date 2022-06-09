import { Component, OnInit,Input  } from '@angular/core';
import { ArtworkService } from './artwork.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'artworks-view',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.sass']
})
export class ArtworkComponent implements OnInit {
  public artworksList: Observable<any>;
  public clientId: any;
  public isAdmin: boolean = false;

  constructor(private activateRoute: ActivatedRoute, private artworkService: ArtworkService) {
    this.artworksList = new Observable<any>();
    this.isAdmin = activateRoute.snapshot.url.length > 0 ? activateRoute.snapshot.url[0].path == "admin" : false;
  }

  public ngOnInit(): void {

    this.artworkService.getAll().subscribe((result : any) => {
      this.artworksList = result;
    })

    this.activateRoute.params.subscribe(params => {
      if (params["id"] !== undefined) {
        this.clientId = params["id"]
      }
    })
  }
}
