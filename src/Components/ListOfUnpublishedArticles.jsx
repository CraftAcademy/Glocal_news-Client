import React, { Component } from 'react';
import axios from 'axios';
import { Header, Container, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class ListOfUnpublishedArticles extends Component {
  state = {
    articles: [],
    review_success_message: false
  }

  componentDidMount() {
    axios.get('/api/v1/articles').then(response => {
      this.setState({ articles: response.data });
    });
  }

  render() {
    let articleList = (
      <div>
        {this.state.articles.map(article => {
          if (article.published === false) {
            return (
              <Container key={article.id} as={Link} to={{ pathname: '/full-article', state: { success_message: false, review_form: true, id: article.id } }}>
                <div id={article.id} >
                  <img alt="article logo" id={`photo_${article.id}`} src={article.image} width="200" height="100" />
                  <h1 id={`title_${article.id}`}>{article.title}</h1>
                  <h3 id={`ingress_${article.id}`}>{article.ingress}</h3>
                  <h5 id={`country_city_${article.id}`}>{`Country: ${article.country}, City: ${article.city}`}</h5>
                </div>
              </Container>
            )
          }
        })}
      </div>
    )

    let message

    if(this.state.review_success_message){
      message = (
        <p>Review successfully created</p>
      )
    }

    return (
      <>
        <Container>
          {message}
          <Header>
            Unpublished Articles (if you see nothing in this page, there are no articles up for review)
          </Header>

          <Grid centered columns={3}>
            <Grid.Column width={7}>
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

export default ListOfUnpublishedArticles
