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
        <h1 className='hero__title'>幸会，我的老伙计</h1>
        <p className='hero__subtitle'>有一个人网站是一件很酷的事情</p>
        <p className='hero__subtitle'>我已经很酷了 😎</p>
        <p className='hero__subtitle'>一棵树，在现在最好的时机被种下</p>
        <p className='hero__subtitle'>很期待十年之后，它会长成什么样</p>
        <p className='hero__subtitle'>我是说，十年的时间</p>
        <p className='hero__subtitle'>
          除了变成中年人，我还可以做多少很酷的事 ✨
        </p>
      </div>
    </header>
  )
}
