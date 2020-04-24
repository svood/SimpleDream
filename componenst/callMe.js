import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import ReactGA from 'react-ga';
const callMe = ({ t }) => {
    const { Paragraph, Text } = Typography;
    const goToFb = () => {
        ReactGA.event({
            category: 'Info',
            action: 'Go to FB',
        });
        window.location.href = 'https://www.facebook.com/simpledreamsukraine/'
    }
    return (
        <Row style={{ background: 'rgba(228, 228, 228, 0.15)', marginTop: '4em', marginBottom: '4em', padding: '2em' }} justify='center'>
            <Col sm={24} md={20}>
                <Paragraph style={{ textAlign: 'center' }}>
                    <Text className="fbText">{t("callMe.text")}</Text>
                </Paragraph>
                <Button style={{ margin: '0 auto', display: 'block' }} type="primary" shape="round" icon={<FacebookOutlined />} size={'large'} onClick={e => goToFb()}> {t("callMe.button")} </Button>
            </Col>
        </Row>
    )
}

export default callMe;