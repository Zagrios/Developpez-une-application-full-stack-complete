import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/core/components/shared.module';
import { HomeHeaderComponent } from './home-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        MatSidenavModule
    ],
    exports: [
        HomeHeaderComponent,
    ],
    declarations: [
        HomeHeaderComponent,
    ],
    providers: [],
})
export class HomeHeaderModule { }
