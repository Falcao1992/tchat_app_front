import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import axios from 'axios'
import Form from "./components/Form"
import styled from "styled-components"
import {Button, TextField} from "@material-ui/core"
import NewConversation from "./components/NewConversation"

function TabPanel(props) {
    const {
        children,
        value,
        index,
        ...other
    } = props
    console.log("props", props)
    
    return (
        <ContainerMessages
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <BlockMessages>
                    {children}
                </BlockMessages>
            )}
        </ContainerMessages>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`
    }
}))

function App() {
    const classes = useStyles()
    const [conversations, setConversations] = useState(null)
    const [messages, setMessages] = useState(null)
    const [name, setName] = React.useState("")
    const [lastname, setLastname] = React.useState("")
    const [value, setValue] = React.useState(0)
    const [isLogin, setIsLogin] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const [userId, setUserId] = useState(null)
    
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    
    const fetchConversations = async () => {
        const response = await axios.get('http://localhost:8080/conversation')
        console.log("response", response)
        return response.data
    }
    
    const fetchMessages = async () => {
        const response = await axios.get('http://localhost:8080/message')
        console.log("response", response)
        return response.data
    }
    useEffect(() => {
        fetchConversations().then((res) => {
            setConversations(res)
        })
        fetchMessages().then((res) => {
            setMessages(res)
        })
    }, [])
    
    
    const sendMessage = async (e, ConversationId) => {
        console.log("message envoyé", newMessage)
        await axios.post('http://localhost:8080/message', {
            content: newMessage,
            UserId: userId,
            ConversationId,
            author: name
        })
        fetchMessages().then((res) => {
            setMessages(res)
        })
        setNewMessage("")
    }
    
    const deleteConversation = async (e,ConversationId) => {
        await axios.delete(`http://localhost:8080/conversation/${ConversationId}`)
        fetchConversations().then((res) => {
            setConversations(res)
        })
    }
    
    return (
        <ContainerAppStyled className="App">
            <Form setUserId={setUserId}
                  name={name}
                  setName={setName}
                  lastname={lastname}
                  setLastname={setLastname}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin} />
                  
                  <NewConversation fetchConversations={fetchConversations} setConversations={setConversations} />
            <ContainerTabsStyled>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    scrollButtons="off"
                >
                    {conversations && conversations.map((conv) => {
                        return (
                            <TabStyled key={conv.id} label={conv.name} />
                        )
                    })}
                </Tabs>
                
                {conversations && conversations.map((conv, index) => {
                    if (value !== index) {
                        return null
                    }
                    return (
                        <TabPanel key={conv.id} value={value} index={index}>
                            {messages && messages.filter(message => message.ConversationId === conv.id).map((msg) => {
                                return (
                                    <BlockMessage key={msg.id} ownmessage={msg.UserId === userId}>
                                        <p>{msg.author}</p>
                                        <p>{msg.content}</p>
                                        <span>{msg.createdAt}</span>
                                    </BlockMessage>
                                )
                            })}
                            <BlockSendMessage>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Multiline"
                                    multiline
                                    rowsMax={4}
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    variant="outlined"
                                    disabled={!userId}
                                />
                                <Button disabled={!userId}
                                        onClick={(e) => sendMessage(e, conv.id)}
                                        variant="contained"
                                        color="primary">
                                    envoyer message
                                </Button>
                                <Button
                                        onClick={(e) => deleteConversation(e, conv.id)}
                                        variant="contained"
                                        color="secondary">
                                    supprimer conversation
                                </Button>
                            </BlockSendMessage>
                        </TabPanel>
                    )
                })}
            </ContainerTabsStyled>
        </ContainerAppStyled>
    )
}

const ContainerAppStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 28px;
`

const ContainerTabsStyled = styled.div`
  display: flex;
  margin: 25px 0;
`

const TabStyled = styled(Tab)`
  padding: 25px;
  background-color: #7adaff;
 
`
const ContainerMessages = styled.div`
  height: 65vh;
  overflow-x: hidden;
  border: 1px solid lightgrey;
  border-radius: 8px;
  background-color: lightcyan;
  padding: 10px;
  min-width: 450px;
  display: flex;
  flex-direction: column;
  position: relative;
`
const BlockMessages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`

const BlockMessage = styled.div`
  margin-bottom: 10px;
  width: fit-content;
  border-radius: 20px;
  background-color: ${props => props.ownmessage ? "#81f381" : "#7adaff"};
  padding: 18px;
  text-align: ${props => props.ownmessage ? "left" : "right"};
  margin-left: ${props => !props.ownmessage && "auto"};

  span {
    font-size: 14px;
  }
`

const BlockSendMessage = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  button {
    margin-top: 10px;
  }
`

export default App
