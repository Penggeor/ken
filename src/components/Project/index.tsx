import React from 'react'
import clsx from 'clsx'

import styles from './styles.module.scss'

type FeatureItem = {
  title: string
  // Svg: React.ComponentType<React.ComponentProps<'svg'>>
  pic: string
  link: string
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: '来做',
    pic: require('@site/static/img/project/lai-todo-128-v1@2x.png').default,
    link: 'https://oss.lafyun.com/iemwd3-app/Lai%20Todo_0.1.0_aarch64.dmg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=N02WTOBEYVQT4PLDMFJI%2F20230219%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230219T101746Z&X-Amz-Expires=900&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJOMDJXVE9CRVlWUVQ0UExETUZKSSIsImV4cCI6MTY3Njg4ODI2NiwicGFyZW50IjoiaWVtd2QzIiwic2Vzc2lvblBvbGljeSI6ImV5SldaWEp6YVc5dUlqb2lNakF4TWkweE1DMHhOeUlzSWxOMFlYUmxiV1Z1ZENJNlczc2lVMmxrSWpvaVlYQndMWE4wY3kxbWRXeHNMV2R5WVc1MElpd2lSV1ptWldOMElqb2lRV3hzYjNjaUxDSkJZM1JwYjI0aU9pSnpNem9xSWl3aVVtVnpiM1Z5WTJVaU9pSmhjbTQ2WVhkek9uTXpPam82S2lKOVhYMD0ifQ.xIszPxmJW1Cud17QORhT8e5KzpUN2Qtnba4RHnAtCuzFgd-wsEoChPSbmau1NFmeTQaT6M4v9fAcbQzS-GmXnA&X-Amz-Signature=2c89e9ef9c992e957735a88326607b34733319a8acde49e5605dff118721aadc&X-Amz-SignedHeaders=host',
    description: <>Mac 桌面端番茄时钟应用</>,
  },
  {
    title: 'Bun',
    pic: require('@site/static/img/project/bun.png').default,
    link: 'https://marketplace.visualstudio.com/items?itemName=Pandy.bun',
    description: (
      <>VSCode 插件，调用 Bun 快速运行 TS/JS 插件</>
      ),
    },
    {
      title: 'DoDollar',
      pic: require('@site/static/img/project/boy.png').default,
      link: 'https://github.com/Penggeor/dodollar',
    description: <>方便的日志打印工具</>,
  },
]

function Feature({ title, pic, link, description }: FeatureItem) {
  return (
    <a className={clsx('col col--4', styles.feature)} href={link} target="_black">
      <div className='text--center'>
        <img className={styles.projectImg} src={pic} />
      </div>
      <div className={clsx('text--center padding-horiz--md', styles.content)}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </a>
  )
}

export default function Project(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
