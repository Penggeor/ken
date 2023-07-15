import React from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

interface Props {
  url: string;
}

export default function IFrame({ url }: Props): React.ReactElement {
  return (
    <div className={styles.wrapper}>
      <iframe
        src={url}
        style={{
          width: '100%',
          height: '80vh'
        }}
      ></iframe>
    </div>
  );
}
