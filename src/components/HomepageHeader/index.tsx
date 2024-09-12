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
        <p className='hero__title'>“你写的每一行代码</p>
        <p className='hero__title'>都是你的名片”</p>
        {/* <p className='hero__title'>💳</p> */}
      </div>
    </header>
  )
}
