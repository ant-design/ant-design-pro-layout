import './ThemeColor.less';

import { CheckOutlined } from '@ant-design/icons';

import { Tooltip } from 'antd';

import React from 'react';
import { genThemeToString } from '../utils/utils';

export interface TagProps {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = React.forwardRef(
  ({ color, check, ...rest }, ref) => (
    <div {...rest} style={{ backgroundColor: color }} ref={ref as any}>
      {check ? <CheckOutlined /> : ''}
    </div>
  ),
);

export interface ThemeColorProps {
  colors?: {
    key: string;
    color: string;
  }[];
  title?: string;
  value: string;
  onChange: (color: string) => void;
  formatMessage: (data: { id: any; defaultMessage?: string }) => string;
}

const ThemeColor: React.FC<ThemeColorProps> = (
  { colors, title, value, onChange, formatMessage },
  ref,
) => {
  const colorList = colors || [];
  if (colorList.length < 1) {
    return null;
  }
  return (
    <div className="theme-color" ref={ref}>
      <h3 className="theme-color-title">{title}</h3>
      <div className="theme-color-content">
        {colorList.map(({ key, color }) => {
          const themeKey = genThemeToString(key);
          return (
            <Tooltip
              key={color}
              title={
                themeKey
                  ? formatMessage({
                      id: `app.setting.themecolor.${themeKey}`,
                    })
                  : key
              }
            >
              <Tag
                className="theme-color-block"
                color={color}
                check={value === key || genThemeToString(value) === key}
                onClick={() => onChange && onChange(key)}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default React.forwardRef(ThemeColor);
