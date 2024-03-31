import React, { useState, useEffect } from 'react'

export default function CopyTextButton({ content, children }) {
  const [copyFeedback, setCopyFeedback] = useState<string>('')

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopyFeedback(' Copied!')
    setTimeout(() => {
      setCopyFeedback('')
    }, 1000)
  }

  return (
    <button onClick={() => handleCopy(content)}>
      {children}
      <span>{copyFeedback}</span>
    </button>
  )
}
