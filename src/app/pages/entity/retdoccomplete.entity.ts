/**
 * @description Classe de Retorno dos documentos com arquivos
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
import { DocumentosEntity } from './documentos.entity';
import { RetArquivoEntity } from './retarquivo.entity';

/**
 * @description Classe de manifestações
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class RetDocCompleteEntity {

    constructor(public DocumentHeader?: DocumentosEntity,
                public RetArquivo?: Array<RetArquivoEntity>){}

}
