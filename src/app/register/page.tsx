'use client'

import axios from 'axios';
import styles from './register.module.css'
import TableAddress from '@/components/TableAddress/TableAddress';
import React from 'react';
import Button from '@/components/Button/Button';

const Register = () => {

    const [addAddress, setAddAddress] = React.useState(false);

    /* const postPessoa = axios
        .post(`${BaseUrl}/pessoa`, {
            title: "Hello World!",
            body: "This is a new post."
        })
        .then((response) => {

        }); */

    const handleAddNewAddress = () => {
        setAddAddress(!addAddress);
    }
    return (
        <div className={styles.container}>
            <h1>Cadastre uma pessoa</h1>
            <div className={styles.content}>
                <form action="" className={styles.form}>
                    <section className={styles.formSection}>
                        <h2 className={styles.formTitle}>Informações pessoais</h2>

                        <div className={styles.inputBox}>
                            <label className={styles.inputTitle} htmlFor="tipo-pessoa"><span>*</span>Tipo de pessoa</label>
                            <select name="tipo-pessoa" id="">
                                <option value="fisica">Física</option>
                                <option value="juridica">Jurídica</option>
                            </select>
                        </div>

                        <div className={styles.inputBox}>
                            <label className={styles.inputTitle} htmlFor="nome"><span>*</span>Nome</label>
                            <input type="text" name="nome" />
                        </div>

                        <div className={styles.inputBox}>
                            <label className={styles.inputTitle} htmlFor="CPF"><span>*</span>CPF</label>
                            <input type="text" name="CPF" />
                        </div>

                        <div className={styles.inputBox}>
                            <label className={styles.inputTitle} htmlFor="email"><span>*</span>Email</label>
                            <input type="email" name="email" />
                        </div>

                        <div className={styles.inputBox}>
                            <label className={styles.inputTitle} htmlFor="telefone"><span>*</span>Telefone</label>
                            <input type="number" name="telefone" />
                        </div>
                        <Button children={'Salvar'} />
                    </section>
                </form>
                <section className={styles.enderecoSection}>
                    <h2 className={styles.formTitle}>Endereço</h2>

                    <TableAddress />
                    {addAddress === true && <TableAddress />}
                    <Button onClick={handleAddNewAddress} children={addAddress == false ? "Adicionar novo endereço" : "remover endereço"} />
                </section>
            </div>
        </div>
    )
}

export default Register
