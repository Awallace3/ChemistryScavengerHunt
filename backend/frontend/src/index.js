import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as EventProvider } from './context/EventContext'
import { Provider as SurveyProvider } from './context/SurveyContext'

ReactDOM.render(
  <React.StrictMode>
    <SurveyProvider>
      <EventProvider>
        <App />
      </EventProvider>
    </SurveyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
