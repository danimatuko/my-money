// styles
import TransactionForm from "../components/TransactionForm";
import styles from "../styles/Home.module.css";

// components

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>transaction list</div>
      <div className={styles.sidebar}>
        <TransactionForm />
      </div>
    </div>
  );
}
