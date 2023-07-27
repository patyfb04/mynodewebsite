import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { EncrDecrService } from 'src/common/services/encr-decr.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  implements OnInit{

  public isAdmin : boolean = false;

 constructor(private appService: AppService, private routes: Router, private EncrDecr: EncrDecrService) {

    this.routes.events.subscribe((val) => {
        if(val instanceof NavigationEnd) {
           this.isAdmin = val.url == "/admin" ? true : false;
        }
    });
  }

  ngOnInit() {
    var encrypted = this.EncrDecr.encrypt('123456$#@$^@1ERF', 'password@123456');
    var decrypted = this.EncrDecr.decrypt('123456$#@$^@1ERF', encrypted);

    console.log('Encrypted :' + encrypted);
    console.log('Decrypted :' + decrypted);
  }
}
