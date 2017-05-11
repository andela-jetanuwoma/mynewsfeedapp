import React from 'react';
import _ from 'lodash';
import { Image, Icon, Search, Grid } from 'semantic-ui-react';
import NewsSourcesStore  from '../stores/NewsSourcesStore ';
import AppActions from '../actions/AppActions';
import AppBar from './templates/AppBar';
import SideBar from './templates/SideBar';
import Source from './templates/Source';
import BaseApp from './BaseApp';

class SourcesView extends BaseApp {
  constructor(props) {
    super(props);

    this.state = {
      sources: NewsSourcesStore .getAll(),
    };


    this.onChange = this.onChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.setItemsState = this.setItemsState.bind(this);
  }

  componentDidMount() {
    AppActions.getSources();
    NewsSourcesStore .addChangeListener(this.onChange);
  }


  onChange() {
    this.setItemsState();
  }


  setItemsState() {
    this.setState({
      sources: NewsSourcesStore .getAll(),
    });
  }

  componentWillUnMount() {
    NewsSourcesStore .removeChangeListener(this.onChange);
  }

  resetComponent() {
    this.setState({
      isLoading: false,
      results: [],
      sources: NewsSourcesStore .getAll(),
      value: '',
    });
  }

  handleSearchChange(e, val) {
    this.setState({
      isLoading: true,
      value: val,
    });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => { return re.test(result.header); };
      this.setState({
        isLoading: false,
        sources:_.filter(this.state.sources, isMatch),
      });
      return true;
    }, 500);
  }

  render() {

    const {
      isLoading,
      value,
       results,
     } = this.state;



    const trigger = (
      <span>
        <Image avatar src={this.user.imageUrl} /> {this.user.name}
      </span>
    );

    return (
      <div>
        <div>
          <AppBar trigger={trigger} options={this.menuOptions} />
          <Grid>
            <SideBar />
            <Grid.Column width={12} className="middleColumn">
              <div className="main">
                <p className="contentType">
                  <Icon name="rss" color="teal" />
                  Choose The News Source Want To Read
               </p>
                <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={this.handleSearchChange}
                  results={results}
                  value={value}
                  fluid
                  className="search_sources"
                />

                <Grid className="sources">
                  {this.state.sources.map((source, index) => {
                    return (<Source source={source} key={index} />)
                  })}
                </Grid>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }

}

export default SourcesView;
