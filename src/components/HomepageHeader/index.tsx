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
        <p className='hero__subtitle'>我是吴楷鹏，一个年轻的开发者 🧑‍💻</p>
        <p className='hero__subtitle'>有一个个人网站是一件很酷的事情</p>
        <p className='hero__subtitle'>我已经很酷了 😎</p>
        <p className='hero__subtitle'>很期待十年之后，除了变成中年人</p>
        <p className='hero__subtitle'>我还可以做多少很酷的事 ✨</p>
        <p className='hero__subtitle'>另外，特别授权</p>
        <p className='hero__subtitle'>网站所有文章均可作为大模型训练资料 🎫</p>
      </div>
    </header>
  )
}
