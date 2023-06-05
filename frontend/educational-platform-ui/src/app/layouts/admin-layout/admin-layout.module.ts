import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {CourseCreateComponent} from "../../course-create/course-create.component";
import {HttpClientModule} from "@angular/common/http";
import {NgxFileDropModule} from "ngx-file-drop";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatChipsModule} from "@angular/material/chips";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { DecimalPipe, LowerCasePipe } from '@angular/common';
import {DialogContentExampleDialog, MyCourseComponent} from "../../my-course/my-course.component";
import {MatDialogModule} from "@angular/material/dialog";
import {UploadVideoComponent} from "../../upload-video/upload-video.component";
import {SaveVideoDetailsComponent} from "../../save-video-details/save-video-details.component";
import {
  DialogContentDeleteVideoDialog,
  VideoOfTheCourseComponent
} from "../../video-of-the-course/video-of-the-course.component";
import {VideoCardComponent} from "../../video-card/video-card.component";
import {MatCardModule} from "@angular/material/card";
import {AppModule} from "../../app.module";
import {VideoPlayerComponent} from "../../video-player/video-player.component";
import {VgControlsModule} from "@videogular/ngx-videogular/controls";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play";
import {VgBufferingModule} from "@videogular/ngx-videogular/buffering";
import {CourseVideosComponent} from "../../course-videos/course-videos.component";
import {MatMenuModule} from "@angular/material/menu";
import {
  PaginatorOverviewExample,
  ViewAnswerComponent
} from "../../view-answer/view-answer.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AdminPanelComponent, DialogContentDeleteUserDialog} from "../../admin-panel/admin-panel.component";
import {RatingModule} from "ngx-bootstrap/rating";




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
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
    MatDialogModule,
    MatCardModule,
    // AppModule,
    MatCardModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatTooltipModule,
    MatMenuModule,
    MatPaginatorModule,
    RatingModule

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    DashboardComponent,
    UserProfileComponent,
    CourseCreateComponent,
    UploadVideoComponent,
    SaveVideoDetailsComponent,
    DialogContentExampleDialog,
    DialogContentDeleteVideoDialog,
    DialogContentDeleteUserDialog,
    VideoOfTheCourseComponent,
    VideoCardComponent,
    MyCourseComponent,
    VideoPlayerComponent,
    CourseVideosComponent,
    ViewAnswerComponent,
    PaginatorOverviewExample,
    AdminPanelComponent

  ],
  exports: [
    VideoPlayerComponent
  ],
  providers: [
    DecimalPipe,
    LowerCasePipe]
})

export class AdminLayoutModule {}
