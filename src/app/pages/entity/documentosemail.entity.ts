/**
 * @description Classe de documentos
 * @author Delio Darwin
 * @since 1.0.0
 */

import { DocumentStatusEmailsEntity } from './documentosemail.status.entity';
import { DocumentosEmailAttachmentEntity } from './documentosemail.anexos.entity';
import { DocumentEmailEmailEntity } from './documentosemail.emails.entity';


export class DocumentosEmailEntity {

    constructor(public Branch?: string,
                public MODELO?: string,
                public DTINT?: Date,
                public HRINT?: Date,
                public DTPRC?: Date,
                public HRPRC?: Date,
                public IDEME?: string,
                public INDOC?: string,

                public DocumentosEmailStatus?: DocumentStatusEmailsEntity[],
                public DocumentosEmailAttachment?: DocumentosEmailAttachmentEntity[],
                public DocumentosEmailEmail?: DocumentEmailEmailEntity[]) {}
}
