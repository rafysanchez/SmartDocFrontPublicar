/**
 * @description Rota do reset de senha
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Routes } from '@angular/router';
import { ResetpwdComponent } from '../resetpwd/resetpwd.component';

export const ResetPwdRoute: Routes = [
    {
        path: 'resetpwd',
        redirectTo: '../resetpwd'
    },
    {
        path:'resetpwd',
        component: ResetpwdComponent
    },
];