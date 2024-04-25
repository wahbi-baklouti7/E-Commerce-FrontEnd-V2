import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import React from 'react'

const CardArticle = ({article}) => {
  return (
    <Card style={{ width: '18rem' }} className=" m-3 col-4" >
    <Card.Img variant="top" src={article.imageart} />
    <Card.Body>
      <Card.Title>{article.designation}</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
  )
}

export default CardArticle