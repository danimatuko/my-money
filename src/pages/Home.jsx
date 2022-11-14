// styles
import TransactionForm from "../components/TransactionForm";
import styles from "../styles/Home.module.css";
import { useAuthContext } from "../hooks/useAuthContext";

// components

export default function Home() {
  const { user } = useAuthContext();
  return (
    <div className={styles.container}>
      <div className={styles.content}>transaction list</div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
