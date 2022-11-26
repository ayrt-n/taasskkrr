import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import Task from './Task';
import SectionHeader from './SectionHeader';
import '../../styles/Tasks.css';

function Upcoming() {
  const [loading, setLoading] = useState(true);
  const [upcoming, setUpcoming] = useState([])

  useEffect(() => {
    UserService.getUpcomingTasks().then((userTasks) => {
      console.log(userTasks.tasks);
      setUpcoming(userTasks.tasks);
    })
    .then(() => {
      setLoading(false);
      console.log(upcoming);
    });
  }, []);

  return (
    // If loading show null
    loading ?
    null :
    // Otherwise, render tasks in order of upcoming date
    <div className="Upcoming">
      <SectionHeader
        title="Upcoming"
        headingLevel="h1"
        inbox={true}
      />
      {Object.keys(upcoming).sort().map((date) => {
        if (date === "") {
          return null;
        } else {
          return (
            <div className="Tasks-container" key={date}>
              <SectionHeader
                title={format(parseISO(date), 'PPP')}
                headingLevel="h2"
                inbox={true}
              />
              {upcoming[date].map((task) => (
                <Task
                  key={task.id}
                  task={task}
                /> 
              ))}
            </div>
          );
        }
      })}
    </div>
  );
}

export default Upcoming;
