import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/core/components/shared.module';
import { HomeComponent } from './home/home.component';
import { HomeHeaderModule } from './home-header/home-header.module';
import { TopicsListComponent } from './views/topics-list/topics-list.component';
import { RouterModule } from '@angular/router';
import { PostsListComponent } from './views/posts-list/posts-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreatePostComponent } from './views/new-post/create-post.component';
import { PostViewComponent } from './views/post-view/post-view.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        HomeHeaderModule,
        RouterModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatSidenavModule
    ],
    exports: [],
    declarations: [
        HomeComponent,
        TopicsListComponent,
        PostsListComponent,
        UserProfileComponent,
        CreatePostComponent,
        PostViewComponent,
    ],
    providers: [],
})

export class HomeModule { }
