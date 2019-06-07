import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Profile from './Profile';

export default class ProfileGithub extends Component {

    constructor(props){
        super(props);
        this.state = {
            clientId: 'd0c2d62427547b4a820f',
            clientSecret: 'd0f2a1ec086b2b251f73f448652dfafa69df3c9a',
            count: 5,
            sort: 'created: asc',
            repos: []
        };
    }

    componentDidMount(){
        const { username } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;

        // 위의 정보로 접속.
        fetch(
            `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
        )
            .then(res => res.json())
            .then(data => {
                if(this.refs.myRef){
                    this.setState({repo: data});
                }
            })
            .catch(err => console.log(err));
    }

    render() {

        const { repos } = this.state;

        const repoItems = repos.map(repo => (
            <div key={repo._id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <Link to={repo.html_url} className="text-info" target="_blank">
                                {repo.name}
                            </Link>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div>
                        <span className="badge badge-info mr-1">
                            Stars: {repo.stargazers_count}
                        </span>
                        <span className="badge badge-secondary mr-1">
                            Wachers: {repo.wachers_count}
                        </span>
                        <span className="badge badge-success">
                            Forks: {repo.forks_count}
                        </span>
                    </div>
                </div>
            </div>
        ));

        return (
            <div ref="myRef">
                <hr />
                <h3 className="mb-4">Latest Github Repos</h3>
                {repoItems}
            </div>
        );
    }
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
};