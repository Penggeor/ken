import clsx from 'clsx';
import React from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.scss';

export default function WeChat() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <main>
      <div className={styles.wrapper}>
        <div className='wrap'>
          <div className='card'>
            <div className={clsx('card__heaher')}>
              <h1 className={styles.QRCodeHeader}>Pandy's WeChat</h1>
            </div>
            <div className='card__body'>
              <img
                src={
                  require("@site/static/img/contact/pandy's qrcode.jpeg")
                    .default
                }
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
