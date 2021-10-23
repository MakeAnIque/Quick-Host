import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [AuthRoutingModule, MaterialModule],
})
export class AuthModule {}
