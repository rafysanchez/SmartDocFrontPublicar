import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';

/**
 * @description Classe de grupo do sistema
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class GrupoEntity {

    constructor(
        public Id?: number,
        public Name?: string,
        public Description?: string,
        public Active?: boolean,
        public Ativo?: boolean,
        public Groups?: GrupoEntity[],
        public Customers?: CustomerEntity[],
        public Users?: UserEntity[],
        public Branch?: string,
        public CreatedIn?: Date,
        public UpdatedIn?: Date,
        public Token?: string) { }

}