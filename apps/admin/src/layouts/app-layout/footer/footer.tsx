import React from 'react';
import ss from './footer.module.scss';

export const COPY_RIGHT = '©seri';  // TODO: change it to yours
export const LINK_TEXT = 'next-admin'; // TODO: change it to yours
export const LINK_HREF = 'https://github.com/seriwb/next-admin';  // TODO: change it to yours

const Footer = () => {
  return (
    <div className={ss.container}>
      <a href={LINK_HREF} target='_blank' rel='noopener noreferrer'>
        {LINK_TEXT}
      </a>
      <span className={ss.copyright}>{COPY_RIGHT}</span>
    </div>
  );
};

export default React.memo(Footer);
