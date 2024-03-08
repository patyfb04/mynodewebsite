import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CarouselInterface } from 'src/common/carousel/carousel.interface';
import { HomeService } from './home.service';
import { Home } from './home';

@Component({
  selector: 'home-view',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  public slides: CarouselInterface[] = [];
  public isAdmin: boolean = false;
  public myForm: FormGroup;
  public submitResult: string = '';
  public homeModel : Home;
  public id : number | undefined = 0;

  constructor(activateRoute: ActivatedRoute, private homeService: HomeService) {
      this.isAdmin = activateRoute.snapshot.url.length > 0 ? activateRoute.snapshot.url[0].path == "admin" : false;

      this.myForm = new FormGroup({
        img1: new FormControl(''),
        img2: new FormControl(''),
        img3: new FormControl(''),
        img4: new FormControl(''),
        img5: new FormControl(''),
        link1: new FormControl(''),
        link2: new FormControl(''),
        link3: new FormControl(''),
        link4: new FormControl(''),
        link5: new FormControl(''),
        txt1: new FormControl(''),
        txt2: new FormControl(''),
        txt3: new FormControl(''),
        txt4: new FormControl(''),
        txt5: new FormControl('')
      });
      this.initForm();
  }

  public initForm() {
    this.homeService.getAll().subscribe((result: any) => {
      if (result.length > 0) {
        const home = result[0];
        this.homeModel = new Home(
          1,
          home.img1,
          home.link1,
          home.txt1,
          home.img2,
          home.link2,
          home.txt2,
          home.img3,
          home.link3,
          home.txt3,
          home.img4,
          home.link4,
          home.txt4,
          home.img5,
          home.link5,
          home.txt5,
          );

          if(home.img1 != null && home.img1 != '')
          {
            this.slides = [...this.slides, {url: home.img1, title: home.txt1, link: home.link1 }];
          }

          if(home.img2 != null && home.img2 != '')
          {
            this.slides = [...this.slides, {url: home.img2, title: home.txt2, link: home.link2 }];
          }

          if(home.img3 != null && home.img3 != "")
          {
            this.slides = [...this.slides, {url: home.img3, title: home.txt3, link: home.link3 }];
          }

          if(home.img4 != null && home.img4 != "")
          {
            this.slides = [...this.slides, {url: home.img4, title: home.txt4, link: home.link4 }];
          }

          if(home.img5 != null && home.img5 != "")
          {
            this.slides = [...this.slides, {url: home.img5, title: home.txt5, link: home.link5 }];
          }

        this.myForm.patchValue({
          img1: home.img1,
          img2: home.img2,
          img3: home.img3,
          img4: home.img4,
          img5: home.img5,
          link1: home.link1,
          link2: home.link2,
          link3: home.link3,
          link4: home.link4,
          link5: home.link5,
          txt1: home.txt1,
          txt2: home.txt2,
          txt3: home.txt3,
          txt4: home.txt4,
          txt5: home.txt5
        });

        console.log('this.slides',this.slides);
      }
    })
  }

  onSubmit(form: FormGroup) {
    this.submitResult = '';
    this.homeModel = form.value;
    this.homeModel.id = 1;
    this.update(this.homeModel);
  }

  public update(home: Home) {
    this.homeService.update(home).subscribe((result1: any) => {
      console.log('this.homeModel',this.homeModel);
      this.submitResult = 'Main page info updated sucessfully!';
      this.loadData();
    });
  }

  public loadData() {
    this.homeService.getAll().subscribe((result: Home[]) => {
     this.homeModel = result[0];
    })
  }

  public closeNotification(){
    this.submitResult = ''
  }
}
