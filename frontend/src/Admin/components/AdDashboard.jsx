
import { Row, Col, Card, Statistic,  Progress, Space } from 'antd';
import { Line } from '@ant-design/plots';
import {
  UserOutlined,
  FileOutlined,
  EyeOutlined,
  MessageOutlined,
} from '@ant-design/icons';

const AdDashboard = () => {
  // Data for statistics
  const stats = [
    { title: 'Total Users', value: 1234, icon: <UserOutlined />, color: '#1890ff' },
    { title: 'Total Posts', value: 876, icon: <FileOutlined />, color: '#52c41a' },
    { title: 'Total Views', value: 45678, icon: <EyeOutlined />, color: '#faad14' },
    { title: 'Total Comments', value: 3456, icon: <MessageOutlined />, color: '#eb2f96' },
  ];

  // Data for the line chart
  const chartData = [
    { month: 'Jan', views: 4000 },
    { month: 'Feb', views: 3000 },
    { month: 'Mar', views: 5000 },
    { month: 'Apr', views: 4000 },
    { month: 'May', views: 6000 },
   
  ];

  const config = {
    data: chartData,
    xField: 'month',
    yField: 'views',
    smooth: true,
    color: '#1890ff',
    height: 200, // Reduced height for smaller size
    xAxis: {
      label: {
        style: {
          fill: '#8c8c8c',
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: '#8c8c8c',
        },
      },
    },
    responsive: true, // Makes the chart responsive
  };

  return (
    <div style={{ padding: 0 }}>
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12} lg={16}>
          <Card title="Monthly Views">
            <Line {...config} />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card title="Engagement Progress">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <strong>Likes</strong>
                <Progress percent={80} status="active" />
              </div>
              <div>
                <strong>Shares</strong>
                <Progress percent={60} status="active" />
              </div>
              <div>
                <strong>Comments</strong>
                <Progress percent={50} status="active" />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdDashboard;
