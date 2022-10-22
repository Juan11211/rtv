import React, {useState, useContext} from 'react'
import AuthForm from './AuthForm'
import { UserContext } from '../context/UserContext'

export default function Auth() {
    const initInputs = {username: "", password: ""}

    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    // functions coming in from userContext
    const {signup, login, errMsg, resetAuthorErr} = useContext(UserContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs)
        console.log(inputs)
    }

    function handleLogin(e){
        e.preventDefault()
        login(inputs)
    }

    function toggleForm(){
        setToggle(prev => !prev)
        resetAuthorErr()
      }


    return (
        <div className='auth-container'>
            <h1>ROCK THE WORLD WITH YOUR VOTE!</h1>

            {!toggle ?
            <>
                <AuthForm 
                    handleChange={handleChange}
                    handleSubmit={handleSignup}
                    inputs={inputs}
                    btnText="Sign Up"
                />
                <p style={{color: "red"}}>{errMsg}</p>
                <p onClick={toggleForm}>Already a member?</p> 
            </>
            :
            <>
                <AuthForm 
                    handleChange={handleChange}
                    handleSubmit={handleLogin}
                    inputs={inputs}
                    btnText="Login"
                />
                <p style={{color: "red"}}>{errMsg}</p>
                <p onClick={toggleForm}>Not a member?</p> 

            </>
            }
        </div>
    )
}