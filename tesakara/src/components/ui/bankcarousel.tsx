import React from 'react';
import styles from './bankcarousel.module.css';
import CopyButton from './copybutton';

type BankItem = {
  id: string | number;
  bank: string;
  norek: string;
  pemilik: string;
  logoUrl?: string;
};

type BankCarouselProps = {
  items: BankItem[];
  copyJoiner?: string;
  title?: string;
};

const bankLogos = {
  "Bank Jago Syariah": "/img/jago.png",
  "Bank BCA Syariah": "/img/bcasyariah.png",
  "Bank BSI": "/img/bsi.png",
  "Bank Mandiri": "/img/mandiri.png",
} as const;

type BankName = keyof typeof bankLogos;

function isKnownBank(b: string): b is BankName {
  return b in bankLogos;
}

const BankCarousel: React.FC<BankCarouselProps> = ({
  items,
  copyJoiner = ', ',
  title,
}) => {
    
  return (
    <section className={styles.wrapper}>
      {title && <h3 className={styles.title}>{title}</h3>}

      <div className="fullBleed">
      <div className={styles.scroller} role="list" aria-label="Daftar rekening">
        {items.map((item) => {
          const copyText = [item.norek, item.pemilik].join(copyJoiner);

          const logoSrc =
              (item.bank && isKnownBank(item.bank) ? bankLogos[item.bank] : undefined) ??
              item.logoUrl ??
              "/img/default.png";

          return (
            <article className={styles.card} key={item.id} role="listitem" aria-label={`${item.bank ?? 'Bank'} - ${item.norek}`}>
              {/* background layer */}
              <span className={styles.bg} aria-hidden="true" />

              {/* header row */}
             <div className={styles.headerRow}>
                <div className={styles.logoWrap}>
                    <img
                      src={logoSrc}
                      alt={`${item.bank ?? 'Bank'} logo`}
                      className={styles.logoImg}
                    />
                    {item.bank && <div className={styles.bankName}>{item.bank}</div>}
                </div>
            </div>

              {/* content */}
              <div className={styles.content}>
                <strong className={styles.norek}>{item.norek}</strong>
                <div className={styles.pemilik}>a.n. {item.pemilik}</div>
              </div>

              <CopyButton
                  size="sm"
                  text={copyText}
                  label="Salin"
                  bgColor="#675553"
                  textColor="#fff"
                  fontFamily="'Libre Baskerville', serif"
                  onCopied={() => {
                    alert(`Informasi rekening "${copyText}" berhasil disalin`);
                  }}
                />
            </article>
          );
        })}
      </div>
      </div>
    </section>
  );
};

export default BankCarousel;
