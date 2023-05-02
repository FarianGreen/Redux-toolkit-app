import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./character-card.css";

const CharacterDetails = (props) => {
  const { id } = useParams();

  const [character, setCharacter] = useState();

  useEffect(() => {
    upadateCharacter();
  }, [props.charId || id]);

  function upadateCharacter() {
    const { charId, data } = props;

    if (!charId && !id) {
      return <div>no Id</div>;
    }

    data(charId || id).then((character) => {
      setCharacter(character);
    });
  }

  if (!character) {
    return <div>no character</div>;
  }

  const { image, name, type, location, gender, status } = character;
  const color = status.includes("Alive")
    ? "card-tag green"
    : status.includes("Dead")
    ? " card-tag red"
    : "card-tag gray";

  const sex = gender.includes("Male")
    ? " card-tag male"
    : gender.includes("Female")
    ? "card-tag female"
    : "card-tag unknown";
  return (
    <div className="wrapper__card">
      <div className="card">
        <div className="card__content">
          <div className="div-with-img">
            <img src={image} className="" alt="#" />
          </div>

          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <strong className="card-text">last seen:</strong>
            <br />
            <span className="card-text">{location}</span>
          </div>
          <ul className="m-list">
            <li className="m-list__item">
              <strong>Status: </strong>
              <span className={color}>{status}</span>
            </li>
            <li className="m-list__item">
              <strong>Gender: </strong>
              <span className={sex}>{gender}</span>
            </li>
            <li className="m-list__item">{type}</li>
          </ul>
          <div className="card-body">
            <a href="#" class="card-link">
              Card link
            </a>
            <a className="#" class="card-link">
              <Link
                className="link-episode"
                to={`/episode_with_character/${id}`}
              >
                <span>Episodes with character</span>
                <span className="material-symbols-outlined my-menu">
                  menu_open
                </span>
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
