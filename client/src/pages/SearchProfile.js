import React, { useEffect } from 'react'
import { getSearcherProfile } from '../redux/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import SearchProfileImages from '../components/SearchProfileImages';

function SearchProfile() {
    let navigate = useNavigate();
        let { username } = useParams();
        const dispatch = useDispatch();
        const fullName = useSelector(state => state.search.Profile.fullName);
        const avatar = useSelector(state => state.search.Profile.avatar);
        const privacy = useSelector(state => state.search.Profile.privacy);

        useEffect(() => {
            dispatch(getSearcherProfile(username));
        }, [dispatch, username])

        useEffect(() => {
            if(fullName && avatar && privacy === "err"){
                navigate("/search")
            }
        }, [fullName, avatar, privacy, navigate])

        const handlePreviousPage = () => {
            navigate("/search")
        }

        return (
            <div className="mt-5 profile min-vh-100">
                <i title='back' className="fas fa-arrow-left search-back-page" onClick={handlePreviousPage} />
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
                    </div>
                    <div className="row fs-4 justify-content-center mt-3">
                            {fullName}
                    </div>
                </div>
                    {
                        privacy === "Show" ?
                        <SearchProfileImages />
                        :
                        <p className='text-center mt-5'>This profile is protected.</p>
                    }
            </div>
    )
}

export default SearchProfile
