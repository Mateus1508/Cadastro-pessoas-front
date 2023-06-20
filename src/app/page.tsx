'use client'

import TableHead from '@/components/TableHead/TableHead'
import styles from './table.module.css'
import TableBody from '@/components/TableBody/TableBody'
import Button from '@/components/Button/Button'
import React from 'react'
import api from '@/services/api'
import { Pessoa } from '@/types/Pessoa'

const Home = () => {
	const [pessoa, setPessoa] = React.useState<Pessoa[]>();
	const [search, setSearch] = React.useState<string>();


	React.useEffect(() => {
		api.get('/pessoa')
			.then((res) => {
				setPessoa(res.data);
			})
			.catch(
				(erro) => window.alert(`Erro ao exibir tabela. ${erro}`)
			);
	}, []);

	const handleSearchByName = () => {
		const filteredByName = pessoa?.filter((repos: Pessoa) => repos.nome_RazaoSocial.toLowerCase().includes(search?.toLowerCase() ?? ''));
		setPessoa(filteredByName);
	}

	return (
		<main className={styles.main}>
			<h1 className={styles.title}>Tabela de pessoas</h1>
			<section className={styles.searchBox}>
				<div className={styles.inputBox}>
					<label htmlFor="nome">Pesquisar por nome</label>
					<input type="text" name="nome" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
				</div>
				<Button children='Pesquisar' onClick={() => handleSearchByName()} />
			</section>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<TableHead />
					<TableBody data={pessoa} />
				</table>
			</div>
		</main>
	)
}

export default Home
