import { Component, OnInit } from '@angular/core';
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

  constructor(private activateRoute: ActivatedRoute, private artworkService: ArtworkService) {
    this.artworksList = new Observable<any>();
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
