import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-checkbox-renderer',
    template: '<input type="checkbox" value="{{value}}" (click)="onClick($event)" matTooltip="{{tooltip}}" />'

})

export class CheckboxRenderComponent implements ICellRendererAngularComp {

    params;
    value: string;
    tooltip: string;

    agInit(params): void {
        this.params = params;
        this.value = this.params.value || null;
        this.tooltip = this.params.tooltip || null;
    }

    refresh(params?: any): boolean {
        return true;
    }

    onClick($event) {
        if (this.params.onClick instanceof Function) {
            const params = {
                event: $event,
                rowData: this.params.node.data,
                checked: $event.currentTarget.checked
            };
            this.params.onClick(params);
        }
    }
}
