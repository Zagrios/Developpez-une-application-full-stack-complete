import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, lastValueFrom, map, skip, take } from 'rxjs';
import { Comment } from 'src/app/core/models/comment.interface';
import { Post } from 'src/app/core/models/post.interface';
import { PostService } from 'src/app/core/services/post.service';

@Component({
    selector: 'post-view',
    templateUrl: './post-view.component.html',
    styleUrls: ['./post-view.component.scss']
})

export class PostViewComponent {

    public readonly post$ = new BehaviorSubject<Post>({} as Post);

    public readonly commentForm = this.fb.group({
        content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]]
    });

    public readonly comments$ = new BehaviorSubject<Comment[]>([]);

    constructor(
        private fb: FormBuilder,
        route: ActivatedRoute,
        private postService: PostService
    ) {
        this.postService.getPost(route.snapshot.params['id']).subscribe({next: val => this.post$.next(val)});
        lastValueFrom(this.post$.pipe(skip(1), take(1))).then(post => {
            this.postService.getComments(post.id.toString()).subscribe(comments => this.comments$.next(comments));
        });
    }

    public get postDate$(): Observable<string>{
        return this.post$.pipe(map(post => new Date(post.date).toLocaleDateString()));
    }

    public get commentContentInvalid(){
        return this.commentForm.get('content')?.invalid;
    }

    public addComment(){
        if(this.commentContentInvalid){ return; }
        this.postService.addComment(this.post$.value.id.toString(), this.commentForm.value.content!).subscribe(comment => {
            this.comments$.next([...this.comments$.value, comment]);
            this.commentForm.reset();
            this.commentForm.get('content')?.reset();
        });
    }
}