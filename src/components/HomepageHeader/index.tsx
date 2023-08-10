import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

import styles from './styles.module.scss'

export default function HomepageHeader(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext()

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className='container'>
        <h1 className='hero__title'>「 楷鹏的技术领域 」</h1>
        <p className='hero__subtitle'>
          作为一个程序员，有一个自己的个人网站是一件很酷的事情
        </p>
        <p className='hero__subtitle'>我已经很酷了 😎</p>
        <p className='hero__subtitle'>那接下来，我要在这里沉淀个人在技术领域的知识</p>
        <p className='hero__subtitle'>你应该感到高兴，又多了一位旗鼓相当的对手</p>
      </div>
    </header>
  )
}
