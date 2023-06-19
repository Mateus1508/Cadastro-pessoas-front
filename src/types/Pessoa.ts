import { Endereco } from './Endereco';

export type Pessoa = {
    id?: number;
    cpF_CNPJ: string;
    tipoPessoa: 'Física' | 'Jurídica';
    nome_RazaoSocial: string;
    telefone: string;
    email: string;
    endereco: Endereco[];
}