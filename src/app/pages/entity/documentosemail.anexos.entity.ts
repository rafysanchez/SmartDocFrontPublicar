/**
 * @description Classe de documentos email anexos
 * @author Delio Darwin
 * @since 1.0.0
 */


export class DocumentosEmailAttachmentEntity {

    constructor(public Id?: number,
                public INDEC?: string,
                public NOME?: string,
                public TYPE?: string,
                public SIZEA?: number,
                public FILEA?: string) { }
}
