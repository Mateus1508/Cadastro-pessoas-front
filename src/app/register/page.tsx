'use client'
import axios from 'axios';
import styles from './register.module.css'
import TableAddress from '@/components/TableAddress/TableAddress';
import React from 'react';

const Register = () => {

    const [bool, setBool] = React.useState(false);
    React.useEffect(() => {
    }, []);
    /* const postPessoa = axios
        .post(`${BaseUrl}/pessoa`, {
            title: "Hello World!",
            body: "This is a new post."
        })
        .then((response) => {

        }); */

    const handleAddNewAddress = () => {
        setBool(true);
    }
    return (
        <div className={styles.container}>
            <h1>Cadastre uma pessoa</h1>
            <form action="" className={styles.form}>
                <section className={styles.formSection}>
                    <h2 className={styles.formTitle}>Informações pessoais</h2>

                    <div className={styles.inputBox}>
                        <label htmlFor="tipo-pessoa">Tipo de pessoa</label>
                        <input type="text" name="tipo-pessoa" />
                    </div>

                    <div className={styles.inputBox}>
                        <label htmlFor="nome">Nome</label>
                        <input type="text" name="nome" />
                    </div>

                    <div className={styles.inputBox}>
                        <label htmlFor="CPF">CPF</label>
                        <input type="text" name="CPF" />
                    </div>

                    <div className={styles.inputBox}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" />
                    </div>

                    <div className={styles.inputBox}>
                        <label htmlFor="telefone">Telefone</label>
                        <input type="number" name="telefone" />
                    </div>
                </section>

                <section className={styles.formSection}>
                    <h2 className={styles.formTitle}>Endereço</h2>

                    <TableAddress />
                    {bool === true && <TableAddress />}
                    <button onClick={handleAddNewAddress}>Novo endereço</button>
                </section>
            </form>
        </div>
    )
}

export default Register
