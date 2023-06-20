export type Endereco = {
    id?: number;
    pessoaId?: number;
    tipoEndereco: 'Residencial' | 'Comercial';
    endereco: string;
    numero: number;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
}