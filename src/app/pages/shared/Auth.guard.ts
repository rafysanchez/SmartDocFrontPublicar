/**
 * @description Componente para validar se a rota esta logada 
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';      

@Injectable({      
   providedIn: 'root'      
})      
export class AuthGuard implements CanActivate {      
   constructor(private router: Router) { }      
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
      if (this.isLoggedIn()) {      
      return true;      
      }      
   this.router.navigate(['/login']);      
return false;      
}      
public isLoggedIn(): boolean {      
   let status = false;      
   if (localStorage.getItem('isLoggedIn') == "true") {      
      status = true;      
   }    
   else {      
      status = false;      
      }      
   return status;      
   }    
}    