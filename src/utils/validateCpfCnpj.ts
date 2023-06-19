import { cpf, cnpj } from 'cpf-cnpj-validator';

export const validateCpfCnpj = (value: string) => {
    value = value.replace(/[./-]/g, "");
    console.log(value)
    if (value.length == 11) 
        return cpf.isValid(value);
    else if (value.length == 14)
        return cnpj.isValid(value);
}