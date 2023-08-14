import { FaHome, FaBriefcase, FaFlask, FaMailBulk } from 'react-icons/fa';

const navigationLinks = [
  {
    name: 'NAVLINK_HOME',
    link: '#home',
    icon: <FaHome />,
  },
  {
    name: 'NAVLINK_PROJECTS',
    link: '#projects',
    icon: <FaBriefcase />,
  },
  {
    name: 'NAVLINK_TECHNOLOGIES',
    link: '#technologies',
    icon: <FaFlask />,
  },
  {
    name: 'NAVLINK_CONTACT',
    link: '#contact',
    icon: <FaMailBulk />,
  },
];
export default navigationLinks;
