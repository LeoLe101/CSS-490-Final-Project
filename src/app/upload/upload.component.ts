import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { BasicServerResponse } from '../interfaces/iType';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

    public selectedFile: any;
    public message: string;
    public checker: boolean = false;

    constructor(
        private _service: ApiService,
    ) { }

    public onFileSelected(event: any): void {
        console.log(event);
        this.selectedFile = <File>event.target.files[0];
    }

    public onUpload(): void {
        this.checker = false;
        if (!this.selectedFile) {
            this.checker = true;
            this.message = "Please select the file to upload first before uploading.";
            return;
        }
        const fileData = new FormData();
        fileData.append('image', this.selectedFile, this.selectedFile.name);
        this._service.UploadImage(fileData).subscribe((response: BasicServerResponse) => {
            console.log(response);
            if (!response.status) {
                this.checker = true;
                this.message = response.msg;
            }
        });
    }

}
