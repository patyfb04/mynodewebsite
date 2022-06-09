import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'contact-view',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  public contactDescription: Observable<any>;
  public userId: any;

  constructor(private activateRoute: ActivatedRoute, private contactService: ContactService) {
    this.contactDescription = new Observable<any>();
  }

  public ngOnInit(): void {
    this.contactService.getAll().subscribe((result) => {
      this.contactDescription = result[0];
    })

  }
}
