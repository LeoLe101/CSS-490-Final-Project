import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Urls, HTTP_JSON_HEADER } from './utils/constant';
import { UserLoginAndReg, BasicServerResponse, SearchUserNameResponse, SearchHashTagResponse, GetMyImageResponse } from './interfaces/iType';
import {
    HttpClient,
} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private data = new BehaviorSubject<string>("Main Gallery");
    public dataPassed = this.data.asObservable();

    private link = new BehaviorSubject<string>("None");
    public linkPassed = this.link.asObservable();

    private timeStamp = new BehaviorSubject<string>("None");
    public timeStampPassed = this.timeStamp.asObservable();

    private id = new BehaviorSubject<number>(0);
    public idPassed = this.id.asObservable();

    public testImg = [
        { "imgLink": "assets/1.png", "timeStamp": "1374843600", "hashTag": "mountain", "id": 1 },
        { "imgLink": "assets/2.jpg", "timeStamp": "1373813600", "hashTag": "boat", "id": 2 },
        { "imgLink": "assets/3.png", "timeStamp": "1274844600", "hashTag": "island", "id": 3 },
        { "imgLink": "assets/4.jpg", "timeStamp": "1374844640", "hashTag": "water", "id": 4 },
        { "imgLink": "assets/5.jpg", "timeStamp": "1314843609", "hashTag": "abstract", "id": 5 },
        { "imgLink": "assets/6.jpg", "timeStamp": "1314142600", "hashTag": "beach", "id": 6 },
        { "imgLink": "assets/7.jpg", "timeStamp": "1374883609", "hashTag": "abstract", "id": 7 },
        { "imgLink": "assets/8.jpg", "timeStamp": "1774847607", "hashTag": "abstract", "id": 8 },
        { "imgLink": "assets/9.jpg", "timeStamp": "1374883808", "hashTag": "city", "id": 9 },
        { "imgLink": "assets/10.jpg", "timeStamp": "2374843600", "hashTag": "mountain", "id": 10 },
        { "imgLink": "assets/11.jpg", "timeStamp": "4374843600", "hashTag": "mountain", "id": 11 },
        { "imgLink": "assets/12.jpg", "timeStamp": "5374843600", "hashTag": "mountain", "id": 12 },
        { "imgLink": "assets/13.jpg", "timeStamp": "2334843600", "hashTag": "forest", "id": 13 },
        { "imgLink": "assets/14.jpg", "timeStamp": "7374843600", "hashTag": "quote", "id": 14 },
        { "imgLink": "assets/15.jpg", "timeStamp": "9374843600", "hashTag": "funny", "id": 15 },
        { "imgLink": "assets/16.jpg", "timeStamp": "1371843600", "hashTag": "food", "id": 16 },
        { "imgLink": "assets/17.jpg", "timeStamp": "1324843600", "hashTag": "wallpaper", "id": 17 },
        { "imgLink": "assets/18.jpg", "timeStamp": "1234843600", "hashTag": "food", "id": 18 },
        { "imgLink": "assets/19.jpg", "timeStamp": "6174843600", "hashTag": "food", "id": 19 },
        { "imgLink": "assets/20.jpg", "timeStamp": "9174843600", "hashTag": "quote", "id": 20 },
    ];
    public testUser = [
        { "userName": "John Doe" },
        { "userName": "Pizza Doe" },
        { "userName": "Ninja Doe" },
        { "userName": "Donut Doe" },
        { "userName": "Leo Doe" },
        { "userName": "Trinh Doe" },
        { "userName": "Nathan Doe" },
        { "userName": "Sandy Doe" },
        { "userName": "Don Doe" },
        { "userName": "Nigg Doe" },
        { "userName": "Nikki Doe" },
        { "userName": "Monta Doe" },
        { "userName": "Human Doe" },
        { "userName": "WTF Doe" },
        { "userName": "Shit Doe" },
        { "userName": "Cow Doe" },
        { "userName": "Cat Doe" },
        { "userName": "Dog Doe" },
    ];
    public testHashTags = [
        { "hashTag": "mountian" },
        { "hashTag": "water" },
        { "hashTag": "boat" },
        { "hashTag": "island" },
        { "hashTag": "abstract" },
        { "hashTag": "beach" },
        { "hashTag": "city" },
        { "hashTag": "forest" },
        { "hashTag": "quote" },
        { "hashTag": "funny" },
        { "hashTag": "food" },
        { "hashTag": "wallpaper" },
        { "hashTag": "cat" },
        { "hashTag": "dog" },
        { "hashTag": "test" },
        { "hashTag": "test1" },
        { "hashTag": "test2" },
        { "hashTag": "test3" },
        { "hashTag": "test4" },
        { "hashTag": "test5" },
        { "hashTag": "test6" },
        { "hashTag": "test7" },
        { "hashTag": "test8" },
        { "hashTag": "test9" },
        { "hashTag": "test10" },
    ];

    constructor(private _http: HttpClient) { }

    /** Use only for Sign in in LOGIN */
    public Login(request: UserLoginAndReg): Observable<BasicServerResponse> {
        const url: string = Urls.LOGIN_V1;
        return this._http.post<BasicServerResponse>(url, JSON.stringify(request), HTTP_JSON_HEADER);
    }

    /** Use only for Sign up in REGISTER */
    public SignUp(signInfo: UserLoginAndReg): Observable<BasicServerResponse> {
        const url: string = Urls.SIGNUP_V1;
        return this._http.post<BasicServerResponse>(url, JSON.stringify(signInfo), HTTP_JSON_HEADER);
    }

    /** Use only for Share image to email in GALLERY */
    public ShareImgToEmail(email: string): Observable<BasicServerResponse> {
        const url: string = Urls.SHARE_IMG_TO_EMAIL_V1;
        return this._http.post<BasicServerResponse>(url, JSON.stringify(email), HTTP_JSON_HEADER);
    }

    /** Use only for Share image to message in GALLERY */
    public ShareImgToMsg(phone: string): Observable<BasicServerResponse> {
        const url: string = Urls.SHARE_IMG_TO_MSG_V1;
        return this._http.post<BasicServerResponse>(url, JSON.stringify(phone), HTTP_JSON_HEADER);
    }

    /** Use only for Upload image in UPLOAD */
    public UploadImage(file: any): Observable<BasicServerResponse> {
        const url: string = Urls.UPLOAD_IMG_V1;
        return this._http.post<BasicServerResponse>(url, file);
    }

    /** Use only after LOGIN is success */
    public GetMyImg(userName: string, pageNo: number): Observable<GetMyImageResponse> {
        const url: string = Urls.GET_MY_IMG_V1 + "/data=" + userName + "+id=" + pageNo;
        return this._http.get<GetMyImageResponse>(url, HTTP_JSON_HEADER);
    }

    /** Use whenever the user click in the SEARCH page */
    public GetUserImg(userName: string, pageNo: number): Observable<SearchUserNameResponse> {
        const url: string = Urls.GET_USER_IMG_V1 + "/data=" + userName + "+id=" + pageNo;
        return this._http.get<SearchUserNameResponse>(url, HTTP_JSON_HEADER);
    }

    /** Use whenever the user click in the SEARCH page */
    public GetHashTagImg(hashTag: string, pageNo: number): Observable<SearchHashTagResponse> {
        const url: string = Urls.GET_HASHTAG_IMG_V1 + "/data=" + hashTag + "+id=" + pageNo;
        return this._http.get<SearchHashTagResponse>(url, HTTP_JSON_HEADER);
    }

    /** Use whenever the user fill in the SEARCH USER NAME in SEARCH page */
    public SearchUserName(userName: string): Observable<SearchUserNameResponse> {
        const url: string = Urls.SEARCH_USERNAME_V1 + "/data=" + userName;
        return this._http.get<SearchUserNameResponse>(url, HTTP_JSON_HEADER);
    }

    /** Use whenever the user fill in the SEARCH HASHTAG in SEARCH page */
    public SearchHashTag(hashTag: string): Observable<SearchHashTagResponse> {
        const url: string = Urls.SEARCH_HASHTAG_V1 + "/data=" + hashTag;
        return this._http.get<SearchHashTagResponse>(url, HTTP_JSON_HEADER);
    }

    /** Pass data from one page to another functions */
    public passData(dataToBePassed: string) {
        this.data.next(dataToBePassed);
    }

    public passlink(linkToBePassed: string) {
        this.link.next(linkToBePassed);
    }

    public passtimeStamp(timeStampToBePassed: string) {
        this.timeStamp.next(timeStampToBePassed);
    }

    public passid(idToBePassed: number) {
        this.id.next(idToBePassed);
    }





    // *-------------------------TESTING ON LOCAL------------------------------*
    public getImgsTest(payloadID: number, end: number = null) {
        if (!end) {
            return this.testImg.slice(payloadID);
        }
        return this.testImg.slice(payloadID, end);
    }

    public getImgTest(payloadID: number) {
        return this.testImg.slice(0).find(image => image.id == payloadID);
    }

    public getSearchUserTest(payload: string): any {
        return this.testUser.slice(0);
    }

    public getSearchHashTagTest(payload: string): any {
        return this.testHashTags.slice(0);
    }
}
