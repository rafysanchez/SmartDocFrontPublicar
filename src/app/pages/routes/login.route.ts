/**
 * @description Rota do login
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';

export const LoginRoute: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        redirectTo: '../login'
    },
    {
        path:'login',
        component: LoginComponent
    },
];