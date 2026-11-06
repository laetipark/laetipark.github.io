import {
  faArrowDown,
  faArrowRight,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { profile } from '../../common/data/portfolio';
import styles from '../../assets/styles/components/profile-hero.module.css';

type ProfileHeroProps = { onOpenChat: () => void };

export const ProfileHero = ({ onOpenChat }: ProfileHeroProps) => (
  <header className={styles.header}>
    <div className={styles.topbar}>
      <a
        className={styles.wordmark}
        href={'#top'}
        aria-label={'Laetipark 처음으로'}
      >
        <span className={styles.brandMark} aria-hidden={'true'}>
          L.
        </span>
        LAETIPARK
      </a>
      <nav className={styles.navigation} aria-label={'포트폴리오 섹션'}>
        <a href={'#projects'}>프로젝트</a>
        <a href={'#about'}>소개</a>
        <a href={'#skills'}>기술</a>
        <a href={'#history'}>이력</a>
      </nav>
    </div>
    <div className={styles.hero} id={'top'}>
      <div className={styles.introduction}>
        <p className={styles.eyebrow}>DEVELOPER · LAETIPARK</p>
        <h1 className={styles.name}>
          {profile.name}
          <span>DongHun Park</span>
        </h1>
        <p className={styles.headline}>{profile.headline}</p>
        <div className={styles.actions}>
          <a className={styles.projectLink} href={'#projects'}>
            프로젝트 보기 <FontAwesomeIcon icon={faArrowDown} />
          </a>
          <a
            className={styles.chatLink}
            href={'/chat'}
            onClick={(event) => {
              if (
                event.button === 0 &&
                !event.metaKey &&
                !event.ctrlKey &&
                !event.shiftKey &&
                !event.altKey
              ) {
                event.preventDefault();
                onOpenChat();
              }
            }}
          >
            Chat Laetus <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      </div>
      <address className={styles.contacts}>
        <p className={styles.contactHeading}>기록과 연결</p>
        {profile.contacts.map((contact) => (
          <a
            className={styles.contactLink}
            href={contact.href}
            key={contact.href}
            target={contact.external ? '_blank' : undefined}
            rel={contact.external ? 'noreferrer' : undefined}
          >
            <span>
              <FontAwesomeIcon icon={contact.icon} aria-hidden={'true'} />{' '}
              {contact.label}
            </span>
            <span className={styles.contactValue}>{contact.value}</span>
            {contact.external && (
              <FontAwesomeIcon
                className={styles.externalIcon}
                icon={faArrowUpRightFromSquare}
                aria-hidden={'true'}
              />
            )}
          </a>
        ))}
      </address>
    </div>
  </header>
);
