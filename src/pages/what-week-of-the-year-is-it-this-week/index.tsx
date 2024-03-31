import React, { useState, useEffect } from 'react'
import Layout from '@theme/Layout'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import Calendar from 'react-calendar'
import styles from './index.module.scss'
import 'react-calendar/dist/Calendar.css'
import weekOfYear from 'dayjs/plugin/weekOfYear' // Import the weekOfYear plugin
import CopyTextButton from '../../components/CopyTextButton'

dayjs.locale('zh-cn')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

dayjs.extend(weekOfYear) // Apply the weekOfYear plugin to the dayjs instance

export default function () {
  const week = dayjs().week() // Use the week() method to get the week of the year
  const monday = dayjs().startOf('week').format('MM-DD')
  const sunday = dayjs().endOf('week').format('MM-DD')

  return (
    <Layout>
      <main className={styles.main}>
        <Calendar />
        <div className={styles.text}>
          <h3>
            本周范围为 &nbsp;
            <CopyTextButton content={`${monday} ~ ${sunday}`}>
              {monday} ~ {sunday}
            </CopyTextButton>
          </h3>
          <h3>
            本周是今年的第 &nbsp;
            <CopyTextButton content={week.toString()}>
              &nbsp;{week}&nbsp;
            </CopyTextButton>
            &nbsp; 周
          </h3>
        </div>
      </main>
    </Layout>
  )
}
