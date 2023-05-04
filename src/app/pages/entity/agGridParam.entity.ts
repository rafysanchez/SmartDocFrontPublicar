/**
 * @description Classe de dados do grid
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */


export class AgGridParamEntity {

    constructor(public startRow?: number,
                public endRow?: number,
                public filterModel?: string,
                public groupKeys?: object[],
                public pivotCols?: object[],
                public pivotMode?: boolean,
                public rowGroupCols?: object[],
                public sortModel?: object[],
                public valueCols?: object[],
                public filterData?: any,
                public Token?: string) { }

}
