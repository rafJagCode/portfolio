import styles from './ProjectLinks.module.scss';
import links from '@/configuration/links_conf';
import { ImGithub } from 'react-icons/im';
import { BiLinkExternal } from 'react-icons/bi';

export default function ProjectLinks({ project }) {
  return (
    <div className={styles.container}>
      <a className={styles.link} target='_blank' href={links[project].github} tabIndex='12'>
        <ImGithub />
        GITHUB
      </a>
      <a className={styles.link} target='_blank' href={links[project].live} tabIndex='13'>
        <BiLinkExternal />
        LIVE
      </a>
    </div>
  );
}
