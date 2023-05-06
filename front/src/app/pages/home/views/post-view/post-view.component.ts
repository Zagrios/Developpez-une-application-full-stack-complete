import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Post } from 'src/app/core/models/post.interface';
import { PostService } from 'src/app/core/services/post.service';

@Component({
    selector: 'post-view',
    templateUrl: './post-view.component.html',
    styleUrls: ['./post-view.component.scss']
})

export class PostViewComponent {

    public readonly post$: Observable<Post>;

    constructor(
        route: ActivatedRoute,
        postService: PostService
    ) {
        this.post$ = postService.getPost(route.snapshot.params['id']);
    }

    public get postDate$(): Observable<string>{
        return this.post$.pipe(map(post => new Date(post.date).toLocaleDateString()));
    }
}