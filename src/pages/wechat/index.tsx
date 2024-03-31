import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import WeChat from '@site/src/components/WeChat';
import Layout from '@theme/Layout';

export default function () {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description='You can contact me via WeChat.'
    >
      <main>
        <WeChat />
      </main>
    </Layout>
  );
}
