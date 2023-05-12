import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, lastValueFrom, map } from 'rxjs';
import { RegisterRequest } from '../models/dto/auth/requests/register-request.interface';
import { AuthentificationResponse } from '../models/dto/auth/responses/authentification-response.interface';
import { LoginRequest } from '../models/dto/auth/requests/login-request.interface';
import { User } from '../models/user.interface';
import { MeRequest } from '../models/dto/auth/requests/me-request.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({providedIn: 'root'})
export class AuthService {

    private readonly BASE_ROUTE = 'auth';

    private readonly _userInfo$ = new BehaviorSubject<User|null>(null);
    
    public readonly isLoggedIn$ = this._userInfo$.pipe(map(userInfo => !!userInfo));
    
    constructor(
        private api: ApiService,
        private cookie: CookieService
    ) {}

    private saveToken(token: string){
        this.cookie.set('token', token, 30, '/', '', false, 'Lax');
        return token;
    }

    private buildRoute(route: string){
        return `${this.BASE_ROUTE}/${route}`;
    }

    public getToken(){
        return this.cookie.get('token');
    }

    public async register(registerReq: RegisterRequest): Promise<boolean>{
        const res = await lastValueFrom(this.api.post<AuthentificationResponse>(this.buildRoute('register'), registerReq));
        this.saveToken(res.token);
        await this.me();
        return this.isLoggedIn;
    }

    public async login(loginReq: LoginRequest): Promise<boolean>{
        const res = await lastValueFrom(this.api.post<AuthentificationResponse>(this.buildRoute('login'), loginReq));
        this.saveToken(res.token);
        await this.me();
        return this.isLoggedIn;
    }

    public logOut(){
        this.cookie.delete('token', '/');
        this._userInfo$.next(null);
    }

    private async me(): Promise<User|null>{
        const res = await lastValueFrom(this.api.get<MeRequest>(this.buildRoute('me')));
        this._userInfo$.next(res);
        return this._userInfo$.value;
    }

    public tryAutoLogin(){
        if(this.isLoggedIn){ return Promise.resolve(this._userInfo$.value); }

        if(!this.getToken()){
            return Promise.resolve(null);
        }

        return this.me();
    }

    public get isLoggedIn(){
        return !!this._userInfo$.value;
    }

    public get userData(){
        return this._userInfo$.value;
    }

    public get userInfo$(){
        return this._userInfo$.asObservable();
    }

    public setUserInfo(userInfo: User){
        this._userInfo$.next(userInfo);
    }


    
}