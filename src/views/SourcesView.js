import React, {Component} from 'react';
import _ from 'lodash'
import '../App.css';
import {Segment, Menu, Image, Icon, Header, Card, Search, Dropdown} from 'semantic-ui-react'
import NewsSourcesStore from '../stores/NewsSourcesStore';
import AppActions from '../actions/AppActions';
import createHistory from 'history/createBrowserHistory';

const history = createHistory({ 
  forceRefresh: true
}) 

class  SourcesView extends Component{
  constructor(props){
    super(props);
    this.state = {
      activepage: 'discover'}
  }
   getItemsState() {
	  return {
	  	sources:NewsSourcesStore.getAll(),
	    visibility:false,
	    activepage: 'discover',
	  };
   }

     componentWillMount(){
       const {user} = this.props;
       if(!user.isLogin){
        history.push('/');
       }
     }
	
     _onChange = () =>{
     	
     	this.setState(this.getItemsState());

     }

	  toggleVisibility = () => this.setState({ visibility: !this.state.visibility });


	  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });


    handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value })

      setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = (result) => re.test(result.header)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.sources, isMatch),
      })
    }, 500);
  }

	componentDidMount = ()=>{

         NewsSourcesStore.addChangeListener(this._onChange);

     }

     componentWillUnMount = ()=>{
         NewsSourcesStore.removeChangeListener(this._onChange);
     }

	render(){
		const { activepage, isLoading, value, results } = this.state;
    const {user} = this.props;
    const trigger = (
      <span>
        <Image avatar src={user.imageUrl} /> {user.name}
      </span>
     )

      const options = [
        { key: 'sign-out', text: 'Sign Out', icon: 'sign out', href: '/logout' },
      ]
		return (
<div onLoad={ AppActions.getSources() }>
 
           <Menu pointing>
                 <Menu.Item name={activepage} active={activepage === 'discover'} />
                  <Menu.Item name='Feeds' active={activepage === 'feeds'} />
                  <Menu.Menu position='right'>
                  <Menu.Item>
                     <Dropdown trigger={trigger} options={options} pointing='top left' icon={null} />
                  </Menu.Item>
            </Menu.Menu>
        </Menu>

            <Segment basic>
               <div className="container">
               <Header as='h2' icon>
                 <Icon name='rss' color='teal' />
            News Sources
           <Header.Subheader>
              </Header.Subheader>
           </Header>

          
        
          <Search
            className="container"
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            fluid
          ></Search>
        
        
           <Card.Group itemsPerRow={4} className="container" items={this.state.sources} />
               </div>
            </Segment>


       
      </div>
			);
	}
}


export default SourcesView;