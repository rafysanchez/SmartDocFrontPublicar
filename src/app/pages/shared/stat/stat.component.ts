import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: string;
    @Input() label: string;
    @Input() imodel: any;
    @Input() documento: string;
    @Input() data: number;
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router) {}

    ngOnInit() {}

    redirectTo(model: any) {
      if (model.toString() === 'EmailsNProcessados') {
        this.router.navigate(['principal/intemail']);
      } else {
            this.router.navigate(['principal/documentos'], { queryParams: { modelo: model, Tipo: 1 },
                                  skipLocationChange: true });
      }
    }

}
