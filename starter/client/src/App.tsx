import Form from "components/Form/form";
import Header from "components/Header/Header";
import PlusButton from "components/PlusButton/PlusButton";
import TaskList from "components/TaskList/Task";
import React, { useState } from "react";

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="container relative bg-darkPurple mx-auto max-w-lg p-4 box-border min-h-screen">
      <Header />
      <TaskList />
      <Form inProp={showForm} onClose={() => setShowForm(false)} />
      <PlusButton onClick={() => setShowForm(!showForm)} />
    </main>
  );
};

export default App;
