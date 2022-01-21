import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { changePrivacy } from '../redux/profileSlice';

function AccountPrivacy() {
    const privacy = useSelector(state => state.profile.profile.privacy);
    const dispatch= useDispatch();

    const handleClick = async() => {
        await dispatch(changePrivacy(privacy === "Show" ? "Hide" : "Show"))
    }
    return (
            <Dropdown.Item onClick={handleClick}>
                Privacy: <strong>{privacy === "Show" ? "Hide" : "Show"}</strong>
            </Dropdown.Item>
    )
}

export default AccountPrivacy
