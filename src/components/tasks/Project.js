import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectTasks } from '../../services/taskService';
import Task from './Task';
import NewSectionButton from './NewSectionButton';
import NewTaskButton from './NewTaskButton';
import '../../styles/Tasks.css';
import ProjectDropdownMenu from './ProjectDropdownMenu';

function Project({ updateSidebarProject, deleteSidebarProject, openModal }) {
  let { projectId } = useParams()
  const routerNavigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});

  useEffect(() => {
    setLoading(true);
    getProjectTasks(projectId).then((data) => {
      setProject(data);
      setLoading(false);
      document.title = data.title
    });
  }, [projectId]);

  const updateTask = (updatedTask) => {
    if (updatedTask.section_id) {
      setProject(
        {
          ...project,
          sections: project.sections.map((section) => (
            section.id === updatedTask.section_id ?
            {
              ...section,
              tasks: section.tasks.map((task) => (updatedTask.id === task.id ? updatedTask : task))
            } :
            section
          ))
        }
      );
    } else {
      setProject(
        {
          ...project,
          tasks: project.tasks.map((task) => (updatedTask.id === task.id ? updatedTask : task))
        }
      );
    }
  };

  const deleteTask = (deletedTask) => {
    console.log(deletedTask)
    if (deletedTask.section_id) {
      setProject(
        {
          ...project,
          sections: project.sections.map((section) => (
            section.id === deletedTask.section_id ?
            {
              ...section,
              tasks: section.tasks.filter((task) => (task.id !== deletedTask.id))
            } :
            section
          ))
        }
      );
    } else {
      setProject(
        {
          ...project,
          tasks: project.tasks.filter((task) => (task.id !== deletedTask.id))
        }
      );
    }
  };

  const addTask = (newTask) => {
    if (newTask.section_id) {
      setProject(
        {
          ...project,
          sections: project.sections.map((section) => (
            section.id === newTask.section_id ?
            {
              ...section,
              tasks: section.tasks.concat(newTask)
            } :
            section
          ))
        }
      );
    } else {
      setProject(
        {
          ...project,
          tasks: project.tasks.concat(newTask)
        }
      );
    }
  };

  const addSection = (newSection) => {
    setProject(
      {
        ...project,
        sections: project.sections.concat({...newSection, tasks: []})
      }
    )
  }

  const updateSection = (newSection) => {
    setProject(
      {
        ...project,
        sections: project.sections.map((section) => (
          newSection.id === section.id ?
          {
            ...section,
            title: newSection.title
          } :
          section
        ))
      }
    )
  }

  const deleteSection = (deletedSection) => {
    setProject(
      {
        ...project,
        sections: project.sections.filter((section) => section.id !== deletedSection.id)
      }
    );
  };

  const updateProject = (newProject) => {
    setProject(
      {
        ...project,
        title: newProject.title
      }
    )
    updateSidebarProject(newProject);
  }

  const deleteProject = (deletedProject) => {
    deleteSidebarProject(deletedProject);
    routerNavigate('/');
  };

  return (
    loading ?
    null :
    <div className="Tasks">
      <div className="Section-header">
        <h1>{project.title}</h1>
        {project.inbox ?
          null :
          <ProjectDropdownMenu
          title={project.title}
          name="project"
          inbox={project.inbox}
          projectId={projectId}
          handleUpdate={updateProject}
          handleDelete={deleteProject}
          openModal={openModal}
        />
        }
      </div>
      <div className="Tasks-container">
        {project.tasks.map((task) => (
          <Task key={task.id} task={task} handleUpdate={updateTask} handleDelete={deleteTask} openModal={openModal} />)
        )}
        <NewTaskButton projectId={projectId} openModal={openModal} afterSubmit={addTask} />
      </div>
      {project.sections.map((section) => {
        return(
          <div className="Tasks-container" key={section.id}>
            <div className="Section-header">
              <h2>{section.title}</h2>
              <ProjectDropdownMenu
                title={section.title}
                name="section"
                projectId={projectId}
                sectionId={section.id}
                handleUpdate={updateSection}
                handleDelete={deleteSection}
                openModal={openModal}
              />
          </div>
            {section.tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                openModal={openModal}
                handleUpdate={updateTask}
                handleDelete={deleteTask}
              />)
            )}
            <NewTaskButton openModal={openModal} sectionId={section.id} projectId={projectId} afterSubmit={addTask} />
          </div>
        );
      })}
      <NewSectionButton projectId={projectId} openModal={openModal} afterSubmit={addSection} />
    </div>
  );
}

export default Project;
