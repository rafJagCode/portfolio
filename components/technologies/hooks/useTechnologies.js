import { useState } from 'react';

const useTechnologies = () => {
  const [technologies, setTechnologies] = useState([]);

  const addTechnology = (technologyName, startingPosition) => {
    setTechnologies((technologies) => [...technologies, { name: technologyName, startingPosition: startingPosition }]);
  };

  const removeTechnology = (technologyName) => {
    setTechnologies((technologies) => technologies.filter((technology) => technology.name !== technologyName));
  };

  return [technologies, addTechnology, removeTechnology];
};

export default useTechnologies;
