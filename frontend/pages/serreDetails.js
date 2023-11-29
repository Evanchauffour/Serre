import VegetableItem from "@/components/VegetableItem"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import MicroModal from 'micromodal';  // es6 module
import carrot from '@/assets/img/carrot.svg';
import radish from '@/assets/img/radish.svg';
import onion from '@/assets/img/onion.svg';
import chive from '@/assets/img/chive.svg';
import close from '@/assets/img/close.svg';
import parsley from '@/assets/img/parsley.svg';
import fish from '@/assets/img/fish.svg';
import watering from '@/assets/img/watering.svg';
import openPannel from '@/assets/img/opendoor.svg';

const data = [
  {
    "name": "Carotte",
    "image": carrot,
    "color": "rgb(251, 126, 81)"
  },
  {
    "name": "Radis",
    "image": radish,
    "color": "rgb(174, 101, 174)"
  },
  {
    "name": "Oignon",
    "image": onion,
    "color": "#e1a151"
  },
  {
    "name": "Ciboulette",
    "image": chive,
    "color": "rgb(121, 181, 116)"
  },
  {
    "name": "Persil",
    "image": parsley,
    "color": "rgb(173, 123, 90)"
  },
  {
    "name": "Poisson",
    "image": fish,
    "color": "rgb(90, 130, 173)"
  },
]

export default function serreDetails() {

  const [modeManuel, setModeManuel] = useState(false);

  const titleModal = useRef(null);
  const changeMode = useRef(null);

  useEffect(() => {
    MicroModal.init();
  }, []);

  const openGlobalModal = (e) => {
    MicroModal.show('modal-2');
  }

  const openItemModal = (e) => {
    titleModal.current.innerHTML = data[e.target.id].name;
    MicroModal.show('modal-1');
  }

  const handleChangeMode = (e) => {
    setModeManuel(!modeManuel);
  }

  return (
  <>
  <div className="containerSerreDetails">
    <div className="header">
      <h1>L'aquarium</h1>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={openGlobalModal}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <div className="serre">
    {data.map((vegetable, index) => (
      <VegetableItem
        key={vegetable.name} // Assurez-vous d'ajouter une clé unique si data est un tableau d'objets
        name={vegetable.name}
        image={vegetable.image}
        color={vegetable.color}
        functionOpenModal={openItemModal}
        id={index}
      />
    ))}
    </div>
  </div>
<div className="modal micromodal-slide" id="modal-1" aria-hidden="true">
  <div className="modal__overlay" data-micromodal-close>
    <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
      <header className="modal__header">
        <h2 className="modal__title" id="modal-1-title" ref={titleModal}></h2>
        <button className="modal__close" aria-label="Close modal" data-micromodal-close><Image src={close} alt="buttonCloseModal"/></button>
      </header>
    </div>
  </div>
</div>

<div className="modal micromodal-slide" id="modal-2" aria-hidden="true">
  <div className="modal__overlay" data-micromodal-close>
    <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
      <header className="modal__header">
        <h2 className="modal__title" id="modal-1-title">Global</h2>
        <button className="modal__close" aria-label="Close modal" data-micromodal-close><Image src={close} alt="buttonCloseModal"/></button>
      </header>
      <div className="changeMode">
          <h2>Mode manuel</h2>
          <label className="switch">
            <input type="checkbox" name="changeMode" id="changeMode" ref={changeMode} onClick={handleChangeMode}/>
            <span className="slider round"></span>
          </label>
      </div>
      <div className="infos">
        <h2>Informations:</h2>
          <div className="infos__item">
            <h3>Température</h3>
            <p className="infos__item__value">20°C</p>
          </div>
          <div className="infos__item">
            <h3>Humidité</h3>
            <p className="infos__item__value">50%</p>
          </div>
          <div className="infos__item">
            <h3>vitesse du vent</h3>
            <p className="infos__item__value">120km/h</p>
          </div>
      </div>    
      <div className={modeManuel ? 'settings clickable' : 'settings'}>
      <h2>Paramètres:</h2>
        <div className="settings__item">
          <label className="switch">
            <input type="checkbox"  name="openPannel" id="openPannel"/>
            <span className="slider round"></span>
          </label>
          <div>
            <Image src={openPannel} alt="Ouverture de la serre img" width={30} height={30}/>
            <h3>Ouverture de la serre</h3>
          </div>
        </div>
        <div className="settings__item">
          <label className="switch">
            <input type="checkbox"  name="watering" id="watering"/>
            <span className="slider round"></span>
          </label>
          <div>
            <Image src={watering} alt="watering img" width={30} height={30}/>
            <h3>Activer l'arrosage</h3>
          </div>
        </div>
      </div>  
    </div>
  </div>
</div>
</>
  )
}
