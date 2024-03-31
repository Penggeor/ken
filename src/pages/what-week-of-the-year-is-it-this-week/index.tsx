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

dayjs.locale('zh-cn')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

dayjs.extend(weekOfYear) // Apply the weekOfYear plugin to the dayjs instance

export default function () {
  const week = dayjs().week() // Use the week() method to get the week of the year

  const [copyFeedback, setCopyFeedback] = useState<string>('')

  const handleCopy = () => {
    navigator.clipboard.writeText(week.toString())
    setCopyFeedback('Copied!')
    setTimeout(() => {
      setCopyFeedback('')
    }, 1000)
  }

  return (
    <Layout>
      <main className={styles.main}>
        <Calendar />
        <h3 className={styles.text} onClick={handleCopy}>
          本周是今年的第
          <button className={styles.copyButton}>
            &nbsp;{week}&nbsp;
            <span className={styles.copyFeedback}>{copyFeedback}</span>
          </button>
          周
        </h3>
      </main>
    </Layout>
  )
}
