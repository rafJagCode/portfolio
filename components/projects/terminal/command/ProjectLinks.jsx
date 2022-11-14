import styles from './ProjectLinks.module.scss';
import links from '@/links';
import { ImGithub } from 'react-icons/im';
import { BiLinkExternal } from 'react-icons/bi';

export default function ProjectLinks({ project }) {
  return (
    <div className={styles.project_links}>
      <a
        className={styles.project_links__link}
        target="_blank"
        href={links[project].github}
      >
        <ImGithub />
        GITHUB
      </a>
      <a
        className={styles.project_links__link}
        target="_blank"
        href={links[project].live}
      >
        <BiLinkExternal />
        LIVE
      </a>
    </div>
  );
}
