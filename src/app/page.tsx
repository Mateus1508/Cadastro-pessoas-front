'use client'

import TableHeadFoot from '@/components/TableHeadFoot/TableHeadFoot'
import styles from './table.module.css'
import TableBody from '@/components/TableBody/TableBody'
import Button from '@/components/Button/Button'
import React from 'react'
import api from '@/services/api'
import { Person } from '@/types/Person'

const Home = () => {
	const [pessoa, setPerson] = React.useState<Person[]>();
	const [filter, setFilter] = React.useState<Person[]>();
	const [search, setSearch] = React.useState<string>();


	React.useEffect(() => {
		api.get('/pessoa')
			.then((res) => {
				setPerson(res.data);
				setFilter(res.data);
			})
			.catch(
				(erro) => window.alert(`Erro ao exibir tabela. ${erro}`)
			);
	}, [pessoa]);

	const handleSearchByName = () => {
		const filteredByName = pessoa?.filter((repos: Person) => repos.nome_RazaoSocial.toLowerCase().includes(search?.toLowerCase() ?? ''));
		setFilter(filteredByName);
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
					<TableHeadFoot />
					<TableBody data={filter} />
					<TableHeadFoot />
				</table>
			</div>
		</main>
	)
}

export default Home
