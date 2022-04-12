import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const VerifyEmail = ({ setRegister }) => {
    const [err, setErr] = useState('')
    const [data, setData] = useState('')
    const location = useLocation().pathname.split('/')
    const token = location ? location[4] : ''
    const email = location ? location[3] : ''
    const authenticationToken = location ? location[2] : ''
    // console.log(token, email, authenticationToken)

    const registerAdmin = async (e) => {
        e.preventDefault()
        // console.log(location)
        const password = e.target[0].value
        const confirmPassword = e.target[1].value

        if (password !== confirmPassword) {
            setErr('Password does not match!')
            return
        } else {
            axios
                .post(
                    `https://media-prime-backend.herokuapp.com/admin/verify-email?email=${email}&token=${authenticationToken}`,
                    {
                        password: password,
                        token: token,
                    }
                )
                .then((req) => {
                    console.log(req.data)
                    setData(req.data)
                    setRegister(true)
                })
                .catch((err) => {
                    console.log(err.response.data.msg)
                    setErr(err.response.data.msg)
                })
        }
    }

    return (
        <div className='login__container'>
            <div className='login__card w-[30%]'>
                <div className='upper__text'>
                    <h3 className='mb-4 text-center'>Confirm Password</h3>
                </div>
                <Form
                    onSubmit={(e) => {
                        registerAdmin(e)
                    }}
                >
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            required={true}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
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
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default VerifyEmail
