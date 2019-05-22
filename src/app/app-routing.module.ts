import { WelcomeComponent } from './start/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'download',
    loadChildren: './download/download.module#DownloadModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'uploadfile',
    loadChildren: './shared/file-upload/file-upload.module#FileUploadModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
