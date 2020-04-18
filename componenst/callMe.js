import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';

const callMe = () => {
    const { Paragraph, Text } = Typography;
    return (
        <Row style={{ background: 'rgba(228, 228, 228, 0.15)', marginTop: '4em', marginBottom: '4em' }} justify='center'>
            <Col span={20} >
                <Paragraph style={{ textAlign: 'center' }}>
                    <Text className="fbText">Еще больше товаров в нашем магазине Facebook </Text>
                </Paragraph>
                <Button style={{ margin: '0 auto', display: 'block' }} type="primary" shape="round" icon={<FacebookOutlined />} size={'large'} > Перейти </Button>
            </Col>
        </Row>
    )
}

export default callMe;