/**
 * @description Classe de documentos filtro
 * @author Delio Darwin
 * @since 1.0.0
 */


export class DocumentosEmailFiltrosEntity {

    constructor(public Branch?: string,
                public DTENVstart?: string,
                public DTENVend?: string,
                public SENDE?: string,
                public Token?: string) { }
}
