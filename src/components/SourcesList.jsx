import React from 'react';
import _ from 'lodash';
import { Image, Icon, Search, Grid } from 'semantic-ui-react';
import newsSourcesStore  from '../stores/NewsSourcesStore';
import actions from '../actions/actions';
import NavBar from './templates/NavBar';
import SideBar from './templates/SideBar';
import Source from './templates/Source';
import BaseApp from './BaseApp';

/**
 * components to display list of sources reterieved from the api
 */
class SourcesList extends BaseApp {

  /**
   * constructor - set default state values
   *
   * @param  {object} props
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      sources: newsSourcesStore.getAll(),
    };


    this.update = this.update.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  /**
   * componentDidMount - Make a call to the action for getting the ources
   *  Add change listener
   * @return {void}  description
   */
  componentDidMount() {
    actions.getSources();
    newsSourcesStore.addChangeListener(this.update);
  }


  /**
   * update - Called when there is a changed to sources rertrieved from the api
   *
   * @return {voi}
   */

  update() {
    this.setState({
      sources: newsSourcesStore.getAll(),
    });
  }

  /**
   * componentWillUnMount - remove change listener
   *
   * @return {void}
   */
  componentWillUnMount() {
    newsSourcesStore.removeChangeListener(this.update);
  }



  /**
   * handleChange - handles filtering news sources
   *
   * @param  {event} e
   * @param  {string} val type value
   * @return {void}
   */
  handleSearchChange(e, val) {
    this.setState({
      isLoading: true,
      value: val,
    });

      if (this.state.value.length < 1) return this.resetComponent();
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => { return re.test(result.header); };
      this.setState({
        isLoading: false,
        sources:_.filter(this.state.sources, isMatch),
      });
  }

  /**
   * render -  rendered the sources page
   */
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
          <NavBar trigger={trigger} options={this.menuOptions} />
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
                  onSearchChange={this.handleSearchChange}
                  results={results}
                  value={value}
                  fluid
                  className="search-sources"
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

export default SourcesList;
