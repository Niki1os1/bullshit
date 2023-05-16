import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UploadVideoComponent} from "./upload-video/upload-video.component";
import {SaveVideoDetailsComponent} from "./save-video-details/save-video-details.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {LogoutComponent} from "./logout/logout.component";
import {CourseCreateComponent} from "./course-create/course-create.component";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  {
    path: 'upload-video', component: UploadVideoComponent,
  },
  {
    path: 'save-video-details/:videoId', component: SaveVideoDetailsComponent,
  },

  {
    path: 'registration', component: RegisterPageComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },{
    path: 'logout', component: LogoutComponent,
  },
  { path: '**', redirectTo: 'login' },

  // { path: 'table-list',     component: TableListComponent },
  // { path: 'typography',     component: TypographyComponent },
  // { path: 'icons',          component: IconsComponent },
  // { path: 'maps',           component: MapsComponent },
  // { path: 'notifications',  component: NotificationsComponent },
  // { path: 'upgrade',        component: UpgradeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
