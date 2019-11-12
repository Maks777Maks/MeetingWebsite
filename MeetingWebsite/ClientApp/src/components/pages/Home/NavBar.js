import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './instruments/css/palette.css';
import { catchClause } from '@babel/types';
import logo from './instruments/img/logo.jpg';
import { connect } from 'tls';
import { logout } from '../login/reducer';
import { withRouter } from 'react-router-dom';


class Header extends Component {

    render() {

      const { isAuthenticated } = this.props.login;
    console.log("this.props.login",this.props);

      const logoutLink = (
        <NavItem className="d-flex align-items-center">
          <NavLink href="#/" onClick={e => this.props.onLogout(e)}
            className="social-link rounded-circle text-white mr-3">
            Вихід
          </NavLink>
        </NavItem>
      );

      const loginLink = (
        <NavItem className="d-flex align-items-center">
          <NavLink href="#/login"
            className="social-link rounded-circle text-white mr-3" >
            Вхід
             </NavLink>
        </NavItem>
      );

        return (
            <React.Fragment>
           
          <Nav pills className="navbar navbar-expand-lg bg-black shadow fixed-top font-weight-bold text-uppercase">
            {/* <div className="collapse navbar-collapse "> */}
            <NavItem>
              <NavLink href="#"><img alt="bobik" className="img-fluid" src={logo} style={{ width: 40, height: 40 }} /> </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#/" className="social-link rounded-circle text-white mr-3">Дівчата</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#/boys" className="social-link rounded-circle text-white mr-3"> Хлопці</NavLink>
            </NavItem>
            {/* </div>
            <div className="collapse navbar-collapse justify-content-end" id="navigation"> */}
            {/* <NavItem>
              <NavLink href="#/login" className="social-link rounded-circle text-white mr-3" > Вхід</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="#/register" className="social-link rounded-circle text-white mr-3"> Реєстрація</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href="#/register" className="social-link rounded-circle text-white mr-3"> Вихід</NavLink>
            </NavItem> */}
              {/* {isAuthenticated ? userLink : null} */}
              {isAuthenticated ? logoutLink : loginLink}
            {/* </div> */}

          </Nav>


</React.Fragment>
        );
    }
}

const mapStateToProps = state => {
  console.log("mapStateToProps=======", state);
  return {
    login: state.login
  };
}

export default Header;
//export default withRouter(connect( mapStateToProps, null, { logout })(Header));
