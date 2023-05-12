import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { screenWidth$ } from 'src/app/core/constants/screen-width.constant';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls:[
        'home.component.scss'
    ]
})

export class HomeComponent{
    public readonly isMobile$ = screenWidth$.pipe(map(width => width <= 620 ? true : false));
}