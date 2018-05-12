import { NgModule } from '@angular/core';

import { MainLayoutComponent } from './main-layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module'
import { MainLayoutGuard } from './main-layout.guard';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
    imports: [
        MainLayoutRoutingModule,
        SharedModule
    ],
    exports: [],
    declarations: [MainLayoutComponent],
    providers: [
        MainLayoutGuard
    ],
})
export class MainLayoutModule { }
