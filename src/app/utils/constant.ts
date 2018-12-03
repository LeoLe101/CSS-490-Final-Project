import { HttpHeaders } from '@angular/common/http';

export class Urls {
    // Base URL
    static readonly API_V1 = ``;
    // URL depend on functionalities
    static readonly LOGIN_V1 = `${Urls.API_V1}/login`;
    static readonly SIGNUP_V1 = `${Urls.API_V1}/register`;
    static readonly GET_MY_IMG_V1 = `${Urls.API_V1}/getmyimage`;
    static readonly UPLOAD_IMG_V1 = `${Urls.API_V1}/uploadimage`;
    static readonly SEARCH_USERNAME_V1 = `${Urls.API_V1}/searchusername`;
    static readonly SEARCH_HASHTAG_V1 = `${Urls.API_V1}/searchhashtag`;
    static readonly GET_USER_IMG_V1 = `${Urls.API_V1}/getuserimage`;
    static readonly GET_HASHTAG_IMG_V1 = `${Urls.API_V1}/gethashtag`;
    static readonly SHARE_IMG_TO_EMAIL_V1 = `${Urls.API_V1}/sharetoemail`;
    static readonly SHARE_IMG_TO_MSG_V1 = `${Urls.API_V1}/sharetomsg`;
}

export const JSON_CONTENT_TYPE = { 'Content-Type': 'application/json' };
export const HTTP_JSON_HEADER = { headers: new HttpHeaders(JSON_CONTENT_TYPE) };
/** Regex */
export const EMAIL_VALIDATOR: RegExp = /^\s*([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)\s*$/i;
export const US_PHONE_VALIDATOR: RegExp = /^\s*(?:\+1?)?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i;
