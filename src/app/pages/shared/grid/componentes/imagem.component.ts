import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-image-renderer',
   template: '<i class="fa {{icon}}" (click)="onClick($event)" matTooltip="{{tooltip}}"></i>'

})

export class ImageRendererComponent implements ICellRendererAngularComp {

    params;
    icon: string;
    tooltip: string;

    agInit(params): void {
      this.params = params;
      this.icon = this.params.icon || null;
      this.tooltip = this.params.tooltip || null;
    }

    refresh(params?: any): boolean {
      return true;
    }

    onClick($event) {
      if (this.params.onClick instanceof Function) {
        const params = {
          event: $event,
          rowData: this.params.node.data
        };
        this.params.onClick(params);
      }
    }
  }
