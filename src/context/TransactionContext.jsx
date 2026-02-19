import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { AuthContext } from "./AuthContext";

export const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTransactions(data);   // 🔥 RAW DATA
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // 🔥 Memoized Filtering & Sorting (does NOT affect raw transactions)
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter((t) => {
      const matchesSearch = t.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesType =
        filterType === "all" ? true : t.type === filterType;

      return matchesSearch && matchesType;
    });

    if (sortOption === "newest") {
      filtered.sort(
        (a, b) =>
          (b.createdAt?.seconds || 0) -
          (a.createdAt?.seconds || 0)
      );
    } else if (sortOption === "amount-high") {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (sortOption === "amount-low") {
      filtered.sort((a, b) => a.amount - b.amount);
    }

    return filtered;
  }, [transactions, searchTerm, filterType, sortOption]);

  const addTransaction = async (transaction) => {
    await addDoc(collection(db, "transactions"), {
      ...transaction,
      userId: user.uid,
      createdAt: Timestamp.now(),
    });
  };

  const updateTransaction = async (id, updatedData) => {
    await updateDoc(doc(db, "transactions", id), updatedData);
  };

  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,           // ✅ RAW (used by SummaryCards)
        filteredTransactions,   // ✅ FILTERED (used by TransactionList)
        loading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        searchTerm,
        setSearchTerm,
        filterType,
        setFilterType,
        sortOption,
        setSortOption,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
