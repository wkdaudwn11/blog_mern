import React, { Component } from 'react'

export default class Landing extends Component {
  render() {
    return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>Developer Connector</h1>
                            <p className="lead">
                                {'　'}
                                Create a developer profile/portfolio, share posts and get help from other developers
                            </p>
                            <hr />
                            <a href="register.html" className="btn btn-large btn-info mr-2">Sign Up</a>
                            <a href="login.html" className="btn btn-large btn-success mr-2">Sign In</a>
                        </div>
                    </div>
                </div>
            </div>
        </div> /** .landing */
    );
  };
};
