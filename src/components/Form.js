import React from 'react'
import {Button, TextField} from "@material-ui/core"
import axios from "axios"
import styled from "styled-components"

const Form = ({ name, setName, lastname, setLastname, isLogin, setIsLogin, setUserId }) => {
    
    const handleSubmit = async (e) => {
        console.log("submit")
        e.preventDefault()
        if( name !== "" && lastname !== "" ) {
            const postUser = await axios.post('http://localhost:8080/user', {
                name,
                lastname
            })
    
            console.log("postUser", postUser)
            setIsLogin(true)
            setUserId(postUser.data.newId)
        } else {
            console.log("probleme")
        }
        
    }
    
    return (
        <ContainerFormStyled>
            <h2>{isLogin ? `Bonjours ${name} ${lastname}` : "Inscrivez vos identifiant:"}</h2>
            <FormStyled noValidate autoComplete="off">
                <TextField id="name"
                           label="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           variant="outlined"
                           disabled={isLogin}
                />
                <TextField id="lastname"
                           label="lastname"
                           value={lastname}
                           onChange={(e) => setLastname(e.target.value)}
                           variant="outlined"
                           disabled={isLogin}
                />
                <Button onClick={(e) => handleSubmit(e)} variant="contained" color="primary">
                    Submit
                </Button>
            </FormStyled>
        </ContainerFormStyled>
    )
}

const ContainerFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const FormStyled = styled.form`
  display: flex;
  align-items: center;
  margin-top: 15px;
  
  > div {
    margin-right: 15px;
  }
`

export default Form