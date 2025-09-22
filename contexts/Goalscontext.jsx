import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { db } from "../firebaseConfig";

export const GoalsContext = createContext();

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState([]);

  // Fetch all goals from Firestore
  async function fetchGoals() {
    try {
      const querySnapshot = await getDocs(collection(db, "goals"));
      const goalsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGoals(goalsList);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  }

  // Create a new goal
  async function createGoal(goalData) {
    try {
      const docRef = await addDoc(collection(db, "goals"), goalData);
      setGoals((prev) => [...prev, { id: docRef.id, ...goalData }]);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  }

  // Delete a goal by id
  async function deleteGoal(goalId) {
    try {
      await deleteDoc(doc(db, "goals", goalId));
      setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  }

  // Update a goal by id
  async function updateGoal(goalId, updatedData) {
    try {
      const goalRef = doc(db, "goals", goalId);
      await updateDoc(goalRef, updatedData);
      setGoals((prev) =>
        prev.map((goal) => (goal.id === goalId ? { ...goal, ...updatedData } : goal))
      );
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  }

  // Fetch goals once on mount
  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <GoalsContext.Provider
      value={{ goals, fetchGoals, createGoal, deleteGoal, updateGoal }}
    >
      {children}
    </GoalsContext.Provider>
  );
}
