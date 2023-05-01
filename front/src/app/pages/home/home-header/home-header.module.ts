import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/core/components/shared.module';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { ComputerMenuComponent } from './computer-menu/computer-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        SharedModule,
        MatButtonModule,
        MatIconModule,
        RouterModule
    ],
    exports: [
        HomeHeaderComponent,
    ],
    declarations: [
        HomeHeaderComponent,
        ComputerMenuComponent,
    ],
    providers: [],
})
export class HomeHeaderModule { }
