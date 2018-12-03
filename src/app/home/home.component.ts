import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GetMyImageResponse } from '../interfaces/iType';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    public _subscription: Subscription;
    public _subscription2: Subscription;
    public _subscription3: Subscription;
    public dataPassed: string;
    public pageCounter: number = 0;
    public imgList: GetMyImageResponse;
    public moreChecker: boolean = true;
    public testList: any[] = [];

    @Input() data: string;

    constructor(
        private _service: ApiService,
        private _router: Router,
    ) {
        this._subscription2 = this._service.dataPassed.subscribe((dataToBePassed: string) => this.dataPassed = dataToBePassed);
    }

    ngOnInit() {
        this._subscription = this._service.GetMyImg(this.dataPassed, this.pageCounter).subscribe((list: GetMyImageResponse) => {
            this.imgList = list
        });
        this.testList = this._service.getImgsTest(0);
    }

    ngOnDestroy(): void {
        console.log("Unsubscribe from HOME");
        if (this._subscription && !this._subscription.closed) {
            this._subscription.unsubscribe();
            this._subscription = null;
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

    public loadMore(): void {
        this._subscription3 = this._service.GetMyImg(this.dataPassed, this.pageCounter).subscribe((list: GetMyImageResponse) => {
            this.imgList.imgList.concat(list.imgList);
            this.pageCounter = list.imgList.length;
            if (list.imgList.length === 0) {
                this.moreChecker = false;
            }
        });
    }

    public getImg(id: number, link: string, timeStamp: string): void {
        this._service.passid(id);
        this._service.passtimeStamp(timeStamp);
        this._service.passlink(link);
        this._router.navigateByUrl('/gallery');
    }
}
