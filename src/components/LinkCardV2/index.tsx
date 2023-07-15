import { Platform } from '@site/src/utils/constants';
import React from 'react';

import styles from './index.module.scss';

interface Props {
  url: string;
}

export default function LinkCardV2({ url }: Props): React.ReactElement {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        {/* <h3 className={styles.header}>{parserPlatformFromURL(url)}</h3> */}
        <p>
          From: 
          <a href={url} target='_blank'>
            {url}
          </a>
        </p>
      </div>
    </div>
  );
}

function parserPlatformFromURL(url: string) {
  switch (true) {
    case url.includes('weixin'):
      return Platform.WE_CHAT;
    case url.includes('juejin'):
      return Platform.JUE_JIN;
    case url.includes('csdn'):
      return Platform.CSDN;
    default:
      throw new Error('Unknown platform');
  }
}

function getPlatformIcon(p: keyof typeof Platform) {
  switch (p) {
    case Platform.WE_CHAT:
      return '/img/platform/wechat.svg';
    case Platform.JUE_JIN:
      return '/img/platform/juejin.svg';
    case Platform.CSDN:
      return '/img/platform/csdn.svg';
    default:
      throw new Error('Unknown platform');
  }
}
