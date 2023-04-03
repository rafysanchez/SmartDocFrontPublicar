import { LanguageTranslationModule } from './language-translation.module';

/**
 * @description Função para traduzir as mensagens de erro
 * @author Alexandre A Jacobino
 * @since 1.0.0
 * @param Mensagem Mensagem de erro a ser traduzida, caso não ache no dicionário devolve ela mesma
 * @param Translation Componente de tradução do sistema
 */
export function TraduzirErro(Mensagem: string, Translation: LanguageTranslationModule) {
    let Retorno: string;
    switch (Mensagem) {
        case 'E-mail não pertence ao sistema.':
            Retorno = Translation.TransString('MsgErroNPertence');
            break;
        case 'Não localizamos seu usuário no sistema, favor entrar em contato com o administrador.':
            Retorno = Translation.TransString('MsgErroUsrNExiste');
            break;
        case 'Registro WEB desativado ou expirado':
            Retorno = Translation.TransString('MsgErroRegWeb');
            break;
        case 'Usuário ou senha inválido':
            Retorno = Translation.TransString('MgsErroUsrInvalido');
            break;
        case 'Não localizamos seu usuário no sistema, favor entrar em contato com o administrador.':
            Retorno = Translation.TransString('MsgErroUsrNExiste');
            break;
        case 'Não existem relatórios no workspace.':
            Retorno = Translation.TransString('MsgErroPowerBiRel');
            break;
        case 'Falha ao autenticar o usuário na microsoft.':
            Retorno = Translation.TransString('MsgErroPowerBiLogin');
            break;
        case 'Não foram encontrados relatórios.':
            Retorno = Translation.TransString('MsgErroPowerBiRelNExiste');
            break;
        case 'Ocorreu um erro ao tentar carregar relatório.':
            Retorno = Translation.TransString('MsgErroPowerBi');
            break;
        case 'Sessão Expirada':
            Retorno = Translation.TransString('SessaoExpirada');
            break;
        case 'MsgDadosSalvos':
            Retorno = Translation.TransString('MsgDadosSalvos');
            break;
        case 'MsgDadosErro':
            Retorno = Translation.TransString('MsgDadosErro');
            break;
        case 'rowGroupColumnsEmptyMessage':
            Retorno = Translation.TransString('rowGroupColumnsEmptyMessage');
            break;
        case 'MgsDadosExcluidos':
            Retorno = Translation.TransString('MgsDadosExcluidos');
            break;
        case 'MsgDadosExcluirErro':
            Retorno = Translation.TransString('MsgDadosExcluirErro');
            break;
        case 'Usuário ja cadastrado.':
            Retorno = Translation.TransString('MsgDadosUserExiste');
            break;
        case 'MsgAdmin':
            Retorno = Translation.TransString('MsgAdmin');
            break;
        case 'E-mail ja cadastrado.':
            Retorno = Translation.TransString('MsgEmailExiste');
            break;
        case 'MsgEmailRegWeb':
            Retorno = Translation.TransString('MsgEmailRegWeb');
            break;
        case 'MsgDocNEncontrado':
            Retorno = Translation.TransString('MsgDocNEncontrado');
            break;
        case 'MsgDocNExiste':
            Retorno = Translation.TransString('MsgDocNExiste');
            break;
        case 'MsgErroDtEmiDe':
            Retorno = Translation.TransString('MsgErroDtEmiDe');
            break;
        case 'MsgErroDtEmiAte':
            Retorno = Translation.TransString('MsgErroDtEmiAte');
            break;
        case 'MsgFiltroCfopAte':
            Retorno = Translation.TransString('MsgFiltroCfopAte');
            break;
        case 'MsgFiltroCfopDe':
            Retorno = Translation.TransString('MsgFiltroCfopDe');
            break;
        case 'MsgFiltroNfDe':
            Retorno = Translation.TransString('MsgFiltroNfDe');
            break;
        case 'MsgFiltroNfpAte':
            Retorno = Translation.TransString('MsgFiltroNfpAte');
            break;
        case 'MsgFiltroDtEmiDe':
            Retorno = Translation.TransString('MsgFiltroDtEmiDe');
            break;
        case 'MsgFiltroDtEmiAte':
            Retorno = Translation.TransString('MsgFiltroDtEmiAte');
            break;
        case 'MsgFiltroDtEmiDeInv':
            Retorno = Translation.TransString('MsgFiltroDtEmiDeInv');
            break;
        case 'MsgFiltroDtEmiAteInv':
            Retorno = Translation.TransString('MsgFiltroDtEmiAteInv');
            break;
        case 'MsgFiltroCnpjEmiDe':
            Retorno = Translation.TransString('MsgFiltroCnpjEmiDe');
            break;
        case 'MsgFiltroCnpjEmiAte':
            Retorno = Translation.TransString('MsgFiltroCnpjEmiAte');
            break;
        case 'MsgFiltroCnpjEmiDeInv':
            Retorno = Translation.TransString('MsgFiltroCnpjEmiDeInv');
            break;
        case 'MsgFiltroCnpjEmiAteInv':
            Retorno = Translation.TransString('MsgFiltroCnpjEmiAteInv');
            break;
        case 'MsgFiltroCnpjDestDe':
            Retorno = Translation.TransString('MsgFiltroCnpjDestDe');
            break;
        case 'MsgFiltroCnpjDestAte':
            Retorno = Translation.TransString('MsgFiltroCnpjDestAte');
            break;
        case 'MsgFiltroCnpjDestDeInv':
            Retorno = Translation.TransString('MsgFiltroCnpjDestDeInv');
            break;
        case 'MsgFiltroCnpjDestAteInv':
            Retorno = Translation.TransString('MsgFiltroCnpjDestAteInv');
            break;
        case 'MsgDadosInvalidos':
            Retorno = Translation.TransString('MsgDadosInvalidos');
            break;
        case 'MsgSelMani':
            Retorno = Translation.TransString('MsgSelMani');
            break;
        case 'MsgOkMani':
            Retorno = Translation.TransString('MsgOkMani');
            break;
        case 'MsgNotMani':
            Retorno = Translation.TransString('MsgNotMani');
            break;
        case 'MsgNoExLayout':
            Retorno = Translation.TransString('MsgNoExLayout');
            break;
        case 'MsgFiltroConhDe':
            Retorno = Translation.TransString('MsgFiltroConhDe');
            break;
        case 'MsgFiltroConhAte':
            Retorno = Translation.TransString('MsgFiltroConhAte');
            break;
        case 'MsgValExport':
            Retorno = Translation.TransString('MsgValExport');
            break;
        default:
            Retorno = Mensagem;
            break;
    }

    return Retorno;

}