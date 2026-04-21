import styles from '../../assets/styles/components/rich-text.module.css';

import type { TextLine, TextToken } from '../../common/types/portfolio';

type RichTextLineProps = {
  line: TextLine;
};

const renderToken = (token: TextToken, index: number) => {
  if (typeof token === 'string') {
    return <span key={index}>{token}</span>;
  }

  if ('href' in token) {
    const isExternal = token.external ?? token.href.startsWith('http');

    return (
      <a
        key={index}
        className={styles.link}
        href={token.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
      >
        {token.text}
      </a>
    );
  }

  return (
    <span
      key={index}
      className={token.variant === 'accent' ? styles.accent : styles.mark}
    >
      {token.text}
    </span>
  );
};

export const RichTextLine = ({ line }: RichTextLineProps) => {
  return <span className={styles.line}>{line.map(renderToken)}</span>;
};
