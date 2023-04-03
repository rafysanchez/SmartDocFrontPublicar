import { CidadesEntity } from './cidades.entity';

/**
 * @description Classe de estados
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */


export class EstadosEntity {

    constructor(public Id?: number,
                public Nome?: string,
                public Sigla?: string,
                public Cidades?: CidadesEntity[]) { }

}
