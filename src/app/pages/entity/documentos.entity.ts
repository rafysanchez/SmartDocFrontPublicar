/**
 * @description Classe de documentos
 * @author Alexandre A. Jacobino
 * @since 1.0.0
 */

import { DocumentosItensEntity } from './documentos.itens.entity';
import { DocumentosFeaturesEntity } from './documentos.features.entity';
import { DocumentosAttachmentEntity } from './documentos.anexos.entity';
import { DocumentosEmail } from './documentos.emails.entity';
import { DocumentosAnnotationsEntity } from './documentos.annotations.entity';

export class DocumentosEntity {

    constructor(public Id?: number,
                public Branch?: string,
                public MODELO?: string,
                public DTPRC?: Date,
                public HRPRC?: Date,
                public DTEMI?: Date,
                public HREMI?: Date,
                public DTINT?: Date,
                public TPNF?: number,
                public NNF?: number,
                public SERIE?: string,
                public VNF?: number,
                public CFOP?: number,
                public CHAVE?: string,
                public REFNFE?: string,
                public REFCTE?: string,
                public CNPJE?: number,
                public XNOMEE?: string,
                public CNPJD?: number,
                public XNOMED?: string,
                public CNPJT?: number,
                public XNOMET?: string,
                public CNPJEX?: number,
                public XNOMEEX?: string,
                public CNPJR?: number,
                public XNOMER?: string,
                public CNPJRE?: number,
                public XNOMERE?: string,
                public COD?: string,
                public DESCR?: string,
                public LINK1?: string,
                public DVENC?: Date,
                public CMUNINI?: number,
                public CMUNFIM?: number,
                public VICMS?: number,
                public VIPI?: number,
                public VPIS?: number,
                public VCOFINS?: number,
                public VISS?: number,
                public VIRRF?: number,
                public VINSS?: number,
                public VCSLL?: number,
                public VOUTRO?: number,
                public VTOTTRIB?: number,
                public VDEDUCAO?: number,
                public VISSRET?: number,
                public STATUS?: number,
                // tslint:disable-next-line: variable-name
                public StatusDoc_Id?: number,
                public TipoDoc?: number,
                public CidadeOri?: string,
                public CidadeDest?: string,
                public CPFD?: string,
                public CPFE?: string,
                public CPFT?: string,
                public CPFEX?: string,
                public CPFR?: string,
                public CPFRE?: string,
                public CSTAT?: string,
                public XMOTIVO?: string,
                public CreatedIn?: Date,
                public UpdatedIn?: Date,
                public Anotacao?: string,
                public DocumentItems?: DocumentosItensEntity[],
                public DocumentFeatures?: DocumentosFeaturesEntity[],
                public DocumentAnnotations?: DocumentosAnnotationsEntity,
                public DocumentAttachments?: DocumentosAttachmentEntity[],
                public DocumentEmails?: DocumentosEmail,
                public DocumentosAnnotations?: DocumentosAnnotationsEntity) { }
}
