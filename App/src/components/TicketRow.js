import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TicketRow = ({ ticket, handleViewTicketResources }) => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        handleViewTicketResources(ticket)
    }

    return (
        <tr>
            {
                Object.values(ticket).map((value) => (
                    <td>{value==null ? "-": value}</td>
                ))
            }
            <td>
                <Button variant="primary" onClick={handleShow}>
                    View Ticket
                </Button>
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ticket #{ticket.TICKET_NUMBER}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        <tr>
                            <th>
                                Asset
                            </th>
                        </tr>
                        {/* {
                            ticket.reserved_assets.map((value, index) => (
                                <tr>
                                    <td>{value}</td>
                                </tr>
                            ))
                        } */}
                    </table>
                    <table>
                        <tr>
                            <th>
                                Requested IT Help Desk
                            </th>
                        </tr>
                        {/* {
                            ticket.reserved_assets.map((value, index) => (
                                <tr>
                                    <td>{value}</td>
                                </tr>
                            ))
                        } */}
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Resolve
                    </Button>
                </Modal.Footer>
            </Modal>
        </tr>
    );
}

export default TicketRow;