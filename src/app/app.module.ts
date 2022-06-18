import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from 'src/app/services/http/custom-interceptor';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER } from 'ngx-ui-loader';
import { CookieModule } from 'ngx-cookie';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { TopBarComponent } from './components/templates/top-bar/top-bar.component';
import { UnAuthorizedComponent } from './components/templates/un-authorized/un-authorized.component';
import { Error404Component } from './components/templates/error404/error404.component';
import { SideBarComponent } from './components/templates/side-bar/side-bar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/templates/dashboard/dashboard.component';
import { DashboardResolveService } from './services/resolvers/dashboard-resolve.service';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: 'red',
  fgsPosition: POSITION.centerCenter,
  fgsType: SPINNER.rectangleBounce,
  hasProgressBar: false,

  bgsPosition: POSITION.centerCenter,
  bgsColor: 'red'
}

@NgModule({
  declarations: [
    AppComponent,
    UnAuthorizedComponent,
    HeaderComponent,
    TopBarComponent,
    Error404Component,
    SideBarComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    // FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    CookieModule.forRoot()
    // SweetAlert2Module.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }, DashboardResolveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
