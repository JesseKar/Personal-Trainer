import { useEffect, useState } from 'react';
import BigCalendar from 'react-big-calendar-like-google';
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css';
import moment from 'moment';


// google big calendar
function Calendar() {
  BigCalendar.momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [viewDate, setViewDate] = useState(moment().toDate());
  const [view, setView] = useState('month');

  const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings/')
    .then(Response => Response.json())
    .then(data => {
        setEvents(eventConverter(data));
      })
    .catch(err => console.error(err))
}

  const eventConverter = (list) => {
    const newList = list.map((event) => {
      return {
        start: moment(event.date).toDate(),
        end: moment(event.date).add(event.duration, 'm').toDate(),
        title: event.activity + ' / ' + event.customer?.firstname + ' ' + event.customer?.lastname
      }
    });
    return newList;
  }

  const eventPressed = (e) => {
    console.log(e);
    setView('day');
    setViewDate(moment(e.start).toDate());
  }

  const updateView = (type) => {
    setView(type);
  }

  const navigate = (date) => {
    setViewDate(date);
  }

  const daySelected = (date) => {
    setView('day');
    setViewDate(date);
  }

  return (
    <div style={{ width: '75%', height: '800px', margin: 'auto' }}>
      <BigCalendar
        events={events}
        views={allViews}
        step={60}
        date={viewDate}
        view={view}
        onSelectEvent={eventPressed}
        onDrillDown={daySelected}
        onNavigate={navigate}
        onView={updateView}
      />
    </div>
  );
}

export default Calendar;