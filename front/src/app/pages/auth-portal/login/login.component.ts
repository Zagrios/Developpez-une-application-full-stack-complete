import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/dto/auth/requests/login-request.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { passwordValidator } from 'src/app/core/validators/password.validator';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls:[
        'login.component.scss'
    ]
})

export class LoginComponent {

    public readonly loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required, passwordValidator]]
    });

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router
    ) { }
    
    public handleSubmit(){
        const loginReq: LoginRequest = {
            username: this.loginForm.value.username!,
            password: this.loginForm.value.password!
        }

        this.auth.login(loginReq).then(logged => {
            if(!logged){ return; }
            this.router.navigateByUrl('/home');
        });
    }

    public isPasswordInvalid(): boolean {
        console.log(!this.loginForm.get('password')?.valid);
        return !this.loginForm.get('password')?.valid;
    }

    public isUsernameInvalid(): boolean {
        return !this.loginForm.get('username')?.valid;
    }


}