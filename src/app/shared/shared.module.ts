import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
    imports: [],
    exports: [
        LoadingComponent
    ],
    declarations: [LoadingComponent, RegisterComponent],
    providers: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
