import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
                <Link to="/landing" className="navbar-brand">DevConnector</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#mobile-nav" //반응형
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/profiles" className="nav-link">{'　'}Developers</Link>
                        </li>
                    </ul>
                    
                    <ul className="navbar-nav mr-right">
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Sign In</Link>
                        </li>
                    </ul>
                </div>
          </div> { /** .container */ }
      </nav>
    );
  }
}
