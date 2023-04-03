/**
 * @description Classe de documentos anexos
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */


export class DocumentosAttachmentEntity {

    constructor(public Id?: number,
                public Branch?: string,
                public INDEC?: string,
                public NOME?: string,
                public TYPE?: string,
                public SIZEA?: number,
                public FILEA?: string,
                public CreatedIn?: Date,
                public UpdatedIn?: Date) { }
}
