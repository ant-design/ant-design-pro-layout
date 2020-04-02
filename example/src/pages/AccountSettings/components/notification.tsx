import { List, Switch } from 'antd';
import React, { Component, Fragment } from 'react';

import { formatMessage } from 'umi-plugin-react/locale';

type Unpacked<T> = T extends (infer U)[] ? U : T;

class NotificationView extends Component {
  getData = () => {
    const Action = (
      <Switch
        checkedChildren={formatMessage({ id: 'accountsettings.settings.open' })}
        unCheckedChildren={formatMessage({
          id: 'accountsettings.settings.close',
        })}
        defaultChecked
      />
    );
    return [
      {
        title: formatMessage(
          { id: 'accountsettings.notification.password' },
          {},
        ),
        description: formatMessage(
          { id: 'accountsettings.notification.password-description' },
          {},
        ),
        actions: [Action],
      },
      {
        title: formatMessage(
          { id: 'accountsettings.notification.messages' },
          {},
        ),
        description: formatMessage(
          { id: 'accountsettings.notification.messages-description' },
          {},
        ),
        actions: [Action],
      },
      {
        title: formatMessage({ id: 'accountsettings.notification.todo' }, {}),
        description: formatMessage(
          { id: 'accountsettings.notification.todo-description' },
          {},
        ),
        actions: [Action],
      },
    ];
  };

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List<Unpacked<typeof data>>
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default NotificationView;
