import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import serre from '@/assets/img/aquarium.png';
import Widget from "@/components/widget";
import thermometer from '@/assets/img/thermometer.svg';
import windImg from '@/assets/img/wind.svg';
import opendoorImg from '@/assets/img/opendoor.svg';
import humidity from '@/assets/img/humidity.svg';
import raindrop from '@/assets/img/raindrop.svg';
import { socket } from '../socket';
import ButtonToogle from "@/components/buttonToogle";
import Loader from "@/components/loader";


export default function Home() {

  const [modeManuel, setModeManuel] = useState(false);
  const [data, setData] = useState(null); 
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [opendoor, setOpendoor] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isConnected === true) {
      socket.emit('data');
      socket.on('data', (data) => {
        setData(data);
      });
    } 
  
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Vous êtes déconnecté');
    });
    setIsMounted(true);
  }, [isConnected, socket])
  

  const handleChangeMode = () => {
    setModeManuel(!modeManuel);
  }

  const handleOpendoor = () => {
    setOpendoor(prevOpendoor => !prevOpendoor);
    socket.emit('publish', !opendoor);
  }  

  return (
    <>
    {isMounted && (
    <div className="containerHome">
      <h1>L'aquarium</h1>
      <div className="content">
        <div className="left">
          <div className="containerInformations">
            <h2>Informations globales</h2>
            <div className="ContainerWidgetInformations">
              <Widget name="Temperature" image={thermometer}>
              <div>
                {data ? `${data[0]}°C` : <Loader />}
              </div>
              </Widget>
              <Widget name="Vitesse du vent" image={windImg}>
              <div>{data ? `${data[2]} Km/h` : <Loader />}</div>
              </Widget>
              <Widget name="Humidite" image={humidity}>
              <div>{data ? `${data[1]} %` : <Loader />}</div>
              </Widget>
              <Widget name="reservoir d'eau" image={raindrop}>
              <div>{data ? `${data[6] === 1 ? 'Réservoir plein' : 'Réservoir vide'}` : <Loader />}</div>
              </Widget>
            </div>
          </div>
          {modeManuel && (
          <div className="serreGlobalAction">
            <h2>Actions globales</h2>
            <div className="ContainerWidgetActions">
              <Widget name="Ouverture" image={opendoorImg}>
                <ButtonToogle onChange={handleOpendoor}/>
              </Widget>
            </div>
          </div>
          )}
        </div>
        <div className="right">
          <Link href="/serreDetails">
              <div className="containerIlluSerre">
                <Image src={serre} alt="serre" className="illuSerre"/>
              </div>
          </Link>
          <div className="changeMode">
            <label className="switch">
              <input type="checkbox" name="changeMode" id="changeMode" onClick={handleChangeMode}/>
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  )
}
