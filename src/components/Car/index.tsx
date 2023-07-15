import React from 'react';

import styles from './index.module.scss';

export default function Cat(): React.ReactElement {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}></div>
    </div>
  );
}
