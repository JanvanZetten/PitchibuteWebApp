import { WelcomeComponent } from './start/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'uploadfile',
    loadChildren: './shared/file-upload/file-upload.module#FileUploadModule'
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
