import React from "react";
import { useFireStore } from "../hooks/useFireStore";
import styles from "../styles/Home.module.css";

const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useFireStore("transactions");
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <button onClick={() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
