// styles
import TransactionForm from "../components/TransactionForm";
import styles from "../styles/Home.module.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";
import TransactionList from "../components/TransactionList";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt"]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error ? (
          <p>{error}</p>
        ) : documents ? (
          <TransactionList transactions={documents} />
        ) : (
          <h1>No Transactions</h1>
        )}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
