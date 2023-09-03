import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import 'moment/locale/pt';
import { styled } from 'styled-components';
const localizer = momentLocalizer(moment);


function ShedulerComponent(props){ 
  return (
    <Container>  
       <Calendar
        localizer={localizer}   events={props.data ? props.data : []} startAccessor="start"
        endAccessor="end" style={{ height: 500 }}  />
    </Container>
  )
}

const Container = styled.div`
    width:100%; 
`;


export default ShedulerComponent

/*

eventStyleGetter: function(event, start, end, isSelected) {
    console.log(event);
    var backgroundColor = '#' + event.hexColor;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
},

render: function () {

    return (
        <Layout active="plan" title="Planning">
            <div className="content-app fixed-header">
                <div className="app-body">
                    <div className="box">
                        <BigCalendar
                            events={this.events}
                            defaultDate={new Date()}
                            defaultView='week'
                            views={[]}
                            onSelectSlot={(this.slotSelected)}
                            onSelectEvent={(this.eventSelected)}
                            eventPropGetter={(this.eventStyleGetter)}
                            />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

*/
 