/**
 * @description Classe de documentos email status
 * @author Delio Darwin
 * @since 1.0.0
 */


export class DocumentStatusEmailsEntity {

    constructor(public Id?: number,
                public DESCR?: string,
                public DTOCC?: string,
                public HROCC?: string,
                public STATU?: number) { }
}
