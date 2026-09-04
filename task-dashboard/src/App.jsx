import { useState } from "react";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import TaskCard from "./components/TaskCard";


function App () {

  // Basic State
  const [taskCount, setTaskCount] = useState(3);

  const increaseTaskCount = () => {
    setTaskCount (taskCount + 1);
  };

  return ( 
    <>
    <Header/>
    <main>
      <Welcome name = "Tahreem "/>
      <section>
        <h2>My Tasks ({taskCount})</h2>
        <TaskCard title = "Learn react components" status = "In progress" />
        <TaskCard title = "Practise Props and State" status = "Pending" />
        <TaskCard  title = "Day 6 Task" status = "Completed" />
        <button onClick={increaseTaskCount}>Add Task</button>
      </section>
    </main>
    
    </>

);
}

export default App;