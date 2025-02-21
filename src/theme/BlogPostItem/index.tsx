import React, {type ReactNode} from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';
import InlineCopyButton from '@site/src/components/InlineCopyButton';

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): ReactNode {
  const metadata = props.children?.type?.metadata;
  const permalink = metadata?.permalink;
  const isWeeklyBlog = permalink?.includes?.('/weekly/');
  const isBlog = permalink?.includes?.('/blog/');

  return (
    <>
      <BlogPostItem {...props} />
      {isWeeklyBlog && (
        <blockquote style={{margin: 'var(--ifm-spacing-vertical) 0'}}>
          <p>
            ✨ 每周分享好事、好物、好书，目前仅在本站发布，欢迎 RSS 订阅：{' '}
            <span style={{display: 'inline-flex', alignItems: 'center'}}>
              https://wukaipeng.com/weekly/rss.xml
              <InlineCopyButton content="https://wukaipeng.com/weekly/rss.xml" />
            </span>
          </p>
        </blockquote>
      )}
      {isBlog && (
        <blockquote style={{margin: 'var(--ifm-spacing-vertical) 0'}}>
          <p>
            ✨ 分享对编程、生活和宇宙的思考，目前仅在本站发布，欢迎 RSS 订阅：{' '}
            <span style={{display: 'inline-flex', alignItems: 'center'}}>
              https://wukaipeng.com/blog/rss.xml
              <InlineCopyButton content="https://wukaipeng.com/blog/rss.xml" />
            </span>
          </p>
        </blockquote>
      )}
    </>
  );
}
