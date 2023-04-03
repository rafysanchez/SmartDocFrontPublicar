/**
 * @description Componente do cabeçalho de página do sistema
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
   @Input() heading: string;
   @Input() icon: string;
   @Input() complemento: string;
  constructor(private router: Router) { }

  ngOnInit() { }

  redirectToHome() {
    this.router.navigate(['principal/home']);
  }
}
