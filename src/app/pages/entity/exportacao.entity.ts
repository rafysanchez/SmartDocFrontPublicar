import { UserEntity } from './user.entity';

/**
 * @description Classe de exportações
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class ExportacaoEntity {
   
    constructor(public Id?: number,
                public UserId?: number,
                public DocType?: string,
                public NmExport?: string,
                public DsFilter?: string,
                public Generate?: boolean,
                public DsMensagem?: string,
                public Branch?: string,
                public CreatedIn?: Date,
                public UpdatedIn?: Date,
                public Token?: string) { }

}