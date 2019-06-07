import React, { Component } from 'react';
import { connect } from 'reacct-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProfileAbout } from './ProfileAbout';
import { ProfileCreds } from './ProfileCreds';
import { ProfileGithub } from './ProfileGithub';
import { ProfileHeader } from './ProfileHeader';
import Spinner from '../common/Spinner';
import { getProfileHandle } from '../../actions/profileAction/getProfileHandle';

class Profile extends Component {

    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileHandle(this.props.match.params.handle)  
        }
    }

    render(){
        return(
            <div>
                <ProfileAbout />
                <ProfileCreds />
                <ProfileGithub />
                <ProfileHeader />
            </div>
        );
    }
}

Profile.propTypes = {
    getProfileHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileHandle })(Profile);