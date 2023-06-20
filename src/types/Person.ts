import { Address } from './Address';

export type Person = {
    id?: number;
    cpF_CNPJ: string;
    tipoPessoa: 'Física' | 'Jurídica';
    nome_RazaoSocial: string;
    telefone: string;
    email: string;
    endereco: Address[];
}