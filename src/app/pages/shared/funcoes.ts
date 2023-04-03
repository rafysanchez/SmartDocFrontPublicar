import { AbstractControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { IGetRowsParams } from 'ag-grid-community';
import { agGridParamEntity } from '../entity';

/**
 * @description Funções genericas para o sistema
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
export class FuncoesGenericas {

    /**
     * 
     * @param Objeto Dados do grid que seão enviados para o back end
     */

    static CriarFiltroGrid(Objeto: any) {
        var datasource = {
            getRows: (params: IGetRowsParams) => {
                const GridParam: agGridParamEntity = new agGridParamEntity();
                GridParam.startRow = params.startRow;
                GridParam.endRow = params.endRow;
                GridParam.filterModel = params.filterModel;
                GridParam.sortModel = params.sortModel;
                GridParam.filterModel = Objeto
            }
        }
        return datasource;

    }

    /**
     *
     * @param controle Função para validar cnpj valido
     */
    static CnpjValido(controle: AbstractControl) {
        if (controle.value === '') { return null; }
        if (controle.value === undefined) { return null; }
        if (controle.value === null) { return null; }

        let c: any = controle.value.toString();
        if (c === "00000000000000") {
            return { CnpjValido: true };
        }
        let b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        if ((c = c.replace(/[^\d]/g, "").split("")).length != 14)
            return { CnpjValido: true };
        for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
        if (c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
            return { CnpjValido: true };
        for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
        if (c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
            return { CnpjValido: true };
        return null;

    };

    static StringCnpjValido(Valor: string) {
        if (Valor !== "") {
            let c: any = Valor;
            if (c === "00000000000000") {
                return false;
            }
            let b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
            if ((c = c.replace(/[^\d]/g, "").split("")).length != 14)
                return false;
            for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
            if (c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
                return false;
            for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
            if (c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
                return false;
            return true;
        } else {
            return true;
        }
    };

    /**
     * @description Formata cnpj direto no controle
     * @param controle Controle a ser formatado
     */
    static FormatarCnpj(controle: AbstractControl) {

        let Valor = this.zeroComplete(controle.value.toString(), true);
        controle.setValue(Valor.toString().replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5"));
    }

    /**
     * @description Função para formatar string com cnpj
     * @param controle String a ser formatada
     */
    static FormatarStringCnpj(valor: any): string {
        let Valor: string = this.zeroComplete(valor.toString(), true);
        return Valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }

    /**
    * @description Formata CPF direto no controle
    * @param controle Controle a ser formatado
    */
    static FormatarCPF(controle: AbstractControl) {

        var Valor = this.zeroComplete(controle.value.toString(), false);
        controle.setValue(Valor.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4"));
    }

    /**
    * @description Função para formatar string com cpf
    * @param controle String a ser formatada
    */
    static FormatarStringCPF(valor: any) {

        var Valor = this.zeroComplete(valor.toString(), false);
        return Valor.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    }

    /**
     * @description Verifica se uma data é válida
     * @param Valor Data a ser validada
     */
    static ValidStringDate(Valor: string) {
        var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])      [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;

        if (!((Valor.match(RegExPattern)) && (Valor != ''))) {
            return false;
        } else
            return true;
    }

    /**
     * @description Função para validar data
     * @param controle Controle a ser validado
     */
    static ValidDate(controle: AbstractControl): { [key: string]: any } {

        if (controle.value === '') { return null; }
        if (controle.value === undefined) { return null; }
        if (controle.value === null) { return null; }

        const Valor = controle.value.toString();
        // tslint:disable-next-line:max-line-length
        const RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])      [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;

        if (Valor === '') {
            return null;
        }

        if (!((Valor.match(RegExPattern)))) {
            return { ValidDate: true };
        } else {
            return null;
        }
    }

    /**
    * @description Função para validar data
    * @param controle Controle a ser validado
    */
    static LowerDate(controle: AbstractControl): { [key: string]: any } {
        let Valor: Date = controle.value;
        let dateToday: any;
        dateToday = formatDate(new Date(), 'dd/MM/yyyy', 'en');

        if (Valor > dateToday) {
            return { ValidDate: true };
        } else {
            return null;
        }
    }




    /**
     * @description Completa com zeros a esquerda a string maximo 14
     * @param value Valor a ser formatado
     * @param cnpj Se o campo é cnpj(true) ou cnpj(false)
     */
    private static zeroComplete(value: string, cnpj: boolean): string {
        let noCharReg = value;
        let Tamanho: number = 14;
        let regLength = value.length;

        if (!cnpj) {
            Tamanho = 11;
        }

        if (regLength < Tamanho) {
            let ret = '';
            for (let i = regLength; i < Tamanho; i++) {
                ret += '0';
            }
            ret += noCharReg;
            return ret;
        } else {
            return noCharReg;
        }
    }

    /**
     * @description função para transformar objeto em url query string
     * @param params Objeto a ser convertido em query string
     */
    static toHttpParams(params: any) {
        return Object.getOwnPropertyNames(params)
            .reduce((p, key) => p.set(key, params[key] === undefined ? null : params[key]), new HttpParams());
    }


    /**
     * @description função para formatar moeda
     * @param numero numero a ser formatado
     * @param decimal quantidade de casas decimais
     */
    static numberToReal(numero: any, decimal: number) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: decimal }).format(numero);
    }
}
