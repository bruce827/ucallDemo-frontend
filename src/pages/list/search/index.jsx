import React, { Component } from 'react';
import { Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';

class Search extends Component {
  handleTabChange = key => {
    const { match } = this.props;
    const url = match.url === '/' ? '' : match.url;

    switch (key) {
      case 'articles':
        history.push(`${url}/articles`);
        break;

      case 'applications':

        // history.push(`${url}/applications`);
        break;

      case 'projects':

        // history.push(`${url}/projects`);
        break;

      default:
        break;
    }
  };

  handleFormSubmit = value => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  getTabKey = () => {
    const { match, location } = this.props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');

    if (tabKey && tabKey !== '/') {
      return tabKey;
    }

    return 'articles';
  };

  render() {
    const tabList = [
      {
        key: 'articles',
        tab: '儿童保险',
      },
      {
        key: 'projects',
        tab: '成人保险',
      },
      {
        key: 'applications',
        tab: '中老年人报销',
      },
      {
        key: '',
        tab: '公共知识库',
      },
    ];
    const mainSearch = (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Input.Search
          placeholder="请输入标题或摘要"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{
            maxWidth: 522,
            width: '100%',
          }}
        />
      </div>
    );
    const { children } = this.props;
    return (
      <PageHeaderWrapper
        pageTitleRender={null}
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default Search;
