import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

import style from './home.module.scss';

export function Home() {
  const navigate = useNavigate();

  function redirectToList() {
    navigate('/lista');
  }

  return (
    <div className={style.home}>
      <i><FontAwesomeIcon icon={faCheck} /></i>
      <h2>TASKS</h2>
      <div className={style.home__subtitle}>
        <h3>TO-DO</h3>
        <p>Daily</p>
      </div>
      <p></p>
      <Button children=" Iniciar Lista" onClick={redirectToList}/>
    </div>
  );
}