import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { UserDetailsResponse } from '../models/dto/auth/responses/user-details-response.interface';

@Injectable({providedIn: 'root'})
export class UserService {

    private readonly BASE_ROUTE = 'user';
    
    constructor(
        private api: ApiService,
    ) { }
    
    public updateUser(username: string, email: string): Observable<UserDetailsResponse>{
        return this.api.put<UserDetailsResponse>(this.BASE_ROUTE, {username, email});
    }

}