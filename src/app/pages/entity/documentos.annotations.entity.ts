import { IntmailService } from '../intmail/intmail.service';

/* *
 * @description Classe de documentos valores
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */
export class DocumentosAnnotationsEntity {

    constructor(public Id?: number,
                public Branch?: string,
                public Anotacao?: string,
                public DocumentHeader_Id?: number,
                public CreatedIn?: Date,
                public UpdatedIn?: Date) { }
}
