import { UserEntity } from './user.entity';

/**
 * @description Classe de manifestações
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class ManifestacoesEntity{

    constructor(public Id?: number,
                public Modelo?: string,
                public DescManifestacao?: string,
                public TipoManifestacao?: boolean,
                public Usuario?: UserEntity[]
        ) {}

}
