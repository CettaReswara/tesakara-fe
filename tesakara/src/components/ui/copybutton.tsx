"use client";
import React from 'react';
import styles from './copybutton.module.css';

type CopyButtonProps = {
  text: string;
  label?: string;
  size?: 'lg' | 'sm';
  bgColor?: string;
  textColor?: string;
  fontFamily?: string;
  onCopied?: () => void;
  className?: string;
};

type CSSVars = React.CSSProperties & {
  [key: `--${string}`]: string | number | undefined;
};

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label,
  size = 'lg',
  bgColor,
  textColor,
  fontFamily,
  onCopied,
  className,
}) => {
  const buttonLabel = label ?? (size === 'sm' ? 'Salin' : 'Salin Alamat');

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      onCopied?.();
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const styleVars: CSSVars = {
    '--btn-bg': bgColor,
    '--btn-text': textColor,
    '--btn-font': fontFamily,
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={[
        styles.buttonBase,
        size === 'sm' ? styles.small : styles.large,
        className ?? '',
      ].join(' ')}
      style={styleVars}
    >
      <span className={styles.buttonBg} aria-hidden="true" />
      <span className={styles.buttonText}>{buttonLabel}</span>
    </button>
  );
};

export default CopyButton;
