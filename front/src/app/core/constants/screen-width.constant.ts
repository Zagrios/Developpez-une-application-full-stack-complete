import { fromEvent, map, startWith, Observable, shareReplay } from "rxjs";

export const screenWidth$: Observable<number> = fromEvent(window, 'resize').pipe(
    map(() => window.innerWidth), startWith(window.innerWidth), shareReplay(1)
);