import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CreatePostRequest } from '../models/dto/posts/new-post-request.interface';
import { Observable } from 'rxjs';
import { Post } from '../models/post.interface';

@Injectable({providedIn: 'root'})
export class PostService {

    private readonly BASE_ROUTE = 'posts';

    constructor(
        private api: ApiService,
    ) {}

    private buildRoute(...routeParts: string[]){
        return `${this.BASE_ROUTE}/${routeParts.join('/')}`;
    }

    public getPosts(): Observable<Post[]>{
        console.log("oui");
        return this.api.get(this.BASE_ROUTE);
    }

    public getPost(id: string): Observable<Post>{
        return this.api.get(this.buildRoute(id));
    }

    public createPost(req: CreatePostRequest): Observable<void>{
        return this.api.post(this.BASE_ROUTE, req);
    }


    
}