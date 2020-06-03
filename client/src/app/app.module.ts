import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSignupComponent } from './auth/login-signup.component';
import { HeaderComponent } from './header/header.component';
import { Notification } from './notification/notification.component';
import { ReportComponent } from './report/report.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginSignupComponent,
        Notification,
        ReportComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
