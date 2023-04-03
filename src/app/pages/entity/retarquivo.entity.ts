/**
 * @description Classe de Retorno de arquivos do sistema
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export enum TipoArquivo
{
    PDF = 1,
    XML = 2,
    TXT = 3,
    EMAIL = 4,
    LINK = 5,
    JPG = 6,
    PNG=7,
    HTM=8
};

export class RetArquivoEntity {

    constructor(public NmFile?:string,
        public SrcBase64?: string,
        public Assunto?: string,
        public De?: string,
        public Para?: string,
        public EnviadoEm?: string,
        public Tipo?: TipoArquivo) { }

}