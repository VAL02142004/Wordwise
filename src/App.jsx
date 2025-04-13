  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import { useEffect, useState } from "react";
  import { collection, getDocs } from "firebase/firestore";
  import { db } from "./Config/Firebase";
    

  import Login from "./Components/Login";
  import Signup from "./Components/Signup";
  import Dashboard from "./Components/Dashboard";
  import { useOnlineStatus } from "./hooks/useOnlineStatus";

  function App() {
    const isOnline = useOnlineStatus();

    const [TodoList, setTodoList] = useState([]);
  const TodoListCollectionRef = collection(db, "TodoList");

  useEffect(() => {
    const getTodoList = async () => {
      try {
        const data = await getDocs(TodoListCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTodoList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getTodoList();
    
  }, []);

    return (
      <Router>
        {!isOnline && (
          <div style={{ backgroundColor: 'orange', padding: '10px', textAlign: 'center' }}>
            You are offline
          </div>
        )}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    );
  }

  export default App;
