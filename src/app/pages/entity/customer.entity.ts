import { GrupoEntity } from '.';

/**
 * @description Classe de customer
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class CustomerEntity {

    constructor(public Id?: number,
                public Branch?: string,
                public CNPJ?: bigint,
                public Name?: string,
                public Description?: string,
                public Active?: boolean,
                public NameCnpj?: string,
                public DtVencCert?: Date,
                public Groups?: GrupoEntity[],
                public CreatedIn?: Date,
                public UpdatedIn?: Date,
                public Token?: string,
                public Todos?: boolean) { }

}