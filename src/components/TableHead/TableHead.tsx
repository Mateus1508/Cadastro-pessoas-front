import styles from './tHead.module.css'
const TableHead = () => {
  return (
    <thead className={styles.tHead}>
      <tr>
        <th style={{ width: '100px' }}>Tipo</th>
        <th style={{ width: '200px' }}>Nome/Razão social</th>
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
        <th>Editar</th>
        <th className='tdDelete'>Excluir</th>
      </tr>
    </thead>
  )
}

export default TableHead
