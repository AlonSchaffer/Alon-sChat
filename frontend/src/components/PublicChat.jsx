import React from 'react'
import { useParams } from 'react-router'
import Chat from './Chat'
import NavSideBar from './NavSideBar/NavSideBar'
import RowContainer from './RowContainer/RowContainer'

function PublicChat() {
    const {username} = useParams()
    return (
        <RowContainer>
            <NavSideBar username = {username}/>
            <Chat username={username}/>
        </RowContainer>
    )
}

export default PublicChat
