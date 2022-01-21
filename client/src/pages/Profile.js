import React, { useEffect } from 'react'
import DropdownMenu from '../components/DropdownMenu';
import { getProfile } from '../redux/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddImageButton from '../components/AddImageButton';
import ProfileImages from '../components/ProfileImages';

function Profile() {
    const dispatch = useDispatch();
    const username = useSelector(state => state.profile.profile.username);
    const fullName = useSelector(state => state.profile.profile.fullName);
    const avatar = useSelector(state => state.profile.profile.avatar);
    useEffect(() => {
        dispatch(getProfile(localStorage.getItem("id")));
    }, [dispatch])
    return (
        <div className="mt-5 profile min-vh-100">
            <div className="container-fluid d-grid justify-content-center text-center">
                    {
                        avatar !== "" ?
                        <div className='avatar ms-auto me-auto' style={{backgroundImage: `url(${avatar})`}}></div>
                        :
                        <i className="row far fa-user-circle ms-auto me-auto"></i>
                    }
                <div className="row mt-3 align-items-center">
                    <div className="col fw-lighter fs-5">
                        {username}
                    </div>
                    <div className="col ">
                        <DropdownMenu />
                    </div>
                </div>
                <div className="row fs-4 justify-content-center mt-3">
                        {fullName}
                </div>
                <AddImageButton />
            </div>

            <ProfileImages />
        </div>
    )
 } //

export default Profile;
