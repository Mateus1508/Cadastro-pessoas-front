'use client'

import { Address } from '@/types/Address';
import styles from './tableAddress.module.css';
import React from 'react';
import Button from '../Button/Button';
import { MdDelete } from 'react-icons/md';

interface Props {
    index: number;
    endereco: Address;
    onChangeField: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, index: number) => void;
    onDelete?: (enderecoId: number | undefined, enderecoName: string) => void;
}

const TableAddress: React.FC<Props> = ({ index, endereco, onChangeField, onDelete }) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Endereço {index + 1} {onDelete && <MdDelete color='red' className={styles.icon} onClick={() => onDelete(endereco.id, endereco.endereco)} />}</h3>
            <div className={styles.inputBox}>
                <label className={styles.inputTitle} htmlFor='tipoEndereco'>Tipo de endereço</label>
                <select id='tipoEndereco' name='tipoEndereco' value={endereco.tipoEndereco} onChange={(e) => onChangeField(e, index)}>
                    <option value='Residencial'>Residencial</option>
                    <option value='Comercial'>Comercial</option>
                </select>
            </div>
            <div className={styles.inputBox}>
                <label className={styles.inputTitle} htmlFor='endereco'><span>*</span>Endereço</label>
                <input type='text' id='endereco' name='endereco' value={endereco.endereco} onChange={(e) => onChangeField(e, index)} />
            </div>
            <div className={styles.inputBox}>
                <label className={styles.inputTitle} htmlFor='numero'>Número</label>
                <input type='number' id='numero' name='numero' value={endereco.numero} onChange={(e) => onChangeField(e, index)} />
            </div>
            <div className={styles.inputBox}>
                <label className={styles.inputTitle} htmlFor='complemento'>Complemento</label>
                <input type='text' id='complemento' name='complemento' value={endereco.complemento} onChange={(e) => onChangeField(e, index)} />
            </div>
            <div className={styles.inputBox}>
                <label className={styles.inputTitle} htmlFor='bairro'><span>*</span>Bairro</label>
                <input type='text' id='bairro' name='bairro' value={endereco.bairro} onChange={(e) => onChangeField(e, index)} />
            </div>
            <div className={styles.inputBox}>
                <label className={styles.inputTitle} htmlFor='cep'><span>*</span>CEP</label>
                <input type='text' id='cep' name='cep' value={endereco.cep} onChange={(e) => onChangeField(e, index)} />
            </div>
            <div className={styles.inputBox}>
                <label className={styles.inputTitle} htmlFor='cidade'><span>*</span>Cidade</label>
                <input type='text' id='cidade' name='cidade' value={endereco.cidade} onChange={(e) => onChangeField(e, index)} />
            </div>
            <div className={styles.inputBox}>
                <label className={styles.inputTitle} htmlFor='uf'><span>*</span>UF</label>
                <input type='text' id='uf' name='uf' value={endereco.uf} onChange={(e) => onChangeField(e, index)} />
            </div>

        </div>
    );
};

export default TableAddress;
