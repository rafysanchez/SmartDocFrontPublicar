import { ManifestacoesEntity } from './manifestacoes.entity';
import { UserLoggedEntity } from './userlogged.entity';
import { FuncionalidadesEntity } from './funcionalidades.entity';
import { GrupoEntity } from './grupos.entity';

/**
 * @description Classe de retorno do login do sistema
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class LoginSapResponse {

    constructor(public UserLogged?: UserLoggedEntity,
                public Branch?: string,
                public MessageId?: string,
                public Message?: string,
                public ShowMessage?: boolean,
                public CanLogIn?: boolean,
                public NeedChangePassword?: boolean,
                public Token?: string,
                public Mensagem?: string[],
                public Groups?: GrupoEntity[],
                public Manifestacoes?: ManifestacoesEntity[],
                public Funcoes?: Map<string, FuncionalidadesEntity[]>
        ) {}

}
