import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route,Switch} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
import PCNewsDetails from './components/pc_news_details';
import MobileNewsDetails from './components/mobile_news_details';
import PCUserCenter from './components/pc_usercenter';
import MobileUserCenter from './components/mobile_usercenter';
import 'antd/dist/antd.css';

class Root extends React.Component{
  render(){
    return (
      <Router>
        <div>
          <MediaQuery query="(min-device-width: 1224px)">
            <Switch>
              <Route exact path="/" component={PCIndex}></Route>
              <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
              <Route path="/usercenter" component={PCUserCenter}></Route>
            </Switch>
          </MediaQuery>
          <MediaQuery query="(max-device-width: 1224px)">
            <Switch>
              <Route exact path="/" component={MobileIndex}></Route>
              <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
              <Route path="/usercenter" component={MobileUserCenter}></Route>
            </Switch>
          </MediaQuery>
        </div>
      </Router>
    );
  };
}
// 入口的定义
ReactDOM.render(<Root/>,document.getElementById('mainContainer'));
