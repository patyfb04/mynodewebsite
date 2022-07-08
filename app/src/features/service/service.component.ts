import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Service } from './service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'service-view',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.sass']
})
export class ServiceComponent implements OnInit {
  public serviceModel: Service;
  public myForm: FormGroup;
  public submitResult: string = '';

  constructor(private activateRoute: ActivatedRoute, private serviceService: ServiceService) {
 
    this.myForm = new FormGroup({
      description: new FormControl('')
    });
    
    this.initForm();
  }

  public ngOnInit(): void {
    this.serviceService.getAll().subscribe((result: any) => {
      this.serviceModel = result[0];
    })
  }

  onSubmit(form: FormGroup) {
    this.submitResult = '';
    const service = new Service(this.serviceModel.id ? this.serviceModel.id : 0, form.value.description);
    this.update(service);
  }

  public update(service: Service) {
    this.serviceService.update(service).subscribe((result1: any) => {
      this.submitResult = 'Service info updated sucessfully!';
      this.loadData();
    });
  }

  public initForm() {
    this.serviceService.getAll().subscribe((result: any) => {
      if (result.length > 0) {
        this.myForm.patchValue({
          description: result[0].description
        });
      }
    })
  }

  public loadData() {
    this.serviceService.getAll().subscribe((result: Service[]) => {
     this.serviceModel = result[0];
    })
  }

  public closeNotification(){
    this.submitResult = ''
  }
}
