import { CustomerEntity } from './customer.entity';

/**
 * @description Classe de Emails
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class EmailEntity {

    constructor(public Id?: number,
                public Branch?: string,
                public Mail?: string,
                public Service?: string,
                public Protocol?: string,
                public Port?: string,
                public User?: string,
                public Password?: string,
                public Address?: string,
                public SSL?: boolean,
                public Active?: boolean,
                public CustomerId?: number,
                public Customer?: CustomerEntity,
                public IsDelete?: boolean,
                public ClientId?: string,
                public ClientSecret?: string,
                public TenantId?: string,
                public CreatedIn?: Date,
                public UpdatedIn?: Date,
                public Token?: string) { }

}
