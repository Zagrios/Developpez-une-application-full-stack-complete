import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/core/components/shared.module';
import { HomeComponent } from './home/home.component';
import { HomeHeaderModule } from './home-header/home-header.module';
import { TopicsListComponent } from './views/topics-list/topics-list.component';
import { RouterModule } from '@angular/router';
import { ArticlesListComponent } from './views/articles-list/articles-list.component';

@NgModule({
    imports: [
        SharedModule,
        HomeHeaderModule,
        RouterModule
    ],
    exports: [],
    declarations: [
        HomeComponent,
        TopicsListComponent,
        ArticlesListComponent,
    ],
    providers: [],
})

export class HomeModule { }
