import React, { useState, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav';
import { searchProfile, setIsUserNull } from '../redux/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Search() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.search.Profile);
    const isUser = useSelector(state => state.search.isUser);

    const [username, setUsername] = useState("");
    const [isDisabled, setIsDisabled] = useState(true)
    const [style, setStyle] = useState({opacity: "0.5"})
    
    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    useEffect(() => {
        if((username.length >= 5) && (username.length <= 15)){
            setIsDisabled(false)
            setStyle({ opacity: "1" })
        }else{
            setIsDisabled(true)
            setStyle({opacity: "0.5"})
        }
    }, [setIsDisabled, username])

    const handleClick = async() => {
        dispatch(searchProfile(username))
    }

    useEffect(() => {
        (async () => {
            if((isUser === true) && (profile !== null)){
                await dispatch(setIsUserNull);
                await navigate(username)
            }
        })()
    }, [isUser, username, profile, navigate, dispatch])
    return (
        <div className=' container-fluid d-flex flex-column search-container min-vh-100'>
            <label className='form-label text-center fs-2 mt-5'>Search Profile</label>
            <div className='d-flex border border-primary mt-3 ms-auto me-auto search-bar'>
                <input className='border-0 w-100 ps-2 ms-2' onChange={(e) => handleChange(e)}/>
                <Nav.Link className='search-button' style={style} onClick={handleClick} disabled={isDisabled === true}>
                    <i className="fas fa-search"></i>
                </Nav.Link>
            </div>
            {
                isUser === false && isDisabled === false && (
                    <div className='profile-not-found'>*Profil bulunamadı</div>
                )
            }
        </div>
    )
}

export default React.memo(Search);
