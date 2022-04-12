import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'
import axios from 'axios'
// import { Navigate } from 'react-router-dom'

const Login = ({ setLogin, err, setErr }) => {
    const loginAdmin = (e) => {
        e.preventDefault()
        // console.log({
        //     email: e.target[0].value,
        //     password: e.target[1].value,
        // })
        axios
            .post('https://media-prime-backend.herokuapp.com/admin/login', {
                email: e.target[0].value,
                password: e.target[1].value,
            })
            .then((res) => {
                localStorage.setItem('adminnInfo', JSON.stringify(res))
                // console.log(JSON.parse(localStorage.getItem('userInfo')))
                setLogin(true)
            })
            .catch((err) => {
                setErr('Invalid Credentials!')
                console.log(err)
            })
    }

    return (
        <div className='login__container'>
            <div className='login__card'>
                <Form
                    onSubmit={(e) => {
                        loginAdmin(e)
                    }}
                >
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            required={true}
                        />
                        <Form.Text className='text-muted'>
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                        {/* <Form.Check type='checkbox' label='Check me out' /> */}
                        {err && err !== '' && (
                            <Form.Text className='text-danger'>
                                {/* We'll never share your email with anyone else. */}
                                {err}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login
