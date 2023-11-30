import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import serre from '@/assets/img/aquarium.png';
import Widget from "@/components/widget";
import thermometer from '@/assets/img/thermometer.svg';
import wind from '@/assets/img/raindrop.svg';
import raindrop from '@/assets/img/wind.svg';
import watering from '@/assets/img/watering.svg';
import opendoor from '@/assets/img/opendoor.svg';
import humidity from '@/assets/img/humidity.svg';
import { socket } from '../socket';
import ButtonToogle from "@/components/buttonToogle";
import Loader from "@/components/loader";


export default function Home() {

  const changeMode = useRef(null);
  const [modeManuel, setModeManuel] = useState(false);
  const [temperature, setTemperature] = useState(''); 

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (isConnected === true) {
      socket.emit('temperature');
      socket.on('temperature', (newTemperature) => {
        setTemperature(newTemperature);
      });
    } 
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Vous êtes déconnecté');
    });
  }, [isConnected, socket])

  const handleChangeMode = (e) => {
    setModeManuel(!modeManuel);
  }


  // console.log(temperature); 

  return (
    <div className="containerHome">
      <h1>L'aquarium</h1>
      <div className="content">
        <div className="left">
          <div className="containerInformations">
            <h2>Informations globales</h2>
            <div className="ContainerWidgetInformations">
              <Widget name="Température" image={thermometer}>
              <p>{temperature !== '' ? `${temperature}°C` : <Loader />}
              </p>
              </Widget>
              <Widget name="Vitesse du vent" image={raindrop}>
              <p>{temperature !== '' ? `${temperature}°C` : <Loader />}</p>
              </Widget>
              <Widget name="Humidité" image={wind}>
              <p>{temperature !== '' ? `${temperature}°C` : <Loader />}</p>
              </Widget>
              <Widget name="réservoir d'eau" image={humidity}>
              <p>{temperature !== '' ? `${temperature}°C` : <Loader />}</p>
              </Widget>
            </div>
          </div>
          {modeManuel && (
          <div className="serreGlobalAction">
            <h2>Actions globales</h2>
            <div className="ContainerWidgetActions">
              <Widget name="Ouverture" image={opendoor}>
                <ButtonToogle/>
              </Widget>
              <Widget name="Arrosage" image={watering}>
                <ButtonToogle/>
              </Widget>
            </div>
          </div>
          )}
        </div>
        <div className="right">
          <Link href="/serreDetails">
              <Image src={serre} alt="serre" className="illuSerre"/>
          </Link>
          <div className="changeMode">
            <label className="switch">
              <input type="checkbox" name="changeMode" id="changeMode" ref={changeMode} onClick={handleChangeMode}/>
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
