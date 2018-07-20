import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { MoneyPipe } from '../pipes/money.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
import { CartStatusPipe } from '../pipes/cart-status.pipe';

@NgModule({
    exports: [
        // Material
        Material.MatAutocompleteModule,
        Material.MatButtonModule,
        Material.MatButtonToggleModule,
        Material.MatCardModule,
        Material.MatCheckboxModule,
        Material.MatChipsModule,
        Material.MatDatepickerModule,
        Material.MatDialogModule,
        Material.MatExpansionModule,
        Material.MatGridListModule,
        Material.MatIconModule,
        Material.MatInputModule,
        Material.MatListModule,
        Material.MatMenuModule,
        Material.MatProgressBarModule,
        Material.MatProgressSpinnerModule,
        Material.MatRadioModule,
        Material.MatRippleModule,
        Material.MatSelectModule,
        Material.MatSidenavModule,
        Material.MatSlideToggleModule,
        Material.MatSliderModule,
        Material.MatSnackBarModule,
        Material.MatTabsModule,
        Material.MatToolbarModule,
        Material.MatTooltipModule,
        Material.MatNativeDateModule
    ]
  })
  export class MaterialModule { }

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    exports: [
        LoadingComponent,
        MoneyPipe,
        CartStatusPipe,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        MaterialModule
    ],
    declarations: [
        LoadingComponent,
        CartStatusPipe,
        MoneyPipe
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
