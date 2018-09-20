import React from "react";
import {Router,Link} from 'react-router-dom';
import {Row, Col} from "antd";
import {
  Menu,
  Icon,
  Modal,
  Tabs,
  message,
  Form,
  Input,
  Button,
  CheckBox
} from "antd";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component{
  constructor() {
    super();
    this.state = {
      current: "top",
      modalVisible: false,
      action: "login",
      haslogined: false,
      userNickname: "",
      userid: 0
    };
  }
  setModalVisible(value) {
    this.setState({modalVisible: value});
  }

  handleClick(e) {
    if (e.key == "register") {
      this.setState({current: e.key});
      this.setModalVisible(true);
    } else {
      this.setState({current: e.key});
    }
  }
  //页面开始向API提交数据
  handleSubmit(e) {
    //阻止事件冒泡
    e.preventDefault();
    var myFetchOptions  = {
      method:'GET'
    };
    var formData = this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({userNickName: json.NickUserName, userid: json.UserId});
		});
		if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	};

	login(){
		this.setModalVisible(true);
	};

	callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	};


  render(){
    const {getFieldDecorator} = this.props.form;
    const userShow = this.state.haslogined?
    <Link to={`/usercenter`}>
      <Icon type="inbox"/>
    </Link>
    :
    <Icon type="setting" onClick={this.login.bind(this)}/>
    return (
      <div id='mobileheader'>
        <header>
          <img src="./src/images/logo.png" alt="logo"/>
          <span>ReactNews</span>
          {userShow}
        </header>
        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
          <Tabs type="card" onChange={this.callback.bind(this)}>
            <TabPane tab="登录" key="1">
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator("userName", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your username!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>
                      }
                      placefolder="Username"
                    />
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password!"
                      }
                    ]
                  })(
                    <Input type="password"
                      prefix={
                        <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                      }
                      placefolder="Password"
                    />
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator("r_userName", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your username!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>
                      }
                      placefolder="Username"
                    />
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator("r_password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password!"
                      }
                    ]
                  })(
                    <Input type="password"
                      prefix={
                        <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                      }
                      placefolder="Password"
                    />
                  )}
                </FormItem>
                <FormItem label="确认密码">
                  {getFieldDecorator("r_confirmPassword", {
                    rules: [
                      {
                        required: true,
                        message: "Please confirm your password!"
                      }
                    ]
                  })(
                    <Input type="password"
                      prefix={
                        <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                      }
                      placefolder="Conform password"
                    />
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit">
                  注册
                </Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  };
}

export default MobileHeader = Form.create({})(MobileHeader);
