import { Routes } from '@angular/router';
import { ListaTaskComponent } from './lista-task/lista-task.component';
import { ListaUserComponent } from './lista-user/lista-user.component';

export const routes: Routes = [
    { path: 'users', component: ListaUserComponent },
    { path: 'task', component: ListaTaskComponent },
];
