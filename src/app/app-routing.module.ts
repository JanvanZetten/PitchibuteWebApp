import { AuthGuardService } from './auth-guard.service';
import { WelcomeComponent } from './start/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'download',
    loadChildren: './download/download.module#DownloadModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'uploadfile',
    loadChildren: './shared/file-upload/file-upload.module#FileUploadModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'groupmanager',
    loadChildren: './groups/groups.module#GroupsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'hierachy',
    loadChildren: './shared/hierachy/hierachy.module#HierachyModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
