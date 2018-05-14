import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { MoneyPipe } from '../pipes/money.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        RouterModule, CommonModule , FormsModule , ReactiveFormsModule 
    ],
    exports: [
        LoadingComponent,
        MoneyPipe,
        FormsModule,
        ReactiveFormsModule,
        RouterModule, 
        CommonModule
    ],
    declarations: [
        LoadingComponent,
        MoneyPipe
    ],
    providers: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
