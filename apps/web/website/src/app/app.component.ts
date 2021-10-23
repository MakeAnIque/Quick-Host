import { Component } from '@angular/core';
import { environment } from '../environments/environment';

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
    //
  }
}
