/**
 * @description Classe de retorno do grid
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */

// tslint:disable-next-line:class-name
export class agGridReturnEntity {

    constructor(public success: boolean,
                public rows: object,
                public lastRow: number) { }

}