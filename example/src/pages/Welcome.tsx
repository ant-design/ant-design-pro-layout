import React from 'react';
import { PageContainer } from '../../../src';

export default (): React.ReactNode => {
  console.log('run');
  return (
    <PageContainer>
      <div style={{ textAlign: 'center', minHeight: '120vh' }}>
        Want to add more pages? Please refer to{' '}
        <a
          href="https://pro.ant.design/docs/block-cn"
          target="_blank"
          rel="noopener noreferrer"
        >
          use block
        </a>
        。
      </div>
    </PageContainer>
  );
};
