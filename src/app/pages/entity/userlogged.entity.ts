import { ManifestacoesEntity } from './manifestacoes.entity';

/**
 * @description Classe de retorno do login do sistema
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class UserLoggedEntity {

    constructor(public Id?: number,
                public Name?: string,
                public Email?: string,
                public IsAdmin?: boolean,
                public Manifestacoes?: ManifestacoesEntity[]
        ) {}

}
