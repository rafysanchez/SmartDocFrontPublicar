/* *
 * @description Classe de colunas do grid
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */

import { GridLayoutEntity } from './grid.layout.entity';

export class GridLayoutFieldEntity {

    // tslint:disable-next-line: variable-name
    constructor(public ColumnsTableTypes_Id?: number,
                public Ordenacao?: number,
                public GridLayout?: GridLayoutEntity) {}

}
