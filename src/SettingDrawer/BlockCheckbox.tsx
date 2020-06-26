import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import React, { useState, useEffect } from 'react';

export interface BlockCheckboxProps {
  value: string;
  onChange: (key: string) => void;
  list?: {
    title: string;
    key: string;
    url: string;
  }[];
  prefixCls: string;
}

const BlockCheckbox: React.FC<BlockCheckboxProps> = ({
  value,
  onChange,
  list,
  prefixCls,
}) => {
  const baseClassName = `${prefixCls}-drawer-block-checkbox`;
  const [dom, setDom] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const domList = (list || []).map((item) => (
      <Tooltip title={item.title} key={item.key}>
        <div
          className={`${baseClassName}-item`}
          onClick={() => onChange(item.key)}
        >
          <img src={item.url} alt={item.key} />
          <div
            className={`${baseClassName}-selectIcon`}
            style={{
              display: value === item.key ? 'block' : 'none',
            }}
          >
            <CheckOutlined />
          </div>
        </div>
      </Tooltip>
    ));
    setDom(domList);
  }, [value]);
  return (
    <div
      className={baseClassName}
      key={value}
      style={{
        minHeight: 42,
      }}
    >
      {dom}
    </div>
  );
};

export default BlockCheckbox;
