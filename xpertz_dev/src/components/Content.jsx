import React from 'react'
import {Layout,theme } from 'antd';

const {Content} = Layout;
export default function Content_dev() {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
  return (
    <div>
         <Content
        style={{
          padding: '0 48px',
        }}
      >
       
        <div
          style={{
            padding: 70,
            minHeight: 200,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        
        </div>
      </Content>
    </div>
  )
}
