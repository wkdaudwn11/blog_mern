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

        const { profile, loading } = this.props.profile;
        let profileContent;

        if(profile === null || loading){
            profileContent = <Spinner />;
        }else{
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-mb-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back To Profiles
                            </Link>
                        </div>
                        <div className="col-mb-6"></div>
                    </div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout />
                    <ProfileCreds />
                    <ProfileGithub />
                </div>
            )
        }

        return(
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-mb-12">{profileContent}</div>
                    </div>
                </div>
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