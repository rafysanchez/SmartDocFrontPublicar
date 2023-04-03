/**
 * @description Classe de retorno dos layouts do grid
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */

export class GridLayoutRetEntity {

    constructor(public Id?: number,
                public Name?: string,
                public Description?: string,
                // tslint:disable-next-line:variable-name
                public ColumnsTableTypes_Id?: number,
                // tslint:disable-next-line:variable-name
                public GridLayoutGridFields_Id?: number,
                public DsTable?: string,
                public DsColumn?: string,
                public NmColumn?: string,
                public DataType?: string) { }

}