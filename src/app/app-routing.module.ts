/**
 * @description Módulo principal de rotas do sistema
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './pages/shared';
import { LoginRoute, ResetPwdRoute, ModpwdRoute } from './pages/routes';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'principal', loadChildren: () => import('./pages/principal/principal.module').then(m =>
    m.PrincipalModule), canActivate: [AuthGuard] },
  ...LoginRoute,
  ...ResetPwdRoute,
  ...ModpwdRoute

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
