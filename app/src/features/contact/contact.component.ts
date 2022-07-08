import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Contact } from './contact';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'contact-view',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  public contactModel: Contact;
  public myForm: FormGroup;
  public submitResult: string = '';

  constructor(private activateRoute: ActivatedRoute, private contactService: ContactService) {
 
    this.myForm = new FormGroup({
      description: new FormControl(''),
      email: new FormControl('')
    });
    
    this.initForm();
  }

  public ngOnInit(): void {
    this.contactService.getAll().subscribe((result: any) => {
      this.contactModel = result[0];
    })
  }

  onSubmit(form: FormGroup) {
    this.submitResult = '';
    const contact = new Contact(this.contactModel.id ? this.contactModel.id : 0, form.value.description, form.value.email);
    this.update(contact);
  }

  public update(contact: Contact) {
    this.contactService.update(contact).subscribe((result1: any) => {
      this.submitResult = 'Contact info updated sucessfully!';
      this.loadData();
    });
  }

  public initForm() {
    this.contactService.getAll().subscribe((result: any) => {
      if (result.length > 0) {
        this.myForm.patchValue({
          description: result[0].description,
          email: result[0].email
        });
      }
    })
  }

  public loadData() {
    this.contactService.getAll().subscribe((result: Contact[]) => {
     this.contactModel = result[0];
    })
  }

  public closeNotification(){
    this.submitResult = ''
  }

}
