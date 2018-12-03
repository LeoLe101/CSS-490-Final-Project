import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FilterPipe } from './pipe/filter.pipe';
import { UploadComponent } from './upload/upload.component';
// import { InfiniteScrollerDirective } from './infinite-scroller.directive';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        AboutUsComponent,
        RegisterComponent,
        NavMenuComponent,
        HeaderComponent,
        SearchComponent,
        GalleryComponent,
        FilterPipe,
        UploadComponent,
        // InfiniteScrollerDirective,
    ],
    imports:[
 CommonModule,
NgtUniversalModule,
 
        
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [    ],
    providers: [
        ApiService
    ],
})
export class AppModule { }
