import './index.less';

import React from 'react';
import classNames from 'classnames';
import { WithFalse } from '../typings';

export interface GlobalFooterProps {
  links?: WithFalse<
    {
      key?: string;
      title: React.ReactNode;
      href: string;
      blankTarget?: boolean;
    }[]
  >;
  copyright?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default ({ className, links, copyright, style }: GlobalFooterProps) => {
  const clsString = classNames('ant-pro-global-footer', className);
  return (
    <footer className={clsString} style={style}>
      {links && (
        <div className="ant-pro-global-footer-links">
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && (
        <div className="ant-pro-global-footer-copyright">{copyright}</div>
      )}
    </footer>
  );
};
