import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
    state = {
        userLoggedIn: false,
        userRole: null,
        userName: null
    }

    displayName = NavMenu.name

    componentDidMount() {
        const name = window.localStorage.getItem('userName');
        const role = window.localStorage.getItem('userRole');
        if (name) {
            this.setState({ userLoggedIn: true, userName: name, userRole: role });
        }
    }

    render() {
        let result;
        switch (this.state.userRole) {
            case "Student":
                result = this.renderStudentAccount();
                break;
            case "Teacher":
                result = this.renderTeacherAccount();
                break;
            case "Administration":
                result = this.renderAdministrationAccount();
                break;
            default:
                result = this.renderUnregisteredAccount();
        }
        

        return (
            <Navbar inverse fixedTop fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>UniHelp</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {result}
                </Navbar.Collapse>
            </Navbar>
        );
    }

    renderAllAccount() {
        return (
            <Nav>
                <NavItem>
                    <Glyphicon glyph='user' /> {this.state.userName}
                </NavItem>

                <LinkContainer to={'/login'}>
                    <NavItem>
                        <Glyphicon glyph='plus' /> Login
                    </NavItem>
                </LinkContainer>

                <LinkContainer to={'/'} exact>
                    <NavItem>
                        <Glyphicon glyph='home' /> About
                    </NavItem>
                </LinkContainer>

                <LinkContainer to={'/logout'}>
                    <NavItem>
                        <Glyphicon glyph='minus' /> Logout
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
            </Nav>
        );
    }

    renderUnregisteredAccount() {
        return (
            <Nav>
                <LinkContainer to={'/login'}>
                    <NavItem>
                        <Glyphicon glyph='plus' /> Login
                    </NavItem>
                </LinkContainer>

                <LinkContainer to={'/'} exact>
                    <NavItem>
                        <Glyphicon glyph='home' /> About
                    </NavItem>
                </LinkContainer>
            </Nav>
        );
    }

    renderStudentAccount() {
        return (
            <Nav>
                <NavItem>
                    <Glyphicon glyph='user' /> {this.state.userName}
                </NavItem>

                <LinkContainer to={'/logout'}>
                    <NavItem>
                        <Glyphicon glyph='minus' /> Logout
                    </NavItem>
                </LinkContainer>

                <LinkContainer to={'/newsfeed'}>
                    <NavItem>
                        <Glyphicon glyph='th-list' /> News feed
                    </NavItem>
                </LinkContainer>
            </Nav>
        );
    }

    renderTeacherAccount() {
        return (
            <Nav>
                <NavItem>
                    <Glyphicon glyph='user' /> {this.state.userName}
                </NavItem>

                <LinkContainer to={'/logout'}>
                    <NavItem>
                        <Glyphicon glyph='minus' /> Logout
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
            </Nav>
        );
    }

    renderAdministrationAccount() {
        return (
            <Nav>
                <NavItem>
                    <Glyphicon glyph='user' /> {this.state.userName}
                </NavItem>

                <LinkContainer to={'/logout'}>
                    <NavItem>
                        <Glyphicon glyph='minus' /> Logout
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
            </Nav>
        );
    }
}
