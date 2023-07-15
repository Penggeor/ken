import React from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageHeader from '@site/src/components/HomepageHeader';
import WeChat from '@site/src/components/WeChat';
import Layout from '@theme/Layout';

export default function () {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description='Description will go into a meta tag in <head />'
    >
      <HomepageHeader />
      <main>
        <WeChat />
      </main>
    </Layout>
  );
}
