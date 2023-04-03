/**
 * @description Classe de Retorno do sap
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class SapResponseEntity {

    constructor(public Branch?:string,
        public Description?: string,
        public MessageId?: string,
        public Message?: string,
        public isOk?: boolean,
        public ShowMessage?: boolean,
        public CanLogIn?: boolean,
        public NeedChangePassword?: boolean) { }

}