import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import ChangeAvatar from './ChangeAvatar'
import ChangeUsername from './ChangeUsername'
import ChangePassword from './ChangePassword'
import ChangeFullname from './ChangeFullname'
import DeletePhoto from './DeletePhoto'
import AccountPrivacy from './AccountPrivacy'
import DeleteProfile from './DeleteProfile'
function DropdownMenu() {
    return (
        <Dropdown title="Settings">
            <Dropdown.Toggle variant="bg-transparent" id="dropdown-basic">
                <i className="fas fa-user-cog"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <ChangeAvatar />
                <ChangeUsername />
                <ChangePassword />
                <ChangeFullname />
                <DeletePhoto />
                <AccountPrivacy />
                <DeleteProfile />
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownMenu
