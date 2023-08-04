import React from 'react'
import Giscus from '@giscus/react'
import { useColorMode } from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function GiscusComponent() {
  const { colorMode } = useColorMode()

  const {
    siteConfig: { customFields },
  } = useDocusaurusContext()

  return (
    <Giscus
      repo='Penggeor/ken'
      repoId={customFields.GISCUS_REPO_ID as string}
      category='General'
      categoryId={customFields.GISCUS_CATEGORY_ID as string} // E.g. id of "General"
      mapping='url' // Important! To map comments to URL
      term='Welcome to @giscus/react component!'
      strict='0'
      reactionsEnabled='1'
      emitMetadata='1'
      inputPosition='top'
      theme={colorMode === 'light' ? 'noborder_light' : 'noborder_dark'}
      lang='zh-CN'
      loading='lazy'
      crossorigin='anonymous'
      async
    />
  )
}
