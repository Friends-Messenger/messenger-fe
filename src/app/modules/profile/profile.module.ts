import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModules } from '../shared/shared.modules';

export const routes: Routes = [
  { path: '', component: MainComponent }
];

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    SharedModules,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
