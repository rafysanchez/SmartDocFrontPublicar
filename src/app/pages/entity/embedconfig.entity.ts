/**
 * @description Entidade para retorno dos relatórios do power bi
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
export class EmbedConfigEntity {

    constructor(public Id?: string,
                public EmbedUrl?: string,
                public EmbedToken?: any,
                public MinutesToExpiration?: number,
                public IsEffectiveIdentityRolesRequired?: boolean,
                public IsEffectiveIdentityRequired?: boolean,
                public EnableRls?: boolean,
                public UserName?: string,
                public Roles?: string,
                public ErroMessage?: string) {}

}
