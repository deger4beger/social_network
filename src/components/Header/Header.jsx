import s from "./Header.module.css"
import {Link} from "react-router-dom"
import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/authSelectors';
import { logout } from '../../redux/authReducer';

// если 2 класса то в класс нейм: {`${s.item} ${s.active}`}

function Header(props) {

    const { Header, Content, Footer, Sider } = Layout;
    
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return (

      <Header className="header">
          <Row>
              <Col span={4}>
                  <img src="https://riki.dotabuff.com/t/l/jGcY67ky8a.png" alt="logo" className={s.logo}/>
              </Col>
              <Col span={14}>
                  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                      <Menu.Item key="1"><Link to="/users">Find Users</Link></Menu.Item>
                  </Menu>
              </Col>
              <Col span={6}>                 
                  {isAuth ? 
                    <div>
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        <span className={s.login}>{login}</span>
                        <Button onClick={logoutCallback}>Log out</Button>
                    </div>    
                        : <Link to={`/login`} className={s.login_link}>Login</Link>}
              </Col>
          </Row>                  
      </Header>
    )

}

export default Header