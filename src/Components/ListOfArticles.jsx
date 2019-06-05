import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Container, Card, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class ListOfArticles extends Component {
  state = {
    articles: [],
    id: '',
  }

  componentDidMount() {
    axios.get('/api/v1/articles').then(response => {
      this.setState({ articles: response.data });
    });
  }

  render() {
    let articleList = this.state.articles.length ? (
      <div>
        {this.state.articles.map(article => {
          if (article.published === true) {
            return (
              <Card fluid key={article.id} as={Link} to={{ pathname: `/full-article/${article.id}`, state: { id: `${article.id}` } }} >
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
          }
        })}
      </div>
    ) : (
        <h2>There are no articles at the moment. You can be the first to post your own article and become a neighborhood journalist!</h2>
      )

    return (
      <>
        <Container>
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

export default ListOfArticles
