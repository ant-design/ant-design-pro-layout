import { render } from 'enzyme';

import React from 'react';
import PageContainer from '../../src/PageContainer';
import FooterToolbar from '../../src/FooterToolbar';

describe('PageContainer', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: false,
        addListener() {},
        removeListener() {},
      })),
    });
  });

  it('💄 base use', async () => {
    const html = render(<PageContainer title="期贤" />);
    expect(html).toMatchSnapshot();
  });

  it('⚡️ support footer', async () => {
    const html = render(
      <PageContainer
        title="期贤"
        footer={[<button type="button">right</button>]}
      />,
    );
    expect(html).toMatchSnapshot();
  });

  it('🔥 support footer', async () => {
    const html = render(
      <PageContainer
        title="期贤"
        breadcrumb={{
          routes: [
            {
              path: '/',
              breadcrumbName: 'home',
            },
          ],
        }}
        footer={[
          <button key="right" type="button">
            right
          </button>,
        ]}
      />,
    );
    expect(html).toMatchSnapshot();
  });

  it('🔥footer bar support extra', async () => {
    const html = render(
      <FooterToolbar
        className="qixian_footer"
        extra={
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="logo"
          />
        }
      >
        <button type="button">right</button>
      </FooterToolbar>,
    );
    expect(html).toMatchSnapshot();
  });

  it('🔥footer bar support renderContent', async () => {
    const html = render(
      <FooterToolbar
        className="qixian_footer"
        extra={
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="logo"
          />
        }
        renderContent={() => {
          return 'home_toolbar';
        }}
      >
        <button type="button">right</button>
      </FooterToolbar>,
    );
    expect(html).toMatchSnapshot();
  });
});
