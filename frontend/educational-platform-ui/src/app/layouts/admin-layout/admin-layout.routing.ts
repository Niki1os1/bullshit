import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import {CourseCreateComponent} from "../../course-create/course-create.component";
import {MyCourseComponent} from "../../my-course/my-course.component";
import {UploadVideoComponent} from "../../upload-video/upload-video.component";
import {SaveVideoDetailsComponent} from "../../save-video-details/save-video-details.component";
import {VideoOfTheCourseComponent} from "../../video-of-the-course/video-of-the-course.component";
import {CourseVideosComponent} from "../../course-videos/course-videos.component";
import {VideoDetailsComponent} from "../../video-details/video-details.component";

export const AdminLayoutRoutes: Routes = [
    { path: '',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    {
      path: 'course-create', component: CourseCreateComponent
    },
  {
      path: 'my-course', component: MyCourseComponent
    },
  {
    path: 'upload-video/:courseId', component: UploadVideoComponent,
  },
  {
    path: 'save-video-details/:videoId', component: SaveVideoDetailsComponent,
  },
  {
    path: 'course/:courseId/videos', component: VideoOfTheCourseComponent,
  },
  {
    path: 'view-courses/:courseId', component: CourseVideosComponent,
  },
  {
    path: 'video-details/:videoId', component: VideoDetailsComponent,
  },
];
