import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { CreatePostRequest } from 'src/app/core/models/dto/posts/new-post-request.interface';
import { Topic } from 'src/app/core/models/topic.interface';
import { PostService } from 'src/app/core/services/post.service';
import { TopicService } from 'src/app/core/services/topic.service';

@Component({
    selector: 'new-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss'],
})

export class CreatePostComponent {

    public readonly topics$: Observable<Topic[]>
    public readonly error$ = new BehaviorSubject(false);

    public readonly postForm = this.fb.group({
        topicId: [0, [Validators.required, Validators.min(1)]],
        title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        content: ['', [Validators.required, Validators.minLength(100)]]
    });

    constructor(
        topicService: TopicService,
        private fb: FormBuilder,
        private postService: PostService,
        private router: Router,
    ) {
        this.topics$ = topicService.getTopics().pipe(catchError(_ => {
            this.error$.next(true);
            return of([]);
        }));
    }

    public topicIdInvalid(): boolean{
        return this.postForm.get('topicId')!.invalid || !this.postForm.get('topicId')!.touched;
    }

    public titleInvalid(): boolean{
        return this.postForm.get('title')!.invalid || !this.postForm.get('title')!.touched;
    }

    public contentInvalid(): boolean{
        return this.postForm.get('content')!.invalid || !this.postForm.get('content')!.touched;
    }

    public submitPost(){
        if(!this.postForm.valid){ return; }
        
        const newPost: CreatePostRequest = {
            topicId: +this.postForm.get('topicId')!.value!,
            title: this.postForm.get('title')!.value!,
            content: this.postForm.get('content')!.value!,
        }

        this.postService.createPost(newPost).subscribe({
            next: () => this.router.navigateByUrl('/home/posts'),
            error: () => this.error$.next(true)
        });
    }
}