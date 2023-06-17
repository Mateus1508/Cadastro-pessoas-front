import TableHead from '@/components/TableHead/TableHead'
import styles from './table.module.css'
import TableBody from '@/components/TableBody/TableBody'
import Link from 'next/link'
import Button from '@/components/Button/Button'

const Home = () => {
	return (
		<main className={styles.main}>
			<h1 className={styles.title}>Tabela de pessoas</h1>
			<section className={styles.searchBox}>
				<div className={styles.inputBox}>
					<label htmlFor="nome">Pesquisar por nome</label>
					<input type="text" name="nome" id="" />
				</div>
				<Button children='Pesquisar' />
				<Link className={styles.addButton} href={'/register'}>Adicionar nova pessoa</Link>
			</section>
			<table className={styles.table}>
				<TableHead />
				<TableBody />
			</table>
		</main>
	)
}

export default Home
