/* *
 * @description Classe de filtro deo layout do grid
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
import { GrupoEntity } from './grupos.entity';

export class GridLayoutFilterEntity {

    constructor(public Id?: number,
                public UserId?: number,
                public Modelo?: string,
                public Table?: string,
                public Branch?: string,
                public Groups?: GrupoEntity[]) {}

}
