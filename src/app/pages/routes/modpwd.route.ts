/**
 * @description Rota da modificação de senha
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Routes } from '@angular/router';
import { ModpwdComponent } from '../modpwd/modpwd.component';

export const ModpwdRoute: Routes = [
    {
        path: 'modpwd',
        redirectTo: '../modpwd'
    },
    {
        path:'modpwd',
        component: ModpwdComponent
    },
];