import React from 'react';

const TicketModal = ({ open_ticket }) => {
    console.log(window.location.hash);
    if (window.location.hash === open_ticket.ticket_number) {
        document.getElementById(open_ticket.ticket_number).style.display = "block";
    }

    return (
        <div id={open_ticket.ticket_number} class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="row">
                    this is a modal
                </div>
            </div>
        </div>
    );
}

export default TicketModal;