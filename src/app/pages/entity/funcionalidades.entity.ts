import { UserEntity } from './user.entity';

/**
 * @description Classe de funcionalidades
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class FuncionalidadesEntity{

    constructor(public Id?:number,
                public Descricao?:string,
                public DsMenuPrinc?:string,
                public TipoDoc?:string,
                public CaminhoNovo?:string,
                public FuncClickNovo?:string,
                public IconeNovo?:string,
                public Ordem?:number,
                public Usuario?:UserEntity[]){}

}
