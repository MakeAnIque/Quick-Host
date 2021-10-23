import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { MaterialModule } from '../../shared';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SignupRoutingModule, MaterialModule, RouterModule],
  exports: [MaterialModule],
})
export class SignupModule {}
