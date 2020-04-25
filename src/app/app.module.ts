import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { CodeEditorModule } from './code-editor';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { servicesArray } from './../services/';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {CompanyComponent} from './company/company.component';
import { SignInCmpComponent } from './company/sign-in/sign-in-cmp.component';
import { SignUpCmpComponent } from './company/sign-up/sign-up-cmp.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import {MCQTestComponent} from './mcqtest/mcqtest.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import { UserService } from './shared/user.service';
import {CompanyService} from './shared/company.service';
import {McqService} from './shared/mcq.service';
import {CodeService} from './shared/code.service';

import {appRoutes} from './routes';
import { AuthGuard } from '../auth/auth.guard';
import { AuthInterceptor } from '../auth/auth.interceptor';

import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { ReactiveFormsModule  } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
//import { DialogModule } from '@syncfusion/ej2-angular-popups';
import {MatIconModule} from '@angular/material/icon';
import { EventComponent } from './event/event.component';
import { HomeComponent } from './home/home.component';
import { CodingtestComponent } from './codingtest/codingtest.component';
import { UploadQuestionsComponent } from './upload-questions/upload-questions.component';
import { PostEventComponent } from './post-event/post-event.component';
import { AdminComponent } from './admin/admin.component';
import { ViewtestComponent } from './viewtest/viewtest.component';
import { RatingComponent } from './rating/rating.component';
import { ResultComponent } from './result/result.component';
import { ErrorComponent } from './error/error.component';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    UserComponent,
    CompanyComponent,
    SignUpComponent,
    SignInComponent,
    SignInCmpComponent,
    SignUpCmpComponent,
    CompanyProfileComponent,
    UserProfileComponent,
    MCQTestComponent,
    EventComponent,
    HomeComponent,
    CodingtestComponent,
    UploadQuestionsComponent,
    PostEventComponent,
    AdminComponent,
    ViewtestComponent,
    RatingComponent,
    ResultComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CodeEditorModule,
    FormsModule,RichTextEditorAllModule,
    MatSliderModule, MatStepperModule, ReactiveFormsModule, MatTabsModule, MatSelectModule, BrowserAnimationsModule, MatRadioModule, MatInputModule, MatCardModule, MatIconModule, MatButtonModule, RichTextEditorModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, UserService,CompanyService,McqService,CodeService , servicesArray],
  bootstrap: [AppComponent]
})

export class AppModule { }
