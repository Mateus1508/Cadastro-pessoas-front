import styles from './button.module.css';

type Props = {
    children: String;
    onClick?: () => void;
}

const Button = ({ onClick, children }: Props) => {
    return <button onClick={onClick} className={styles.button}>{children}</button>;
}

export default Button;