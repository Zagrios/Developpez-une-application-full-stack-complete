import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { BehaviorSubject, Observable, distinctUntilChanged, map, take } from 'rxjs';
import { screenWidth$ } from 'src/app/core/constants/screen-width.constant';
import { TopicService } from 'src/app/core/services/topic.service';
import { Topic } from 'src/app/core/models/topic.interface';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent {

    public readonly nbCols$ = screenWidth$.pipe(map(width => width <= 620 ? 1 : 2), distinctUntilChanged());

    public readonly topics$: Observable<Topic[]>;

    public readonly error$ = new BehaviorSubject(false);

    public readonly userForm = this.fb.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.minLength(8)]]
    });
    
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private topicService: TopicService,
        private router: Router,
    ) {
        this.authService.userInfo$.subscribe(userInfo => {
            this.userForm.patchValue({...userInfo});
        });

        this.topics$ = this.topicService.getSubscribedTopics();
    }

    public onSubmit(){
        this.userService.updateUser(this.userForm.value.username!, this.userForm.value.email!).subscribe({
            next: userInfo => this.authService.setUserInfo(userInfo),
            error: () => { 
                this.error$.next(true); 
                this.userForm.reset({username: this.authService.userData?.username, email: this.authService.userData?.email});
            }
        });
    }

    public logOut(){
        this.authService.logOut();
        this.router.navigateByUrl("");
    }

}