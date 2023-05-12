import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Topic } from '../../models/topic.interface';
import { TopicService } from '../../services/topic.service';

@Component({
    selector: 'topic-item',
    templateUrl: './topic-item.component.html',
    styleUrls: ['./topic-item.component.scss'],
})

export class TopicItemComponent {

    @Input() topic!: Topic;
    @Input() isOnUserPage: boolean = false;

    @Output() onUnSubscribe = new EventEmitter<Topic>();

    constructor(
        private topicService: TopicService
    ){

    }

    public subscribeTopic(){
        this.topicService.subscribeToTopic(this.topic.id).subscribe({
            next: () => this.topic.subscribed = true
        });
    }

    public unSubscribeTopic(){
        this.topicService.unsubscribeFromTopic(this.topic.id).subscribe({
            next: () => {
                this.topic.subscribed = false;
                this.onUnSubscribe.emit(this.topic);
            }
        });
    }


}