import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import {MainPageComponent} from './Pages/main-page/main-page.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../auth/auth.guard';
import {CompanyComponent} from './company/company.component';
import {SignInCmpComponent} from './company/sign-in/sign-in-cmp.component';
import {SignUpCmpComponent} from './company/sign-up/sign-up-cmp.component';
import {CompanyProfileComponent} from './company-profile/company-profile.component';
import {MCQTestComponent} from './mcqtest/mcqtest.component';
import {EventComponent} from './event/event.component';
import {HomeComponent} from './home/home.component';
import {CodingtestComponent} from './codingtest/codingtest.component';
import {UploadQuestionsComponent} from './upload-questions/upload-questions.component';
import {PostEventComponent} from './post-event/post-event.component';
import {AdminComponent} from './admin/admin.component';
import {ViewtestComponent} from './viewtest/viewtest.component';
import {RatingComponent} from './rating/rating.component';
import {ResultComponent} from './result/result.component';
import {ErrorComponent} from './error/error.component';
export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
      path: 'login', component: UserComponent,
      children: [{ path: '', component: SignInComponent }]
  },

  {
    path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'signupcmp', component: CompanyComponent,
    children: [{ path: '', component: SignUpCmpComponent }]
  },
  {
    path: 'logincmp', component: CompanyComponent,
    children: [{ path: '', component: SignInCmpComponent }]
  },
  {
    path: 'companyprofile', component: CompanyProfileComponent, canActivate: [AuthGuard]
  },
  {
      path: 'code', component: MainPageComponent,
  },
  {
      path: 'home', component: HomeComponent,
  },
  {
    path: 'PostCode', component: CodingtestComponent,
  },
  {
    path: 'PostQuestions/:ename', component: UploadQuestionsComponent,
  },

  {
    path: 'showEvent', component: EventComponent,
  },
  {
    path: 'postEvent', component: PostEventComponent,
  },
  {
    path: 'admin', component: AdminComponent,
  },
  {
    path: 'viewTest/:ename', component: ViewtestComponent,
  },
  {
    path: 'giveRating', component: RatingComponent,
  },
  {
    path: 'result', component: ResultComponent,
  },
  {
    path: 'error', component: ErrorComponent,
  },



];
