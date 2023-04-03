import { UserEntity } from './user.entity';

/**
 * @description Classe de Log do sistema
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class LogEntity {
    constructor(public Id?: number,
                public Category?: string,
                public Function?: string,
                public Description?: string,
                public Email?: string,
                public UserId?: number,
                public User?: UserEntity,
                public Branch?: string,
                public CreatedIn?: Date) { }
}
