import styles from './Home.module.scss';
import useTranslation from '@/hooks/useTranslation';
import { MdEmail } from 'react-icons/md';
import { ImMobile, ImGithub } from 'react-icons/im';
import HomeImage from './home_image/HomeImage';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div
      id="home"
      className={styles.container}
    >
      <div className={styles.text}>
        <div className={styles.introduction}>
          <p>
            {t('HOME_NAME')}
            <em>Rafał Jagielski</em>
          </p>
          <p>
            {t('HOME_I_AM')}
            <em>{t('HOME_PROFESSION')}</em>
          </p>
        </div>
        <div className={styles.contact}>
          <a
            className="home__mobile"
            href="tel:+48 666 240 978"
          >
            <ImMobile />
            +48 666 240 978
          </a>
          <a
            className="home__email"
            href="mailTo:jagielski.rafal.uwm@gmail.com"
          >
            <MdEmail />
            jagielski.rafal.uwm@gmail.com
          </a>
          <a
            className="home__github"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/rafJagCode"
          >
            <ImGithub />
            https://github.com/rafJagCode
          </a>
        </div>
      </div>
      <HomeImage />
    </div>
  );
}
