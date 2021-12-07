import React from "react";

const Header = ({ projects, onCurrentProjectChange }) => {
  const projectOptions = projects.map((project) => (
    <option key={project.id} value={project.id}>
      {project.name}
    </option>
  ));

  return (
    <div className="project-item">
      <label>
        Project:
        <select
          id="projects"
          onChange={onCurrentProjectChange}
          className="project-menu"
        >
          {projectOptions}
        </select>
      </label>
    </div>
  );
};

export default Header;
