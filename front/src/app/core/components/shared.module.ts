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
    ],
    declarations: [
        AppIconComponent,
        PostItemComponent,
        TopicItemComponent,
        SeparatorComponent,
    ],
    providers: [],
})
export class SharedModule { }
