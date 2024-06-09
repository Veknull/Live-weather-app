import React from 'react';
import { Card, Feed } from 'semantic-ui-react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faCloud, faCloudRain, faSmog, faSnowman, faSun } from '@fortawesome/free-solid-svg-icons';
import RainAnimation from './RainAnimation';
import CloudAnimation from './CloudAnimation';
import ClearAnimation from './ClearAnimation';
import ThunderstormAnimation from './ThunderstormAnimation';
import HazeMistAnimation from './HazeMistAnimation';
import SnowAnimation from './SnowAnimation';
import NightAnimation from './NightAnimation';

export default function WeatherComponent({
  temprature,
  city,
  sunrise,
  sunset,
  humidity,
  icon,
  description
}) {
  let weatherIcons = null;
  let Animation = null;

  const currentTime = moment();
  const sunriseTime = moment.unix(sunrise);
  const sunsetTime = moment.unix(sunset);

  // Check if it's night time
  const isNight = currentTime.isAfter(sunsetTime) || currentTime.isBefore(sunriseTime);

  if (isNight) {
    Animation = <NightAnimation />;
  } else {
    switch (icon) {
      case 'Haze':
        weatherIcons = <FontAwesomeIcon icon={faSmog} size="lg" color="#212121" />;
        Animation = <HazeMistAnimation />;
        break;
      case 'Thunderstorm':
        weatherIcons = <FontAwesomeIcon icon={faBolt} size="lg" color="#212121" />;
        Animation = <ThunderstormAnimation />;
        break;
      case 'Drizzle':
      case 'Rain':
        weatherIcons = <FontAwesomeIcon icon={faCloudRain} size="lg" color="#212121" />;
        Animation = <RainAnimation />;
        break;
      case 'Snow':
        weatherIcons = <FontAwesomeIcon icon={faSnowman} size="lg" color="#212121" />;
        Animation = <SnowAnimation />;
        break;
      case 'Mist':
        weatherIcons = <FontAwesomeIcon icon={faSmog} size="lg" color="#212121" />;
        Animation = <HazeMistAnimation />;
        break;
      case 'Clear':
        weatherIcons = <FontAwesomeIcon icon={faSun} size="lg" color="#212121" />;
        Animation = <ClearAnimation />;
        break;
      case 'Clouds':
        weatherIcons = <FontAwesomeIcon icon={faCloud} size="lg" color="#212121" />;
        Animation = <CloudAnimation className="cloud-animation" coordinates={{ x: 230, y: 200 }} />;
        break;
      default:
        weatherIcons = null;
        Animation = null;
    }
  }

  return (
    <div className="weather-card-container" style={{ position: 'relative', overflow: 'hidden', width: '100vw', height: '100vh' }}>
      {Animation}
      <Card className="weather-card" style={{ position: 'relative', zIndex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <Card.Content>
          <Card.Header className="weather-card-child">{city}</Card.Header>
          <div className="icon-container">
            {weatherIcons}
          </div>
        </Card.Content>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Content>
                <div className='flex justify-between'>
                  <h5 className="weather-card-child">
                    {moment().format('MMMM Do, h:mm a')}
                  </h5>
                  <div className="weather-card-child">
                    <em>{description}</em>
                  </div>
                </div>
                <div className="weather-card">
                  <div className="weather-card-child">
                    <b>Temperature</b>: {Math.floor(temprature)} ℃
                  </div>
                  <div className="weather-card-child">
                    <b>Humidity</b>: {humidity} %
                  </div>
                </div>

                <div className="weather-card">
                  <div className="weather-card-child">
                    <b>Sunrise</b>: {sunriseTime.format('h:mm A')}
                  </div>
                  <div className="weather-card-child">
                    <b>Sunset</b>: {sunsetTime.format('h:mm A')}
                  </div>
                </div>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    </div>
  );
}
