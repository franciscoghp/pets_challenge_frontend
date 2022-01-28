import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets.component';;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [ PetsComponent ],
  imports: [
    CommonModule,
    PetsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

  ],

})
export class PetsModule { }
