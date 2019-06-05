import React, { Component } from 'react'
import axios from 'axios';
import { Header, Container, Grid, Card, Image, Icon, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class ArticlesByCategory extends Component {
  state = {
    categoryName: '',
    articles: []
  }

  componentDidMount() {
    let categoryName= this.props.location.pathname.substring(1)
    this.setState({categoryName: categoryName})
    axios.get('/api/v1/articles').then(response => {
      this.setState({ articles: response.data });
    })
  }

  componentDidUpdate(prevProps) {
    let categoryName= this.props.location.pathname.substring(1)
    if (prevProps.location.pathname.substring(1) !== categoryName ) {
      this.setState({categoryName: categoryName})
    }
  }

  render() {
    let category = this.state.categoryName.charAt(0).toUpperCase() + this.state.categoryName.slice(1);
    let filteredArticles = []

    this.state.articles.forEach(article => {
      if (this.state.categoryName === 'news') {
        return filteredArticles.push(article)
      } else if (article.category.name === category) {
        return filteredArticles.push(article)
      } else {
        return filteredArticles
      }
    })

    let articleList = filteredArticles.length ? (
      <div>
        {filteredArticles.map(article => {
          return (
            <Card fluid key={article.id} as={Link} to={{ pathname: '/full-article', state: { id: `${article.id}` } }} >
              <div id={article.id} style={{ color: 'black' }}>
                <Image fluid alt="article logo" id={`photo_${article.id}`} src={article.image} />
                <Card.Content style={{ padding: '2em' }}>
                  <Card.Header as='h1' id={`title_${article.id}`}>{article.title}</Card.Header>
                  <p id={`ingress_${article.id}`}>{article.ingress}</p>
                  <h5 style={{ color: 'grey' }} id={`country_city_${article.id}`}><Icon name='map marker alternate'/>{`${article.city}, ${article.country}`}</h5>
                </Card.Content>
              </div>
            </Card>
          )
        })}     
      </div>
    ) : (
      <Message>
        <Message.Header>There are no {category} articles at the moment</Message.Header>
        <p>
          Be the first to post your own article and become a neighborhood journalist!
        </p>
      </Message>
    )

    return(
      <>
        <Container>
          <Header id="headline">
            {category}
          </Header>

          <Grid fluid columns={3}>
            <Grid.Column width={8}>
              {articleList}
            </Grid.Column>

            <Grid.Column width={4}>
            </Grid.Column>

            <Grid.Column width={3}>
            </Grid.Column>
          </Grid>
        </Container>
      </>
    )
  }
}

export default ArticlesByCategory 