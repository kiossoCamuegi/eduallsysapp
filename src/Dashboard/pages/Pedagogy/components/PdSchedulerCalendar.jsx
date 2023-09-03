import React, { Component } from 'react';
import Scheduler from './Scheduler';
import Toolbar from './Toolbar';
import MessageArea from './MessageArea';

const data = [
    { start_date:'2023-04-03 6:00', end_date:'2023-04-03 10:00', text:`reunião dos professores` , color:'red',  id: 1},
    { start_date:'2023-04-09 11:00', end_date:'2023-04-09 12:00', text:`reunião dos professores` , color:'purple',  id: 2},
    { start_date:'2023-04-07 3:00', end_date:'2023-04-07 9:00', text:'Event 2', color:'gold', id: 3},
    { start_date:'2023-04-06 3:00', end_date:'2023-04-06 10:00', text:'Event 2', color:'green', id: 4},
    { start_date:'2023-04-05 8:00', end_date:'2023-04-05 9:00', text:'Event 2', color:'blue', id: 5},
    { start_date:'2023-04-04 5:00', end_date:'2023-04-04 11:00', text:'Event 2', color:'orange', id: 6},
];

class PdSchedulerCalendar extends Component {
    state = {
        currentTimeFormatState: true,
        messages: []
    };

    addMessage(message) {
        const maxLogLength = 5;
        const newMessage = { message };
        const messages = [
            newMessage,
            ...this.state.messages
        ];

        if (messages.length > maxLogLength) {
            messages.length = maxLogLength;
        }
        this.setState({ messages });
    }

    logDataUpdate = (action, ev, id) => {
        const text = ev && ev.text ? ` (${ev.text})` : '';
        const message = `event ${action}: ${id} ${text}`;
        this.addMessage(message);
    }

    handleTimeFormatStateChange = (state) => {
        this.setState({
            currentTimeFormatState: state
        });
    }

    render() {
        const { currentTimeFormatState, messages } = this.state; 
        return (
            <div>
                <div className="tool-bar">
                    <Toolbar
                        timeFormatState={currentTimeFormatState}
                        onTimeFormatStateChange={this.handleTimeFormatStateChange}
                    />
                </div>
                <div className='scheduler-container'>
                    <Scheduler
                        events={data}
                        timeFormatState={currentTimeFormatState}
                        onDataUpdated={this.logDataUpdate}
                    />
                </div>
                {/**   <MessageArea
                    messages={messages}
              /> */}
            </div>
        );
    }
}

export default PdSchedulerCalendar