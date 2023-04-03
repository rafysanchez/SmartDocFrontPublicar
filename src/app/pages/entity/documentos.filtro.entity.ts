/* *
 * @description Classe de documentos filtro
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */


export class DocumentosFiltrosEntity {

    constructor(public Branch?: string,
                public MODELO?: string,
                public DocumentType?: string,
                public CFOPstart?: number,
                public CFOPend?: number,
                public NNFstart?: number,
                public NNFend?: number,
                public DTPRCstart?: string,
                public DTPRCend?: string,
                public DTEMIstart?: string,
                public DTEMIend?: string,
                public CNPJEstart?: number,
                public CNPJEend?: number,
                public CNPJDstart?: number,
                public CNPJDend?: number,
                public CNPJTstart?: number,
                public CNPJTend?: number,
                public CNPJEXstart?: number,
                public CNPJEXend?: number,
                public CMUNINI?: string,
                public CMUNFIM?: number,
                public TPNF?: number,
                public CHAVE?: string,
                public NNF?: string,
                public IdUser?: number,
                public Token?: string) { }
}
