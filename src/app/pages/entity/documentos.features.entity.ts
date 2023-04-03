/**
 * @description Classe de documentos features
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */

export class DocumentosFeaturesEntity {

    constructor(public Id?: number,
                public Branch?: string,
                public INDEC?: string,
                public FEATURE?: string,
                public VALUE?: string,
                public CreatedIn?: Date,
                public UpdatedIn?: Date) { }
}
