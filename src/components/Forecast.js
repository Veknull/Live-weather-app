import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faCloud, faCloudRain, faSmog, faSnowman, faSun } from '@fortawesome/free-solid-svg-icons';

let weatherIcons = null;
export default function Forecast({ forcast }) {
    console.log(Object.entries(forcast)[0])
    if (forcast && Object.entries(forcast)[0]){
        const previsionList = Object.entries(forcast)[0][1]["list"].filter(previsionList => previsionList.dt_txt.match(/09:00:00/))
    return (
        <div style={{ marginTop: 20 }}>
            <div className="forecast-main-header">
                5 Day Forecast
            </div>

            <Card.Group itemsPerRow={5}>
                {previsionList.map((data) => {
                      if (data.weather[0].main === 'Haze') {
                        weatherIcons = <FontAwesomeIcon icon={faSmog} size="lg" color="#212121" />
                      }
                      else if (data.weather[0].main  === 'Thunderstorm') {
                        weatherIcons = <FontAwesomeIcon icon={faBolt} size="lg" color="#212121" />
                      }
                      else if (data.weather[0].main  === 'Drizzle') {
                        weatherIcons = <FontAwesomeIcon icon={faCloudRain} size="lg" color="#212121" />
                      }
                      else if (data.weather[0].main  === 'Rain') {
                        weatherIcons = <FontAwesomeIcon icon={faCloudRain} size="lg" color="#212121" />
                      }
                      else if (data.weather[0].main  === 'Snow') {
                        weatherIcons = <FontAwesomeIcon icon={faSnowman} size="lg" color="#212121" />
                      }
                      else if (data.weather[0].main  === 'Mist') {
                        weatherIcons = <FontAwesomeIcon icon={faSmog} size="lg" color="#212121" />
                      }
                      else if (data.weather[0].main  === 'Clear') {
                        weatherIcons = <FontAwesomeIcon icon={faSun} size="lg" color="#212121" />
                      }
                      else if (data.weather[0].main  === 'Clouds') {
                        weatherIcons = <FontAwesomeIcon icon={faCloud} size="lg" color="#212121" />
                      }
                    return (
                        <Card className="forecast-card" style={{ position: 'relative', overflow: 'hidden' }}>
                            <Card.Content>
                                <Card.Header className="forecast-date">
                                    Date: {moment.unix(data.dt).format('LL')}
                                </Card.Header>
                                <div className="icon-container" >
                                  {weatherIcons}
                                </div>
                                <Card.Header className="forecast-header">
                                    Temprature: {Math.round((data.main.temp_max + data.main.temp_min) / 2)} ℃
                                </Card.Header>
                                <Card.Meta className="forecast-header">
                                    Humidity: {data.main.humidity} %
                                </Card.Meta>
                                <Card.Description className="temp-desc">
                                    Description: {data.weather[0].description}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        </div>
    )
}
}