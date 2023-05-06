import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { screenWidth$ } from 'src/app/core/constants/screen-width.constant';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'home-header',
    templateUrl: './home-header.component.html',
    styleUrls: ['./home-header.component.scss'],
})

export class HomeHeaderComponent {

    public readonly isMobile$ = screenWidth$.pipe(map(width => width <= 620 ? true : false));

    @ViewChild('sidenav') sidenav: MatSidenav|null = null;

    constructor(
        private router: Router,
    ) {}

    public goToHome() {
        this.router.navigate(['/home']);
    }

    public isOnRoute(route: string): boolean {
        return  this.router.url === route;
    }
}