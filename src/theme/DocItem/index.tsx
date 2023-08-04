import React from 'react'
import DocItem from '@theme-original/DocItem'
import GiscusComponent from '@site/src/components/Giscus'

export default function DocItemWrapper(props) {
  return (
    <>
      <DocItem {...props} />
      <GiscusComponent />
    </>
  )
}
