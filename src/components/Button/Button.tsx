import styles from './button.module.css';

type Props = {
    children: String;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({ onClick, children, type }: Props) => {
    return <button type={type} onClick={onClick} className={styles.button}>{children}</button>;
}

export default Button;