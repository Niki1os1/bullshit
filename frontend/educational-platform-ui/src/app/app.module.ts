import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxFileDropModule} from "ngx-file-drop";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {ComponentsModule} from "./components/components.module";
import {CourseService} from "./_services/course.service";
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_interceptors/token.interceptor';
import { VideoDetailsComponent } from './video-details/video-details.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {MatCardModule} from "@angular/material/card";
import {AdminLayoutModule} from "./layouts/admin-layout/admin-layout.module";

@NgModule({
    declarations: [
        AppComponent,

        RegisterPageComponent,
        LoginComponent,
        LogoutComponent,
        AdminLayoutComponent,
        VideoDetailsComponent,

    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatSnackBarModule,
    ComponentsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token'); // Получение токена из локального хранилища
        },
      }
    }),
    MatDividerModule,
    MatLegacyChipsModule,
    MatCardModule,
    AdminLayoutModule
  ],
    providers: [CourseService, JwtHelperService,
        {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
