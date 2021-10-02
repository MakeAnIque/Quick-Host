import { Component } from '@angular/core';
import { environment } from '../environments/environment';
// import { LoginModel } from '@quickhost/model';
import { LoginModel } from '@quick-host/model';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
@Component({
  selector: 'quickhost-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'web-website';

  file = environment.origin;

  /*** for test onyl */

  constructor() {
    let x = {
      email: null,
      username: 'myname',
      password: 34567,
    };
    const y = plainToClass(LoginModel, x);

    console.log(y);
  }
}
