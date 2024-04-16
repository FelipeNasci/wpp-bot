import { MenuOptions } from "../../../interface";

export enum SO {
  ANDROID = "1",
  LINUX = "2",
  WINDOWS = "3",
  MACOS = "4",
}

export const SETUP_WIFI: MenuOptions = {
  message: "Qual o sistema que você gostaria de suporte?",
  options: {
    [SO.ANDROID]: "ANDROID",
    [SO.LINUX]: "LINUX",
    [SO.WINDOWS]: "WINDOWS",
    [SO.MACOS]: "MACOS/iOS",
  },
};

const ANSWER_ANDROID = `SIGA ESTES PASSOS PARA REALIZAR SUA CONFIGURAÇÃO DE INTERNET NO ANDROID

*1*: Procure pela rede UfpbSemFios.
*2*: Selecione Método EAP: PEAP.
*3*: Autenticação de Fase 2: MSCHAPV2
*4*: Certificado CA: (não especificado).
*5*: Identidade: seu usuário do sistema SIGAA / SIGRH.
*6*: Identidade anônima: deixe em branco.
*7*: Senha: senha do sistema SIGAA / SIGRH.
*8*: Conectar!`;

const ANSWER_LINUX = `SIGA ESTES PASSOS PARA REALIZAR SUA CONFIGURAÇÃO DE INTERNET NO LINUX

*1*: Procure pela rede UfpbSemFios.
*2*: Segurança Wi-FI: WPA & WPA2 empresas.
*3*: Autenticação: TLS encapsulado.
*4*: Identidade anônima: deixe em branco.
*5*: Certificado CA: (Nenhum). Marque a opção “Nenhum certificado CA é necessário.
*6*: Autenticação interna: MSCHAPv2.
*7*: Nome de usuário: seu usuário do sistema SIGAA / SIGRH.
*8*: Senha: senha do sistema SIGAA / SIGRH.
*9*: Conectar!`;

const ANSWER_WINDOWS = `SIGA ESTES PASSOS PARA REALIZAR SUA CONFIGURAÇÃO DE INTERNET NO WINDOWS

*1*: Baixe e execute o aplicativo de configuração da rede UfpbSemFios disponível no endereço:
*2*: Procure pela rede UfpbSemFios.
*3*: Nome de usuário: seu usuário do sistema SIGAA / SIGRH.
*4*: Senha: senha do sistema SIGAA / SIGRH.
*5*: Conectar!`;

const ANSWER_MACOS = `SIGA ESTES PASSOS PARA REALIZAR SUA CONFIGURAÇÃO DE INTERNET NO MACOS / iOS

*1*: Procure pela rede UfpbSemFios.
*2*: Nome de usuário: seu usuário do sistema SIGAA / SIGRH.
*3*: Senha: senha do sistema SIGAA / SIGRH.
*4*: Conectar!`;

export const ANSWER_SETUP_WIFI = {
  [SO.ANDROID]: ANSWER_ANDROID,
  [SO.LINUX]: ANSWER_LINUX,
  [SO.WINDOWS]: ANSWER_WINDOWS,
  [SO.MACOS]: ANSWER_MACOS,
} as const;
