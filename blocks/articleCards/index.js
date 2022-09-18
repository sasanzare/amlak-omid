import {Row,Col } from 'react-bootstrap';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
function ArticleCards(props) {
    const cards = props.data.cards.map((card) =>(
        <Col key={card.img} lg={4} md={6} sm={12} className='ArticleCards pt-5'>
             <ArticleCard img={card.img} title={card.title} content={card.content} />
        </Col>
    ));
  return (
        <Row>
            {cards}
        </Row>
  );
}

export default ArticleCards;



