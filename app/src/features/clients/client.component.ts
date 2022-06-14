import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { Client } from './client';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'clients-view',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {
  public dataSource: Observable<any>;
  public clientId: any;
  public displayedColumns: string[] = ['name', 'email', 'active', 'id'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;

  constructor(private activateRoute: ActivatedRoute, private clientService: ClientService) {
    this.dataSource = new Observable<any>();

    this.myForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      active: new FormControl(false)
    });
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public displayForm(eventName: any, id: any) {
    this.display = eventName == 'edit' ? true : !this.display;
    this.isEdit = eventName == 'edit' ? true : false;

    if (eventName == 'edit') {
      this.initForm(id);
    }
  }

  onSubmit(form: FormGroup) {
    const client = new Client(0, form.value.name, form.value.email, form.value.active);

    if (this.isEdit) {
      this.update(client);
    }
    else {
      this.create(client);
      this.clearForm();
    }
  }

  public create(client: Client) {
    delete client['id'];
    this.clientService.create(client).subscribe((result: any) => {
      this.loadData();
    })
  }

  public update(client: Client) {
    this.clientService.update(client).subscribe((result: any) => {
      this.loadData();
    })
  }

  public delete(id: number) {
      this.clientService.delete({id: id}).subscribe((result: any) => {
        console.log('deleted')
        this.loadData();
      })
  }

  public clearForm() {
    this.myForm.reset();
  }

  public initForm(id: number) {
    this.clientService.getById(id).subscribe((result: any) => {
      if(result.length > 0) 
      {
        this.myForm.patchValue({
          name: result[0].name,
          email: result[0].email,
          active: result[0].active
        });
      }
    })
  }

  public loadData() {
    this.clientService.getAll().subscribe((result: any) => {
      this.dataSource = result;
    })
  }
}
