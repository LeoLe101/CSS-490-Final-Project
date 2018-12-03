import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BasicServerResponse } from '../interfaces/iType';
import { EMAIL_VALIDATOR, US_PHONE_VALIDATOR } from '../utils/constant';
@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

    public galleryForm: FormGroup;
    public emailChecker: boolean = true;
    public msgChecker: boolean = true;
    public emailInvalid: string;
    public msgInvalid: string;
    public phone: string;
    public link: string;
    public timeStamp: string;
    public id: number;

    private _subscription1: Subscription;
    private _subscription2: Subscription;
    private _subscription3: Subscription;

    constructor(
        private _service: ApiService,
        private _fb: FormBuilder
    ) {
        this._subscription1 = this._service.idPassed.subscribe((dataToBePassed: number) => this.id = dataToBePassed);
        this._subscription2 = this._service.timeStampPassed.subscribe((dataToBePassed: string) => this.timeStamp = dataToBePassed);
        this._subscription3 = this._service.linkPassed.subscribe((dataToBePassed: string) => this.link = dataToBePassed);
    }

    ngOnInit(): void {
        this.galleryForm = this._fb.group({
            emailControl: ['', [Validators.email, Validators.required]],
            msgControl: ['', [Validators.minLength(10), Validators.required]]
        });
    }

    ngOnDestroy() {
        console.log("Unsubscribe from GALLERY");
        if (this._subscription1 && !this._subscription1.closed) {
            this._subscription1.unsubscribe();
            this._subscription1 = null;
        }
        if (this._subscription2 && !this._subscription2.closed) {
            this._subscription2.unsubscribe();
            this._subscription2 = null;
        }
        if (this._subscription3 && !this._subscription3.closed) {
            this._subscription3.unsubscribe();
            this._subscription3 = null;
        }
    }

    public shareToEmail(galleryForm: FormGroup): void {
        this.emailChecker = true;
        if (!galleryForm.get("emailControl").valid || !this._isValidEmail(galleryForm.get("emailControl").value)) {
            this.emailChecker = false;
            this.emailInvalid = "Please enter the email information correctly before sharing.";
            return;
        }
        this._service.ShareImgToEmail(galleryForm.get("emailControl").value).subscribe((response: BasicServerResponse) => {
            console.log(response);
            if (!response.status) {
                this.emailChecker = false;
                this.emailInvalid = response.msg;
            }
        });
    }

    public shareToMsg(galleryForm: FormGroup): void {
        this.msgChecker = true;
        if (!galleryForm.get("msgControl").valid || !this._isValidPhoneNumber(galleryForm.get("msgControl").value)) {
            this.msgChecker = false;
            this.msgInvalid = "Please enter the phone number information correctly before sharing. The contact number format should be: +1-XXX-XXX-XXXX";
            return;
        }
        this.phone = galleryForm.get("msgControl").value;
        this.phone = this.phone.trim().replace(/^\+1-/, "");
        this.phone = this.phone.trim().replace(/-/g, "");
        this._service.ShareImgToMsg(this.phone).subscribe((response: BasicServerResponse) => {
            console.log(response);
            if (!response.status) {
                this.msgChecker = false;
                this.msgInvalid = response.msg;
            }
        });
    }

    // Function to check a string against a REGEX for email validity
    private _isValidEmail(email: string): boolean {
        const re: RegExp = EMAIL_VALIDATOR;
        return re.test(email);
    }

    // Function to check a string against a REGEX for phone number validity
    private _isValidPhoneNumber(phoneNumber: string): boolean {
        const re: RegExp = US_PHONE_VALIDATOR;
        return re.test(phoneNumber);
    }
}
