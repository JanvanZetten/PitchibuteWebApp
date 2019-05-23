import { AddItemComponent } from './../add-item/add-item.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HierachyModule } from '../hierachy/hierachy.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddItemComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    HierachyModule
  ]
})
export class HomeModule { }
