import { Component, OnInit } from '@angular/core';
import { ArtistService } from './artist.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Artist } from './artist';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'artist-view',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.sass']
})
export class ArtistComponent {

  public artistModel: Artist;
  public myForm: FormGroup;
  public submitResult: string = '';
  public isAdmin: boolean = false;

  constructor(private activateRoute: ActivatedRoute, private artistService: ArtistService) {
    this.isAdmin = activateRoute.snapshot.url.length > 0 ? activateRoute.snapshot.url[0].path == "admin" : false;
    this.myForm = new FormGroup({
      description: new FormControl(''),
      email: new FormControl('')
    });

    this.artistModel = new Artist(0, "", "");
    this.artistService.getAll().subscribe((result: any) => {
      this.artistModel = result[0];
    })
    this.initForm();
  }

  onSubmit(form: FormGroup) {
    this.submitResult = '';
    const contact = new Artist(this.artistModel.id ? this.artistModel.id : 0, form.value.description, form.value.email);
    this.update(contact);
  }

  public update(artist: Artist) {
    this.artistService.update(artist).subscribe((result1: any) => {
      this.submitResult = 'The artist info updated sucessfully!';
      this.loadData();
    });
  }

  public initForm() {
    this.artistService.getAll().subscribe((result: any) => {
      if (result.length > 0) {
        this.myForm.patchValue({
          description: result[0].description,
          email: result[0].email
        });
      }
    })
  }

  public loadData() {
    this.artistService.getAll().subscribe((result: Artist[]) => {
     this.artistModel = result[0];
    })
  }

  public closeNotification(){
    this.submitResult = ''
  }

}
