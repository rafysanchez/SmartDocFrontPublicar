/**
 * @description Classe de cadastro do usuário
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */

import { UserEntity } from './user.entity';
import { SapResponseEntity } from './sapresponse.entity';

export class UserSapResponseEntity {

    constructor(public User?: UserEntity,
                public SAPResponse?: SapResponseEntity) { }

}
