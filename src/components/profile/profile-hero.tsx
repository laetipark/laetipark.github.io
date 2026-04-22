import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { profile } from '../../common/data/portfolio';

import styles from '../../assets/styles/components/profile-hero.module.css';

type ProfileHeroProps = {
  onOpenChat: () => void;
};

export const ProfileHero = ({ onOpenChat }: ProfileHeroProps) => {
  return (
    <header className={styles.hero}>
      <div className={styles.nameGroup}>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.headline}>{profile.headline}</p>
        <a
          className={styles.chatLink}
          href={'/chat'}
          onClick={(event) => {
            event.preventDefault();
            onOpenChat();
          }}
        >
          <FontAwesomeIcon icon={faCommentDots} />
          <span>Chat Laetus</span>
        </a>
      </div>
      <address className={styles.contacts}>
        {profile.contacts.map((contact) => (
          <div className={styles.contactItem} key={contact.href}>
            <FontAwesomeIcon
              className={styles.contactIcon}
              icon={contact.icon}
            />
            <span className={styles.contactLabel}>{contact.label}:</span>
            <a
              href={contact.href}
              target={contact.external ? '_blank' : undefined}
              rel={contact.external ? 'noreferrer' : undefined}
            >
              {contact.value}
            </a>
          </div>
        ))}
      </address>
    </header>
  );
};
