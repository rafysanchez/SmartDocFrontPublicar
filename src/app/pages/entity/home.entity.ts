/**
 * @description Classe de documentos
 * @author Delio Darwin
 * @since 1.0.0
 */

export class HomeEntity {

    constructor(public Branch?: string,
                public TotalNFe?: string,
                public TotalNFSe?: string,
                public TotalCTe?: string,
                public TotalNaoProcessado?: string,
                public Token?: string) { }
}
