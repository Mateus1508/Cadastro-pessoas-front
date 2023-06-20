'use client'

import React from 'react';
import styles from './edit.module.css';
import TableAddress from '@/components/TableAddress/TableAddress';
import { Address } from '@/types/Address';
import { Person } from '@/types/Person';
import { maskCpfCnpj } from '@/utils/maskCpfCnpj';
import { validateCpfCnpj } from '@/utils/validateCpfCnpj';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import Link from 'next/link';
import Button from '@/components/Button/Button';

const EditPerson = () => {
    const { id } = useParams();
    const router = useRouter();
    const [formData, setFormData] = React.useState<Person>({
        id: 0,
        cpF_CNPJ: '',
        tipoPessoa: 'Física',
        nome_RazaoSocial: '',
        telefone: '',
        email: 'user@example.com',
        endereco: [
            {
                id: 0,
                pessoaId: 0,
                tipoEndereco: 'Residencial',
                endereco: '',
                numero: 0,
                complemento: '',
                bairro: '',
                cep: '',
                cidade: '',
                uf: '',
            },
        ],
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
            endereco: [...prevFormData.endereco, {
                tipoEndereco: 'Residencial',
            } as Address],
        }));
    };
    const handleDeleteAddress = async (enderecoId: number | undefined, enderecoName: string) => {

        if (confirm(`Deseja mesmo excluir o endereço: ${enderecoName}? `) == true) {
            try {
                await api.delete(`/endereco/${enderecoId}`);
                return window.alert(`${enderecoName} foi deletado com sucesso!`);
            } catch (error) {
                return window.alert(error);
            }
        }
        else {
            return window.alert(`${enderecoName} não foi deletado!`);
        }
    }

    const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const newAddress = [...prevFormData.endereco];
            console.log(newAddress);
            newAddress[index] = {
                ...newAddress[index],
                [name]: name === 'numero' ? parseInt(value) : value,
            };
            return {
                ...prevFormData,
                endereco: newAddress,
            };
        });
    };

    React.useEffect(() => {
        api.get(`/pessoa/${id}`)
            .then((res) => {
                setFormData(res.data);
            })
            .catch(
                (erro) => window.alert(`Erro ao retornar dados: ${erro}`)
            );
    }, [formData])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateCpfCnpj(formData.cpF_CNPJ) == false) {
            window.alert('CPF ou CNPJ inválido!')
        }
        else {
            if (confirm(`Deseja mesmo alterar esses dados? `) == true) {

                try {
                    await api.put(`/pessoa/${id}`, formData);
                    router.push('/')
                } catch (error) {
                    window.alert(`Erro ao editar pessoa ${error}`);
                }
            }
            else {
                return window.alert(`Dados não alterados!`);
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1>Editar pessoa</h1>
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
                            <TableAddress key={index} index={index} endereco={endereco} onDelete={handleDeleteAddress} onChangeField={handleAddressInputChange} />
                        ))}

                    </div>
                    <section className={styles.btnSection}>
                        <Button type="submit">Salvar</Button>
                        <Button type="button" onClick={handleAddAddress}>
                            Adicionar endereço
                        </Button>
                        <Link className={styles.link} href='/' type="submit">Voltar</Link>
                    </section>
                </section>
            </form>
        </div>
    );
};

export default EditPerson;
