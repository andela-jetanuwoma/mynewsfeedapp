import React, { Component } from 'react';
import { Card, Grid, Image } from 'semantic-ui-react';
import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const TwitterIcon = generateShareIcon('twitter');

class Article extends Component {
  render() {
    const { article } = this.props;

    return (
      <Grid.Column width={5} >
        <Card href={article.href}>
          <Image src={article.image} />
          <Card.Content>
            <Card.Header>
              {article.header}
            </Card.Header>
            <Card.Description>
              {article.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <FacebookShareButton
              url={article.href}
              title={article.header}
              children={<FacebookIcon size={32} round={true} />}
              className="sharebtn"
            />
            <GooglePlusShareButton
              url={article.href}
              title={article.header}
              children={<GooglePlusIcon size={32} round={true} />}
              className="sharebtn"
            />
            <LinkedinShareButton
              url={article.href}
              title={article.header}
              children={<LinkedinIcon size={32} round={true} />}
              className="sharebtn"
            />
            <TwitterShareButton
              url={article.href}
              title={article.header}
              children={<TwitterIcon size={32} round={true} />}
              className="sharebtn"
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

export default Article;
