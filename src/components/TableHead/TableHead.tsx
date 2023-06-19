import styles from './tHead.module.css'
const TableHead = () => {
  return (
    <thead >
      <tr className={styles.tHead}>
        <th>Tipo</th>
        <th>Nome/Razão social</th>
        <th>CPF/CNPJ</th>
        <th>DDD/Telefone</th>
        <th>Email</th>
        <th>Endereço</th>
        <th>Número</th>
        <th>Complemento</th>
        <th>Bairro</th>
        <th>Cidade</th>
        <th>CEP</th>
        <th>UF</th>
        <th className={styles.edit}>Editar</th>
        <th className={styles.delete}>Excluir</th>
      </tr>
    </thead>
  )
}

export default TableHead
