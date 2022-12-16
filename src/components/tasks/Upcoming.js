import React, { useState, useEffect, useMemo } from 'react';
import { getUserTasks } from '../../services/userService';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import Task from './Task';
import '../../styles/Tasks.css';

function Upcoming({ openModal }) {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    document.title = "Upcoming"
    getUserTasks().then((userTasks) => {
      setTasks(userTasks.tasks.filter(task => task.due_date));
    })
    .then(() => {
      setLoading(false);
    });
  }, []);

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => (
        task.id === updatedTask.id ? updatedTask : task
      ));
    })
  };

  const deleteTask = (deletedTask) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletedTask.id));
  };

  const sortedTasks = useMemo(() => (
    tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
  ), [tasks]);

  const upcomingTasks = useMemo(() => {
    let dueDate;
    const list = []

    sortedTasks.forEach((task) => {
      const taskDueDate = new Date(task.due_date);
      const formattedDate = taskDueDate < Date.now() ? 'Overdue' : format(parseISO(task.due_date), 'PPP')

      if (dueDate === formattedDate) {
        list.push(<Task key={task.id} task={task} handleUpdate={updateTask} handleDelete={deleteTask} openModal={openModal} />);
      } else {
        list.push(<div className="Section-header" key={formattedDate}><h2>{formattedDate}</h2></div>)
        list.push(<Task key={task.id} task={task} handleUpdate={updateTask} handleDelete={deleteTask} openModal={openModal} />);
        dueDate = formattedDate
      }
    })

    return list;
  }, [sortedTasks, openModal]);

  return (
    // If loading show null
    loading ?
    null :
    // Otherwise, render tasks in order of upcoming date
    <div className="Upcoming">
      <div className="Section-header">
        <h1>Upcoming</h1>
      </div>
      {upcomingTasks}
    </div>
  );
}

export default Upcoming;
