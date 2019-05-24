import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>UniHelp</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/newsfeed'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> News feed
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/createpost'}>
              <NavItem>
                <Glyphicon glyph='plus' /> Create Post
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/createuser'}>
              <NavItem>
                <Glyphicon glyph='plus' /> Create User
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/login'}>
              <NavItem>
                <Glyphicon glyph='plus' /> Login
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
