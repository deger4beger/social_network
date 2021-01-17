import './App.css';
import NavbarContainer from "./components/Navbar/NavbarContainer"
import News from "./components/News/News"
import Login from "./components/Login/Login"
import Music from "./components/Music/Music"
import {UsersPage} from "./components/Users/UsersContainer"
import Settings from "./components/Settings/Settings"
import { Link, Route, Switch, Redirect} from "react-router-dom"
import React from "react";
import {initializeApp} from "./redux/appReducer"
import {connect} from "react-redux"
import Preloader from "./components/common/Preloader/Preloader"
import 'antd/dist/antd.css'
import { Avatar, Button, Col, Row } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Header from './components/Header/Header';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./components/ChatPage/ChatPage'))

class App extends React.Component {
    
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <div style={{textAlign: "center"}}><Preloader /></div>
        }


        return (
            <Layout>
                <Header />
                <Content style={{ padding: '0 50px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                  </Breadcrumb>
                  <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={200}>
                      <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        // defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                      >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
                          <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                          <Menu.Item key="2"><Link to="/messages">Messages</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Users">
                          <Menu.Item key="5"><Link to="/users">Find Users</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<NotificationOutlined />} title="Media">
                          <Menu.Item key="9"><Link to="/chat">Chat</Link></Menu.Item>
                        </SubMenu>
                      </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Switch>
                            <Route exact path="/" render={() =>
                                <Redirect to={"/profile"}/>}/>
                            <Route path="/profile/:userId?" render={() =>
                                <React.Suspense fallback={<div>Загрузка...</div>}>
                                    <ProfileContainer />
                                </React.Suspense>}/>
                            <Route path="/messages" render={() =>                  
                                <React.Suspense fallback={<div>Загрузка...</div>}>
                                    <DialogsContainer/>
                                </React.Suspense>}/>
                            <Route path="/news" render={() =>
                                <News/>}/>
                            <Route path="/music" render={() =>
                                <Music/>}/>
                            <Route path="/users" render={() =>
                                <UsersPage/>}/>
                            <Route path="/settings" render={() =>
                                <Settings/>}/>  
                            <Route path="/chat" render={() =>                  
                                <React.Suspense fallback={<div>Загрузка...</div>}>
                                    <ChatPage/>
                                </React.Suspense>}/>      
                            <Route path="/login" render={() =>
                                <Login />}/>    
                            <Route path="*" render={() =>
                                <div>404 NOT FOUND</div>}/> 
                        </Switch>    
                    </Content>
                  </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>React first steps ©2020 Created by deger_beger</Footer>
            </Layout>
        )    
        // )
        // return (
        //     <div className="app-wrapper">
        //         <HeaderContainer />
        //         <NavbarContainer />
        //         <div className="app-wrapper-content">
        //             <Switch>
        //                 <Route exact path="/" render={() =>
        //                     <Redirect to={"/profile"}/>}/>
        //                 <Route path="/profile/:userId?" render={() =>
        //                     <React.Suspense fallback={<div>Загрузка...</div>}>
        //                         <ProfileContainer />
        //                     </React.Suspense>}/>
        //                 <Route path="/messages" render={() =>                  
        //                     <React.Suspense fallback={<div>Загрузка...</div>}>
        //                         <DialogsContainer/>
        //                     </React.Suspense>}/>
        //                 <Route path="/news" render={() =>
        //                     <News/>}/>
        //                 <Route path="/music" render={() =>
        //                     <Music/>}/>
        //                 <Route path="/users" render={() =>
        //                     <UsersPage/>}/>
        //                 <Route path="/settings" render={() =>
        //                     <Settings/>}/>
        //                 <Route path="/login" render={() =>
        //                     <Login />}/>    
        //                 <Route path="*" render={() =>
        //                     <div>404 NOT FOUND</div>}/> 
        //             </Switch>      
        //         </div>
        //     </div>
        // );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App)

