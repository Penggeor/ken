import React from 'react';
import { useBlogPost } from '@docusaurus/theme-common/internal'
import BlogPostItem from '@theme-original/BlogPostItem';
import GiscusComponent from '@site/src/components/Giscus';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function BlogPostItemWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost()
  const isBrowser = useIsBrowser();

  const { frontMatter } = metadata
  const { disabledComments } = frontMatter

  return (
    <>
      <BlogPostItem {...props} />
      {(!disabledComments && isBlogPostPage) && (
        <GiscusComponent />
      )}
    </>
  );
}