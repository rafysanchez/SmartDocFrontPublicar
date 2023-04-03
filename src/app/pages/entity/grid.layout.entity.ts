import { GridLayoutFieldEntity } from './grid.layout.fields.entity';

/* *
 * @description Classe de colunas do grid
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */

export class GridLayoutEntity {
    constructor(public Id?: number,
                public Branch?: string,
                public Name?: string,
                // tslint:disable-next-line: variable-name
                public User_Id?: number,
                public CreatedIn?: Date,
                public UpdatedIn?: Date,
                public GridLayoutGridFields?: GridLayoutFieldEntity[]) {}

}
