import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'post-item',
    templateUrl: './post-item.component.html',
    styleUrls: ['./post-item.component.scss'],
})

export class PostItemComponent {

    @Input() post!: Post;

    constructor(
        private router: Router,
    ) { }

    public postDate(): string{
        return new Date(this.post.date).toLocaleDateString();
    }

    public goToPost(){
        this.router.navigate(['home', 'posts', this.post.id]);
    }
}