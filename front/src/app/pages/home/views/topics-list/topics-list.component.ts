import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { screenWidth$ } from 'src/app/core/constants/screen-width.constant';
import { Topic } from 'src/app/core/models/topic.interface';
import { TopicService } from 'src/app/core/services/topic.service';

@Component({
    selector: 'topic-list',
    templateUrl: './topics-list.component.html',
    styleUrls: ['./topics-list.component.scss'],
})

export class TopicsListComponent {

    public readonly topics$: Observable<Topic[]>;

    public readonly nbCols$ = screenWidth$.pipe(map(width => width <= 620 ? 1 : 2));

    constructor(
        topicService: TopicService
    ) {
        this.topics$ = topicService.getTopics();
    }
}