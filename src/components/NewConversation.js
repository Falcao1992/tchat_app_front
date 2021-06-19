import React, {useState} from 'react'
import {Button, TextField} from "@material-ui/core"
import axios from "axios"

const NewConversation = ({setConversations, fetchConversations}) => {
    const [newConversation, setNewConversation] = useState("")
    
    const sendNewConversation = async (e) => {
        if( newConversation !== "" ) {
            await axios.post('http://localhost:8080/conversation', {
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
        <div>
            <TextField id="lastname"
                       label="lastname"
                       value={newConversation}
                       onChange={(e) => setNewConversation(e.target.value)}
                       variant="outlined"
            />
            <Button onClick={(e) => sendNewConversation(e)} variant="contained" color="primary">
                Submit
            </Button>
        </div>
    )
}

export default NewConversation