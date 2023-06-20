'use client'

import React from 'react';
import styles from './register.module.css';
import TableAddress from '@/components/TableAddress/TableAddress';
import { Address } from '@/types/Address';
import { Person } from '@/types/Person';
import { maskCpfCnpj } from '@/utils/maskCpfCnpj';
import { validateCpfCnpj } from '@/utils/validateCpfCnpj';
import api from '@/services/api';
import Button from '@/components/Button/Button';
import Link from 'next/link';

const RegisterPerson = () => {
    const [formData, setFormData] = React.useState<Person>({
        cpF_CNPJ: '',
        tipoPessoa: 'Física',
        nome_RazaoSocial: '',
        telefone: '',
        email: '',
        endereco: [],
    });

    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddAddress = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            endereco: [...prevFormData.endereco,
            {
                tipoEndereco: 'Residencial',
            } as Address],
        }));
    };

    const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const newAddress = [...prevFormData.endereco];
            newAddress[index] = {
                ...newAddress[index],
                [name]: name === 'numero' ? parseInt(value) : value,
            };
            console.log(newAddress)
            return {
                ...prevFormData,
                endereco: newAddress,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateCpfCnpj(formData.cpF_CNPJ) == false) {
            window.alert('CPF ou CNPJ inválido!')
        }
        else {
            console.log(formData)
            try {
                await api.post('/pessoa', formData);
                window.alert(`${formData.tipoPessoa == 'Física' ? 'Pessoa' : 'Razão Social'} cadastrada com sucesso!`);
                setFormData({
                    cpF_CNPJ: '',
                    tipoPessoa: 'Física',
                    nome_RazaoSocial: '',
                    telefone: '',
                    email: '',
                    endereco: [],
                });
            } catch (error) {
                window.alert('Todos os dados com * devem ser preenchidos.');
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1>Cadastre uma pessoa</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <section className={styles.formSection}>
                    <div className={styles.inputBox}>
                        <label className={styles.inputTitle} htmlFor="tipoPessoa"><span>*</span>Tipo de pessoa</label>
                        <select id="tipoPessoa" name="tipoPessoa" value={formData.tipoPessoa} onChange={handleChangeField}>
                            <option value="Física">Física</option>
                            <option value="Jurídica">Jurídica</option>
                        </select>
                    </div>
                    <div className={styles.inputBox}>
                        <label className={styles.inputTitle} htmlFor="cpF_CNPJ"><span>*</span>{formData.tipoPessoa == 'Física' ? 'CPF' : 'CNPJ'}</label>
                        <input type="text" id="cpF_CNPJ" name="cpF_CNPJ" value={maskCpfCnpj(formData.cpF_CNPJ)} minLength={formData.tipoPessoa == 'Física' ? 14 : 18} maxLength={formData.tipoPessoa == 'Física' ? 14 : 18} onChange={handleChangeField} />
                    </div>
                    <div className={styles.inputBox}>
                        <label className={styles.inputTitle} htmlFor="nome_RazaoSocial"><span>*</span>{formData.tipoPessoa == 'Física' ? 'Nome' : 'Razão Social'}</label>
                        <input type="text" id="nome_RazaoSocial" name="nome_RazaoSocial" value={formData.nome_RazaoSocial} onChange={handleChangeField} />
                    </div>
                    <div className={styles.inputBox}>
                        <label className={styles.inputTitle} htmlFor="telefone"><span>*</span>Telefone</label>
                        <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleChangeField} />
                    </div>
                    <div className={styles.inputBox}>
                        <label className={styles.inputTitle} htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={formData.email} onChange={handleChangeField} />
                    </div>
                </section>
                <section className={styles.enderecoSection}>
                    <h2 className={styles.subTitle}>Endereço</h2>
                    <div className={styles.enderecoBox}>
                        {formData.endereco.map((endereco, index) => (
                            <TableAddress key={index} index={index} endereco={endereco} onChangeField={handleAddressInputChange} />
                        ))}
                    </div>
                </section>
                <section className={styles.btnSection}>
                    <Button type="submit">Salvar</Button>
                    <Button type='button' onClick={handleAddAddress}>
                        Adicionar endereço
                    </Button>
                    <Link className={styles.link} href='/' type="submit">Voltar</Link>
                </section>
            </form>
        </div>
    );
};

export default RegisterPerson;
