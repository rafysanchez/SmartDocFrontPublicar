/**
 * @description Classe de documentos email email
 * @author Delio Darwin
 * @since 1.0.0
 */


export class DocumentEmailEmailEntity {

    constructor(public Id?: number,
                public DOMIN?: string,
                public DTENV?: Date,
                public HRENV?: Date,
                public SENDE?: number,
                public RECEI?: string,
                public SUBJE?: string) { }
}
