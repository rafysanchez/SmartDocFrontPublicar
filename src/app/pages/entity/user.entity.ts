import { FuncionalidadesEntity } from './funcionalidades.entity';
import { ManifestacoesEntity } from './manifestacoes.entity';
import { GrupoEntity } from './grupos.entity';

export class UserEntity {

    constructor(public Id?: number,
                public Branch?: string,
                public Email?: string,
                public Name?: string,
                public Description?: string,
                public Reset?: boolean,
                public Active?: boolean,
                public Admin?: boolean,
                public SendEmail?: boolean,
                public QtdDias?: number,
                public Groups?: GrupoEntity[],
                public Funcoes?: FuncionalidadesEntity[],
                public Manifestacoes?: ManifestacoesEntity[],
                public CreatedIn?: Date,
                public UpdatedIn?: Date,
                public Token?: string) { }

}
