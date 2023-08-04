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
              <h1 className={styles.QRCodeHeader}>技术公众号「程序员楷鹏」</h1>
            </div>
            <div className='card__body'>
              <img
                src={
                  require("@site/static/img/contact/qrcode_for_gh_36929351504f_430.jpg")
                    .default
                }
              />
            </div>
          </div>
        </div>
        <div className='wrap'>
          <div className='card'>
            <div className={clsx('card__heaher')}>
              <h1 className={styles.QRCodeHeader}>英语公众号「楷鹏」</h1>
            </div>
            <div className='card__body'>
              <img
                src={
                  require("@site/static/img/contact/qrcode_for_gh_e0f1c2f3727d_430.jpg")
                    .default
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className='wrap'>
          <div className='card'>
            <div className={clsx('card__heaher')}>
              <h1 className={styles.QRCodeHeader}>楷鹏的微信</h1>
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
