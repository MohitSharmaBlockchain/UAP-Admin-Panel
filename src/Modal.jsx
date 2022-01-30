import { Modal, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function MyVerticallyCenteredModal({ show, setShow }) {
    const handleClose = () => setShow(false)

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur minus rerum asperiores tempora, labore quas nisi
                    obcaecati voluptates pariatur veniam dolorem error
                    temporibus.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary'>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
