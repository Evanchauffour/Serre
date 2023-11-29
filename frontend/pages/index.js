import { useRef, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import serre from '@/assets/img/aquarium.png';
import Widget from "@/components/widget";
import thermometer from '@/assets/img/thermometer.svg';

export default function Home() {

  const changeMode = useRef(null);
  const [modeManuel, setModeManuel] = useState(false);

  const handleChangeMode = (e) => {
    setModeManuel(!modeManuel);
    console.log(modeManuel);
  }

  return (
    <div className="containerHome">
      <h1>L'aquarium</h1>
      <div className="changeMode">
        <label className="switch">
          <input type="checkbox" name="changeMode" id="changeMode" ref={changeMode} onClick={handleChangeMode}/>
          <span className="slider round"></span>
        </label>
      </div>
      <div className="content">
        <div className="containerInformations">
          <Widget name="Température" image={thermometer}>
            <p>20°C</p>
          </Widget>
          <Widget name="Température" image={thermometer}>
            <p>20°C</p>
          </Widget>
          <Widget name="Température" image={thermometer}>
            <p>20°C</p>
          </Widget>
        </div>
        <Link href="/serreDetails">
            <Image src={serre} alt="serre" className="illuSerre"/>
        </Link>
        <div className="serreGlobalAction">
          <Widget name="Température" image={thermometer}>
            <p>20°C</p>
          </Widget>
          <Widget name="Température" image={thermometer}>
            <p>20°C</p>
          </Widget>
        </div>
      </div>
    </div>
  )
}
