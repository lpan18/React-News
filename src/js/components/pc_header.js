import React from "react";
import {Link} from "react-router-dom";
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

class PCHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      current: "top",
      modalVisible: false,
      action: "login",
      hasLogined: false,
      userNickname: "",
      userid: 0
    };
  }
  componentWillMount() {
    if (localStorage.userid !== "") {
      this.setState({hasLogined: true});
      this.setState({
        userNickName: localStorage.userNickName,
        userid: localStorage.userid
      });
    }
  }
  setModalVisible(value) {
    this.setState({modalVisible: value});
  }
  handleClick(e) {
    if (e.key == "register") {
      this.setState({current: e.key});
      this.setModalVisible(true);
    } else {
      {
        this.setState({current: e.key});
      }
    }
  }
  //页面开始向API提交数据
  handleSubmit(e) {
    //阻止事件冒泡
    e.preventDefault();
    var myFetchOptions = {
      method: "GET"
    };
    var formData = this.props.form.getFieldsValue();
    // console.log(formData);
    fetch(
      "http://newsapi.gugujiankong.com/Handler.ashx?action=" +
        this.state.action +
        "&username=" +
        formData.userName +
        "&password=" +
        formData.password +
        "&r_userName=" +
        formData.r_userName +
        "&r_password=" +
        formData.r_password +
        "&r_confirmPassword=" +
        formData.r_confirmPassword,
      myFetchOptions
    )
      .then(res => res.json())
      .then(json => {
        this.setState({userNickname: json.NickUserName, userid: json.UserId});
        localStorage.userid = json.UserId;
        localStorage.userNickname = json.NickUserName;
      });
    if (this.state.action == "login") {
      this.setState({hasLogined: true});
    }
    message.success("请求成功！");
    this.setModalVisible(false);
  }
  callback(key) {
    if (key == 1) {
      this.setState({action: "login"});
    } else if (key == 2) {
      this.setState({action: "register"});
    }
  }
  logout() {
    localStorage.userid = "";
    localStorage.userNickname = "";
    this.setState({hasLogined: false});
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined ? (
      <Menu.Item key="logout" class="register">
        <Button type="primary" htmlType="button">
          {this.state.userNickname}
        </Button>
        &nbsp;&nbsp;
        <Link target="_blank" to={`/usercenter`}>
          <Button type="dashed" htmlType="button">
            个人中心
          </Button>
        </Link>
        &nbsp;&nbsp;
        <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>
          退出
        </Button>
      </Menu.Item>
    ) : (
      <Menu.Item key="register" class="register">
        <Icon type="appstore" />
        注册/登录
      </Menu.Item>
    );

    return (
      <header>
        <Row>
          <Col span={2} />
          <Col span={4}>
            <a href="/" class="logo">
              <img src="./src/images/logo.png" alt="logo" />
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu
              mode="horizontal"
              onClick={this.handleClick.bind(this)}
              selectedKeys={[this.state.current]}>
              <Menu.Item key="top">
                <Icon type="appstore" />
                头条
              </Menu.Item>
              <Menu.Item key="shehui">
                <Icon type="appstore" />
                社会
              </Menu.Item>
              <Menu.Item key="guonei">
                <Icon type="appstore" />
                国内
              </Menu.Item>
              <Menu.Item key="guoji">
                <Icon type="appstore" />
                国际
              </Menu.Item>
              <Menu.Item key="yule">
                <Icon type="appstore" />
                娱乐
              </Menu.Item>
              <Menu.Item key="tiyu">
                <Icon type="appstore" />
                体育
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="appstore" />
                科技
              </Menu.Item>
              <Menu.Item key="shishang">
                <Icon type="appstore" />
                时尚
              </Menu.Item>
              {userShow}
            </Menu>

            <Modal
              title="用户中心"
              wrapClassName="vertical-center-modal"
              visible={this.state.modalVisible}
              onCancel={() => this.setModalVisible(false)}
              onOk={() => this.setModalVisible(false)}
              okText="关闭">
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
                            <Icon
                              type="user"
                              style={{color: "rgba(0,0,0,.25)"}}
                            />
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
                        <Input
                          type="password"
                          prefix={
                            <Icon
                              type="lock"
                              style={{color: "rgba(0,0,0,.25)"}}
                            />
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
                            <Icon
                              type="user"
                              style={{color: "rgba(0,0,0,.25)"}}
                            />
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
                        <Input
                          type="password"
                          prefix={
                            <Icon
                              type="lock"
                              style={{color: "rgba(0,0,0,.25)"}}
                            />
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
                        <Input
                          type="password"
                          prefix={
                            <Icon
                              type="lock"
                              style={{color: "rgba(0,0,0,.25)"}}
                            />
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
          </Col>
          <Col span={2} />
        </Row>
      </header>
    );
  }
}
export default (PCHeader = Form.create({})(PCHeader));
