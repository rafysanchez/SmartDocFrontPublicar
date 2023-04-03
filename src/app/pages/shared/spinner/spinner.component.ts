/**
 * @description Componente do loading de página
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
  }

  Mostrar(): void {
    this.spinner.show();
  }

  Fechar(): void {
    this.spinner.hide();
  }
}
