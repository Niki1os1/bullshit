import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import {CourseCreateComponent} from "../../course-create/course-create.component";

export const AdminLayoutRoutes: Routes = [
    { path: '',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    {
      path: 'course-create', component: CourseCreateComponent
    },
];
