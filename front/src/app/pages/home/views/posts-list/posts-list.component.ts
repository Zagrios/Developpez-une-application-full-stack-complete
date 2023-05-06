import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';
import { screenWidth$ } from 'src/app/core/constants/screen-width.constant';
import { Post } from 'src/app/core/models/post.interface';
import { PostService } from 'src/app/core/services/post.service';

@Component({
    selector: 'articles-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.scss'],
})

export class PostsListComponent {

    public readonly posts$ = new BehaviorSubject<Post[]>([]);
    public readonly orderAsc$ = new BehaviorSubject(true);

    public readonly nbCols$ = screenWidth$.pipe(map(width => width <= 620 ? 1 : 2));
    public readonly error$ = new BehaviorSubject(false);

    constructor(
        postService: PostService,
    ) {
        console.log("allo");
        postService.getPosts().subscribe({
            next: posts => this.posts$.next(posts),
            error: _ => this.error$.next(true),
        });
    }

    public toogleOrder(){
        this.orderAsc$.next(!this.orderAsc$.value);
        this.posts$.next(this.posts$.value.reverse());
    }
}