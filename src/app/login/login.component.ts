import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginAndReg, BasicServerResponse } from '../interfaces/iType';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    public msg: string;
    public loginChecker: boolean = true;
    public loading: boolean = false;

    constructor(
        private _router: Router,
        private _service: ApiService,
        private _fb: FormBuilder
    ) { 
        
    }

    ngOnInit(): void {
        this.loginForm = this._fb.group({
            userName: ['', [Validators.minLength(4), Validators.maxLength(24), Validators.required]],
            password: ['', [Validators.minLength(8), Validators.required]]
        });
    }

    public login(loginForm: FormGroup): void {
        this.loading = true;
        this.loginChecker = true;
        console.log('Login data', loginForm.value);
        if (!loginForm.valid) {
            console.log('Invalid Authentication! LoginForm value:', loginForm);
            return;
        }
        let user: string = loginForm.get("userName").value;
        user = user.replace(/\s/g, "");
        let pass: string = loginForm.get("password").value;
        pass = pass.replace(/\s/g, "");
        const credentials: UserLoginAndReg = {
            userName: user,
            password: pass
        };  
        console.log("Credentials: ", credentials);
        this._service.Login(credentials).subscribe((response: BasicServerResponse) => {
            this.loading = false;
            if (response.status) {
                this._router.navigateByUrl('/home');
            } else {
                this.loginChecker = false;
                this.msg = response.msg;
            }
        },
        (error: HttpErrorResponse) => {
            this.loading = false;
            this.loginChecker = false;
        });
        this._router.navigateByUrl('/home');
    }

    public signUp(): void {
        this._router.navigateByUrl('/register');
    }
}
