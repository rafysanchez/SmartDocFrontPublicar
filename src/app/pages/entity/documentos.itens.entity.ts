/* *
 * @description Classe de documentos itens
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class DocumentosItensEntity {

    constructor(public Id?: number,
                public Branch?: string,
                public NITEM?: string,
                public XPED?: string,
                public NITEMPED?: string,
                public CHAVE?: string,
                public CFOP?: number,
                public CPROD?: string,
                public XPROD?: string,
                public NCM?: number,
                public QCOM?: number,
                public UCOM?: string,
                public VPROD?: number,
                public VPIS?: number,
                public VCOFINS?: number,
                public VISS?: number,
                public VIRRF?: number,
                public VINSS?: number,
                public VCSLL?: number,
                public VOUTRO?: number,
                public VTOTTRIB?: number,
                public VDEDUCAO?: number,
                public VISSRET?: number,
                public CLISTSERV?: string,
                public PICMS?: number,
                public PIPI?: number,
                public PPIS?: number,
                public PCOFINS?: number,
                public PCSLL?: number,
                public PISS?: number,
                public PIRRF?: number,
                public PINSS?: number,
                public PISSRET?: number,
                public VIPI?: number,
                public VICMS?: number,
                public CentroCusto?: string,
                public CreatedIn?: Date,
                public UpdatedIn?: Date) { }
}
