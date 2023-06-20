'use client'

import { Endereco } from '@/types/Endereco';
import React from 'react';

interface Props {
    index: number;
    endereco: Endereco;
    onChangeField: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, index: number) => void;
}

const TableAddress: React.FC<Props> = ({ index, endereco, onChangeField }) => {
    return (
        <div>
            <h3>Endereço {index + 1}</h3>
            <div>
                <label htmlFor='tipoEndereco'>Tipo de endereço</label>
                <select id='tipoEndereco' name='tipoEndereco' value={endereco.tipoEndereco} onChange={(e) => onChangeField(e, index)}>
                    <option value='Residencial'>Residencial</option>
                    <option value='Comercial'>Comercial</option>
                </select>
            </div>
            <div>
                <label htmlFor='endereco'><span>*</span>Endereço</label>
                <input type='text' id='endereco' name='endereco' value={endereco.endereco} onChange={(e) => onChangeField(e, index)} />
            </div>
            <div>
                <label htmlFor='numero'>Número</label>
                <input type='number' id='numero' name='numero' value={endereco.numero} onChange={(e) => onChangeField(e, index)} />
            </div>
            <div>
                <label htmlFor='complemento'>Complemento</label>
                <input type='text' id='complemento' name='complemento' value={endereco.complemento} onChange={(e) => onChangeField(e, index)} />
            </div>
            <div>
                <label htmlFor='bairro'><span>*</span>Bairro</label>
                <input type='text' id='bairro' name='bairro' value={endereco.bairro} onChange={(e) => onChangeField(e, index)} />
            </div>
            <div>
                <label htmlFor='cep'><span>*</span>CEP</label>
                <input type='text' id='cep' name='cep' value={endereco.cep} onChange={(e) => onChangeField(e, index)} />
            </div>
            <div>
                <label htmlFor='cidade'><span>*</span>Cidade</label>
                <input type='text' id='cidade' name='cidade' value={endereco.cidade} onChange={(e) => onChangeField(e, index)} />
            </div>
            <div>
                <label htmlFor='uf'><span>*</span>UF</label>
                <input type='text' id='uf' name='uf' value={endereco.uf} onChange={(e) => onChangeField(e, index)} />
            </div>
        </div>
    );
};

export default TableAddress;
