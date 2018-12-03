import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginAndReg, BasicServerResponse } from '../interfaces/iType';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup;
    public msg: string;
    public registerChecker: boolean = true;
    public loading: boolean = false;
    public ok: boolean = false;

    constructor(
        private _router: Router,
        private _fb: FormBuilder,
        private _service: ApiService,
    ) {

    }

    ngOnInit() {
        this.registerForm = this._fb.group({
            userName: ['', [Validators.minLength(4), Validators.maxLength(24), Validators.required]],
            password: ['', [Validators.minLength(8), Validators.required]]
        });
    }

    public signUp(registerForm: FormGroup): void {
        console.log('signUp data', registerForm.value);
        if (!registerForm.valid) {
            console.log('Invalid Data! signUp value:', registerForm);
            return;
        }
        let user: string = registerForm.get("userName").value;
        user = user.replace(/\s/g, "");
        let pass: string = registerForm.get("password").value;
        pass = pass.replace(/\s/g, "");
        const credentials: UserLoginAndReg = {
            userName: user,
            password: pass
        };
        this._service.SignUp(credentials).subscribe((response: BasicServerResponse) => {
            this.loading = false;
            if (response.status) {
                this.ok = true;
            } else {
                this.registerChecker = false;
                this.msg = response.msg;
            }
        },
            (error: HttpErrorResponse) => {
                this.loading = false;
                this.registerChecker = false;
            });
        this.ok = true;
    }

    public login(): void {
        this._router.navigateByUrl('/login');
    }

}
