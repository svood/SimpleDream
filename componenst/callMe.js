import React from 'react';
import { Row, Col, Button, Typography, Tag } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import ReactGA from 'react-ga';
import styled from 'styled-components'


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
                <Paragraph style={{ textAlign: 'center', fontSize: '19pt', color: '#163a5b' }}>
                    <Text className="fbText">{t("callMe.text")}</Text>
                    <div>
                        <Tag color="magenta">{t('tags.kits')}</Tag>
                        <Tag color="red">{t('tags.envelopes')}</Tag>
                        <Tag color="volcano">{t('tags.diapers')}</Tag>
                        <Tag color="orange">{t('tags.beads')}</Tag>
                        <Tag color="gold">{t('tags.ponce')}</Tag>
                        <Tag color="lime">{t('tags.towels')}</Tag>
                        <Tag color="green">{t('tags.bedspreads')}</Tag>
                        <Tag color="cyan">{t('tags.blankets')}</Tag>
                        <Tag color="blue">{t('tags.pillows')}</Tag>
                    </div>
                </Paragraph>
                <Button style={{ margin: '0 auto', display: 'block' }} type="primary" shape="round" icon={<FacebookOutlined />} size={'large'} onClick={e => goToFb()}> {t("callMe.button")} </Button>
            </Col>
        </Row>
    )
}

export default callMe;