import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { SearchUserNameResponse, SearchHashTagResponse } from '../interfaces/iType';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

    public userNameControl = new FormControl();
    public hashTagControl = new FormControl();
    public message: string
    public testList: any[];
    public userList: any[];
    public hashTagList: any[];
    public userChecker: boolean = true;
    public hashChecker: boolean = true;
    public loading: boolean = false;
    
    private _subscription1: Subscription
    private _subscription2: Subscription

    @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
    @Output() onInputOption = new EventEmitter();

    constructor(
        private _service: ApiService,
        private _router: Router,
    ) {
    }

    ngOnInit(): void {
        this._service.passData("Main Gallery");
        this.testList = this._service.getImgsTest(0);
    }
    ngOnDestroy(): void {
        console.log("Unsubscribe GET IMAGE from SEARCH and FILTER");
        if (this._subscription1 && !this._subscription1.closed) {
            this._subscription1.unsubscribe();
            this._subscription1 = null;
        }
        if (this._subscription2 && !this._subscription2.closed) {
            this._subscription2.unsubscribe();
            this._subscription2 = null;
        }
    }

    public searchUserNameList(userName: string): void {
        this._subscription2 = this._service.SearchUserName(userName).subscribe((list: SearchUserNameResponse) => {
            this.loading = false;
            this.userList = list.items;
            if (list.items.length === 0) {
                this.userChecker = false;
            }
        });
        this.userList = this._service.getSearchUserTest(userName);
        this.loading = false;
    }

    public searchHashTagList(hashTag: string): void {
        this._subscription2 = this._service.SearchHashTag(hashTag).subscribe((list: SearchHashTagResponse) => {
            this.loading = false;
            this.hashTagList = list.items;
            if (list.items.length === 0) {
                this.hashChecker = false;
            }
        });
        this.hashTagList = this._service.getSearchHashTagTest(hashTag);
        this.loading = false;
    }

    public loadUserNameButton(): void {
        if (!this.userNameControl.value) {
            return;
        }
        this.userChecker = true;
        this.loading = true;
        this.searchUserNameList(this.userNameControl.value);
    }

    public loadHashTagButton(): void {
        if (!this.hashTagControl.value) {
            return;
        }
        this.hashChecker = true;
        this.loading = true;
        this.searchHashTagList(this.hashTagControl.value);
    }

    public getUserImg(userName: string): void {
        this._service.passData(userName + " Profile");        
        this._router.navigateByUrl('/home');
    }

    public getHashTagImg(hashTag: string): void {
        this._service.passData("Hash Tag#: " + hashTag);
        this._router.navigateByUrl('/home');
    }
}
