import { NgModule } from '@angular/core';

import { AppIconComponent } from './app-icon/app-icon.component';
import { PostItemComponent } from './post-item/post-item.component';
import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TopicItemComponent } from './topic-item/topic-item.component';
import { CommonModule } from '@angular/common';
import { SeparatorComponent } from './separator/separator.component';
import { RouterModule } from '@angular/router';
import { CommentItemComponent } from './comment-item/comment-item.component';

@NgModule({
    imports: [
        CommonModule,
        MatCommonModule,
        MatCardModule,
        MatButtonModule,
        RouterModule,
    ],
    exports: [
        AppIconComponent,
        PostItemComponent,
        TopicItemComponent,
        SeparatorComponent,
        CommentItemComponent,
    ],
    declarations: [
        AppIconComponent,
        PostItemComponent,
        TopicItemComponent,
        SeparatorComponent,
        CommentItemComponent,
    ],
    providers: [],
})
export class SharedModule { }
