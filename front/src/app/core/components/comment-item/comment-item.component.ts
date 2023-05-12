import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/comment.interface';

@Component({
    selector: 'comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss'],
})

export class CommentItemComponent {
    @Input() comment: Comment = undefined!;
}