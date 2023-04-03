/* *
 * @description Classe de documentos email
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */


export class DocumentosEmail {

    constructor(public Id?: number,
                public Branch?: string,
                public DOMIN?: string,
                public DTENV?: Date,
                public HRENV?: Date,
                public DTPRC?: Date,
                public HRPRC?: Date,
                public DTINT?: Date,
                public HRINT?: Date,
                public SENDE?: number,
                public RECEI?: string,
                public SUBJE?: string,
                public SIZEE?: number,
                public ORIGE?: string,
                public BODY?: string,
                public CreatedIn?: Date,
                public UpdatedIn?: Date) { }
}
