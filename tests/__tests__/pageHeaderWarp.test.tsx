import { render, mount } from 'enzyme';
import React from 'react';
import ProLayout, { PageHeaderWrapper } from '../../src';
import defaultProps from './defaultProps';
import { waitForComponentToPaint } from './util';

describe('BasicLayout', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: false,
        addListener() {},
        removeListener() {},
      })),
    });
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'zh-CN'),
      },
    });
  });

  it('base use', () => {
    const html = render(
      <ProLayout {...defaultProps}>
        <PageHeaderWrapper />
      </ProLayout>,
    );
    expect(html).toMatchSnapshot();
  });

  it('content is text', () => {
    const html = render(
      <ProLayout {...defaultProps}>
        <PageHeaderWrapper content="just so so" />
      </ProLayout>,
    );
    expect(html).toMatchSnapshot();
  });

  it('title=false, don not render title view', async () => {
    const wrapper = mount(
      <ProLayout {...defaultProps}>
        <PageHeaderWrapper title={false} />
      </ProLayout>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-page-header-heading-title')).toHaveLength(0);
  });

  it('have default title', async () => {
    const wrapper = mount(
      <ProLayout {...defaultProps}>
        <PageHeaderWrapper />
      </ProLayout>,
    );
    await waitForComponentToPaint(wrapper);
    const titleDom = wrapper.find('.ant-page-header-heading-title');
    expect(titleDom.text()).toEqual('welcome');
  });

  it('title overrides the default title', async () => {
    const wrapper = mount(
      <ProLayout {...defaultProps}>
        <PageHeaderWrapper title="name" />
      </ProLayout>,
    );
    await waitForComponentToPaint(wrapper);
    const titleDom = wrapper.find('.ant-page-header-heading-title');
    expect(titleDom.text()).toEqual('name');
  });
});
