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
        <p className='hero__title'>“ 妓女不能等有了性欲才接客</p>
        <p className='hero__title'>作家不能等有了灵感才写作 ”</p>
        <p className='hero__title'>——李敖</p>
      </div>
    </header>
  )
}
