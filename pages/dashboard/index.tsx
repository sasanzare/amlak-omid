
import Image from 'next/image'
import styles from './Dashboard.module.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Dashboard() {
    return (
        <Container className="pt-5 mt-4 pb-4">
            <div className={styles.dashback}>

            </div>
            <Row className={['mt-5', styles.dashmain]}>
                <Col sm={4} className='text-center p-3 '>
                    <Card>
                        asdasd
                    </Card>
                </Col>
                <Col sm={8} className='text-center p-3 '>
                    <Card>
                        asdasd
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}