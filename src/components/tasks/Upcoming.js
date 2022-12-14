import React, { useState, useEffect, useMemo } from 'react';
import UserService from '../../services/UserService';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import Task from './Task';
import '../../styles/Tasks.css';

function Upcoming({ openModal }) {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    document.title = "Upcoming"
    UserService.getUserTasks().then((userTasks) => {
      console.log(userTasks.tasks);
      setTasks(userTasks.tasks.filter(task => task.due_date));
    })
    .then(() => {
      setLoading(false);
    });
  }, []);

  const sortedTasks = useMemo(() => (
    tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
  ), [tasks]);

  const upcomingTasks = useMemo(() => {
    let dueDate;
    const list = []

    sortedTasks.map((task) => {
      const taskDueDate = new Date(task.due_date);
      const formattedDate = taskDueDate < Date.now() ? 'Overdue' : format(parseISO(task.due_date), 'PPP')

      if (dueDate === formattedDate) {
        list.push(<Task key={task.id} task={task} openModal={openModal} />);
      } else {
        list.push(<div className="Section-header"><h2>{formattedDate}</h2></div>)
        list.push(<Task key={task.id} task={task} openModal={openModal} />);
        dueDate = formattedDate
      }
    })

    return list;
  }, [sortedTasks]);

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
