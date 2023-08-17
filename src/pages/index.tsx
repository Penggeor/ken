import React, { useEffect } from 'react';

import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import HomepageHeader from '../components/HomepageHeader';
import Car from '../components/Car';
import Project from '../components/Project';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="主页"
      description="楷鹏的知识领域"
    >
      <HomepageHeader />
      <main>
        <Car />
      </main>
    </Layout>
  );
}
