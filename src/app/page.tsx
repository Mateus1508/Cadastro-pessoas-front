import TableHead from '@/components/TableHead/TableHead'
import styles from './table.module.css'
import TableBody from '@/components/TableBody/TableBody'
import Link from 'next/link'

const Home = () => {
  return (
		<main className={styles.main}>
				<h1 className={styles.title}>Tabela de pessoas</h1>
			<section className={styles.searchBox}>
				<label htmlFor="nome">Pesquisar nome</label>
				<input type="text" name="nome" id="" />
				<button>Pesquisar</button>
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
