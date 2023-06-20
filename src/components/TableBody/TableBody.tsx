'use client'
import { Person } from '@/types/Person'
import styles from './tBody.module.css';
import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import api from '@/services/api';
import Link from 'next/link';
import React from 'react';

type Props = {
  data: Person[] | undefined;
}

const TableBody = ({ data }: Props) => {
  const handleDeletePerson = async (id: number | undefined, nome: string) => {

    if (confirm(`Deseja mesmo excluir o registro de ${nome}? `) == true) {
      try {
        await api.delete(`/pessoa/${id}`);
        return window.alert(`${nome} foi deletado com sucesso!`);
      } catch (error) {
        return window.alert(error);
      }
    }
    else {
      return window.alert('O registro não foi excluído!');
    }
  }
  return (
    <tbody>
      {
        data?.map((pessoa) => {
          return (
            <tr key={pessoa.id}>
              <td>{pessoa.tipoPessoa}</td>
              <td>{pessoa.nome_RazaoSocial}</td>
              <td>{pessoa.cpF_CNPJ}</td>
              <td>{pessoa.telefone}</td>
              <td>{pessoa.email}</td>
              <td>
                {pessoa.endereco.map((endereco) => <td className={styles.td}>{endereco.tipoEndereco}</td>)}
              </td>
              <td>
                {pessoa.endereco.map((endereco) => <td className={styles.td}>{endereco.endereco}</td>)}
              </td>
              <td>
                {pessoa.endereco.map((endereco) => <td className={styles.td}>{endereco.numero}</td>)}
              </td>
              <td>
                {pessoa.endereco.map((endereco) => <td className={styles.td}>{endereco.complemento}</td>)}
              </td>
              <td>
                {pessoa.endereco.map((endereco) => <td className={styles.td}>{endereco.bairro}</td>)}
              </td>
              <td>
                {pessoa.endereco.map((endereco) => <td className={styles.td}>{endereco.cidade}</td>)}
              </td>
              <td>
                {pessoa.endereco.map((endereco) => <td className={styles.td}>{endereco.cep}</td>)}
              </td>
              <td>
                {pessoa.endereco.map((endereco) => <td className={styles.td}>{endereco.uf}</td>)}
              </td>
              <td>
                <Link href={`/edit/${pessoa.id}`}>
                  <AiFillEdit className={styles.icon} size={32} color='green' />
                </Link>
              </td>
              <td>
                <MdDelete className={styles.icon}
                  onClick={() => handleDeletePerson(pessoa.id, pessoa.nome_RazaoSocial)}
                  size={32}
                  color='red' />
              </td>
            </tr>
          )
        })
      }
    </tbody>
  )
}

export default TableBody
