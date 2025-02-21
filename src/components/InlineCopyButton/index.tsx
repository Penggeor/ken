import type { ReactNode } from 'react'
import copy from 'copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast'
import styles from './styles.module.css'

interface InlineCopyButtonProps {
  content: string
  children?: ReactNode
  type?: "button"
  style?: React.CSSProperties
}

export default function InlineCopyButton({ content, children, style }: InlineCopyButtonProps) {
  const handleCopy = (text: string) => {
    copy(text)
    toast.success('链接已复制到剪贴板')
  }

  return (
    <>
      <Toaster position="top-center" />
      <button
        type="button"
        onClick={() => handleCopy(content)}
        className={styles.copyButton}
        style={style}
    >
        {children || '🚀 复制'}
      </button>
    </>
  )
}
