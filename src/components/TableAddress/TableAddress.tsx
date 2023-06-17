import styles from './tableAddress.module.css';

const TableAddress = () => {
    return (
        <div>
            <input type="hidden" name="endereço" value='' />

            <div className={styles.inputBox}>
                <label htmlFor="tipo">Tipo de endereço</label>
                <select name="tipo" id="">
                    <option value="residencial">Residencial</option>
                    <option value="comercial">Comercial</option>
                </select>
            </div>

            <div className={styles.inputBox}>
                <label htmlFor="endereço"><span>*</span>Endereço</label>
                <input type="text" name="endereço" />
            </div>

            <div className={styles.inputBox}>
                <label htmlFor="numero">Número</label>
                <input type="text" name="numero" />
            </div>

            <div className={styles.inputBox}>
                <label htmlFor="complemento">Complemento</label>
                <input type="text" name="complemento" />
            </div>

            <div className={styles.inputBox}>
                <label htmlFor="bairro"><span>*</span>Bairro</label>
                <input type="text" name="bairro" />
            </div>

            <div className={styles.inputBox}>
                <label htmlFor="cep"><span>*</span>CEP</label>
                <input type="text" name="cep" />
            </div>

            <div className={styles.inputBox}>
                <label htmlFor="cidade"><span>*</span>Cidade</label>
                <input type="text" name="cidade" />
            </div>

            <div className={styles.inputBox}>
                <label htmlFor="uf"><span>*</span>UF</label>
                <input type="text" name="uf" />
            </div>
        </div>
    );
}

export default TableAddress;