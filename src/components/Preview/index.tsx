import React from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';
import LinkCardV2 from '../LinkCardV2';
import IFrame from '../IFrame';

interface Props {
  url: string;
}

export default function Preview({ url }: Props): React.ReactElement {
  return (
    <>
      <LinkCardV2 url={url} />
      <IFrame url={url} />
    </>
  );
}
