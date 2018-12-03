// --------------DATA INTERFACE--------------//
export class UserLoginAndReg {
    userName: string;
    password: string;
}

// --------------BASIC SERVER RESPONSE--------------//
export class BasicServerResponse {
    status: boolean;
    msg: string;
}

// --------------BASIC IMG RESPONSE----------------//
export class DataResponse {
    link: string;
    timeStamp: string;
    id: string;
}

// --------------BASIC IMG LIST RESPONSE-----------//
export class ImgListResponse {
    imgs: DataResponse[];
}

// ------BASIC IMG LIST FROM USER NAME RESPONSE-------//
export class GetUserNameResponse {
    imgList: DataResponse[];
}

// ------BASIC IMG LIST FROM HASH TAG RESPONSE-------//
export class GetHashTagResponse {
    imgList: DataResponse[];
}

// ------BASIC IMG LIST FROM MY IMG RESPONSE-------//
export class GetMyImageResponse extends GetUserNameResponse {}

// ------BASIC USER LIST FROM SEARCH USER RESPONSE-------//
export class SearchUserNameResponse {
    items: string[];
}

// ------BASIC HASHTAG LIST FROM SEARCH HASHTAG RESPONSE-------//
export class SearchHashTagResponse {
    items: string[];
}

// ------ENVIRONMENT-------//
export interface IEnvironment {
    readonly IsProduction: boolean;
    readonly Urls: {
        readonly Api: string;
        readonly Client: string;
    };
}
