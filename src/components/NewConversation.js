import React, {useState} from 'react'
import {Button, TextField} from "@material-ui/core"
import axios from "axios"
import styled from "styled-components"
import Tooltip from '@material-ui/core/Tooltip';

const NewConversation = ({setConversations, fetchConversations, isLogin}) => {
    const [newConversation, setNewConversation] = useState("")
    
    const sendNewConversation = async (e) => {
        if( newConversation !== "" && isLogin ) {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/conversation`, {
                name: newConversation
            })
            setNewConversation("")
            fetchConversations().then((res) => {
                setConversations(res)
            })
            
        } else {
            console.log("probleme")
        }
    }
    
    return (
        
        <ContainerNewConversation>
            <Tooltip title={!isLogin && "Veuillez vous connectez svp"} aria-label="connect you before">
            <TextField id="newConversation"
                       label="Ajouter une conversation"
                       value={newConversation}
                       onChange={(e) => setNewConversation(e.target.value)}
                       variant="outlined"
                       disabled={!isLogin}
            />
            </Tooltip>
            <Button disabled={!isLogin} onClick={(e) => sendNewConversation(e)} variant="contained" color="primary">
                Submit
            </Button>
        </ContainerNewConversation>
        
    )
}

const ContainerNewConversation = styled.div`
    display: flex;
    align-items: center;
  button {
    margin-left: 15px;
  }
`

export default NewConversation