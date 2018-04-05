import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
    {
        path : 'main',
        loadChildren : 'app/layouts/main-layout/main-layout.module#MainLayoutModule'
    }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}