import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks/:id',
    loadComponent: () => import('./pages/task-detail/task-detail.component').then(m => m.TaskDetailComponent) },
  { path: '**', 
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }, //fallback for unknwon routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
