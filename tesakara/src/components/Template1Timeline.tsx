import styles from "./Template1Timeline.module.css";
import React from "react";

type Details = {
  taaruf: string;    
  nadzor: string;   
  khitbah: string;  
  akad: string; 
}

export default function Template1Timeline({
  taaruf,    
  nadzor,   
  khitbah, 
  akad,
}: Details) {
  return (
    <div className={styles.timelineStory}>
      <div className={styles.popupBg} />

      <i className={styles.ourStory}>Our Story</i>

      <ul className={styles.cardList}>
        <li className={styles.cardItem}>
          <div className={styles.left}>
            <div className={styles.dot} />
            <div className={styles.stem} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Ta’aruf</div>
            <p className={styles.cardBody}>
              {taaruf} 
            </p>
          </div>
        </li>

        <li className={styles.cardItem}>
          <div className={styles.left}>
            <div className={styles.dot} />
            <div className={styles.stem} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Nadzor</div>
            <p className={styles.cardBody}>
              {nadzor}
            </p>
          </div>
        </li>

        <li className={styles.cardItem}>
          <div className={styles.left}>
            <div className={styles.dot} />
            <div className={styles.stem} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Khitbah</div>
            <p className={styles.cardBody}>
              {khitbah}
            </p>
          </div>
        </li>

        <li className={styles.cardItem}>
          <div className={styles.dot} />
          <div className={styles.card}>
            <div className={styles.cardTitle}>Akad</div>
            <p className={styles.cardBody}>
              {akad}
            </p>
          </div>
        </li>
      </ul>

    </div>
  );
}
