import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Topic } from '../models/topic.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TopicService {

    private readonly BASE_URL = 'topics';

    constructor(
        private api: ApiService,
    ) { }

    public getTopics(): Observable<Topic[]> {
        return this.api.get(this.BASE_URL);
    }

    public subscribeToTopic(topicId: number): Observable<void> {
        return this.api.post(`${this.BASE_URL}/${topicId}/subscribe`, {});
    }

    public unsubscribeFromTopic(topicId: number): Observable<void> {
        return this.api.delete(`${this.BASE_URL}/${topicId}/unsubscribe`);
    }

    public getSubscribedTopics(): Observable<Topic[]> {
        return this.api.get(`${this.BASE_URL}/subscribed`);
    }

    
}