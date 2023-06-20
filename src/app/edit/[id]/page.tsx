'use client'

import React from 'react';
import styles from './edit.module.css';
import TableAddress from '@/components/TableAddress/TableAddress';
import { Endereco } from '@/types/Endereco';
import { Pessoa } from '@/types/Pessoa';
import { maskCpfCnpj } from '@/utils/maskCpfCnpj';
import { validateCpfCnpj } from '@/utils/validateCpfCnpj';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import Link from 'next/link';

const EditPeople = () => {
    const { id } = useParams();
    const router = useRouter();

    const [formData, setFormData] = React.useState<Pessoa>({
        cpF_CNPJ: '',
        tipoPessoa: 'Física',
        nome_RazaoSocial: '',
        telefone: '',
        email: '',
        endereco: [],
    });

    React.useEffect(() => {
        api.get(`pessoa/${id}`)
            .then((res) => {
                setFormData(res.data);
                console.log(res.data.tipoPessoa)
            })
            .catch(
                (erro) => window.alert(`Erro ao retornar dados da pessoa: ${erro}`)
            );
    }, [])

    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddAddress = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            endereco: [...prevFormData.endereco, {} as Endereco],
        }));
    };

    const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const newEndereco = [...prevFormData.endereco];
            console.log(newEndereco);
            newEndereco[index] = {
                ...newEndereco[index],
                [name]: name === 'numero' ? parseInt(value) : value,
            };
            return {
                ...prevFormData,
                endereco: newEndereco,
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
                await api.put(`/pessoa/${id}`, formData);
                setFormData({
                    cpF_CNPJ: '',
                    tipoPessoa: 'Física',
                    nome_RazaoSocial: '',
                    telefone: '',
                    email: '',
                    endereco: [],
                });
                router.push('/')
            } catch (error) {
                window.alert(`Erro ao editar pessoa ${error}`);
            }
        }
    };

    return (
        <div>
            <h1>Editar pessoa</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="tipoPessoa">Tipo de pessoa</label>
                    <select id="tipoPessoa" name="tipoPessoa" value={formData.tipoPessoa} onChange={handleChangeField}>
                        <option value="Física">Física</option>
                        <option value="Jurídica">Jurídica</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="cpF_CNPJ"><span>*</span>{formData.tipoPessoa == 'Física' ? 'CPF' : 'CNPJ'}</label>
                    <input type="text" id="cpF_CNPJ" name="cpF_CNPJ" value={maskCpfCnpj(formData.cpF_CNPJ)} minLength={formData.tipoPessoa == 'Física' ? 14 : 18} maxLength={formData.tipoPessoa == 'Física' ? 14 : 18} onChange={handleChangeField} />
                </div>
                <div>
                    <label htmlFor="nome_RazaoSocial"><span>*</span>{formData.tipoPessoa == 'Física' ? 'Nome' : 'Razão Social'}</label>
                    <input type="text" id="nome_RazaoSocial" name="nome_RazaoSocial" value={formData.nome_RazaoSocial} onChange={handleChangeField} />
                </div>
                <div>
                    <label htmlFor="telefone"><span>*</span>Telefone</label>
                    <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleChangeField} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" value={formData.email} onChange={handleChangeField} />
                </div>
                <div>
                    <h2>Endereço</h2>
                    {formData.endereco.map((endereco, index) => (
                        <TableAddress key={index} index={index} endereco={endereco} onChangeField={handleAddressInputChange} />
                    ))}
                    <button type="button" onClick={handleAddAddress}>
                        Adicionar endereço
                    </button>
                </div>
                <button type="submit">Salvar</button>
                <Link href='/' type="submit">Voltar</Link>
            </form>
        </div>
    );
};

export default EditPeople;
