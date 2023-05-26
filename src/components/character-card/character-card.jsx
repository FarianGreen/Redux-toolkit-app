import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./character-card.css";
import { useDispatch, useSelector } from "react-redux";
import { takeCharacter } from "../../sliceRedux/sliceHaveData";
import withRMservice from "../hoc/with-RMservice";

const CharacterDetails = ({ RMservice }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const charId = useSelector((state) => state.episodes.charId);
  const character = useSelector((state) => state.characters.character);

  useEffect(() => {
    updateCharacter();
  }, [charId || id]);

  async function updateCharacter() {
    const response = await RMservice.getCharacter(id).then((results) =>
      dispatch(takeCharacter(results))
    );
    return response;
  }

  if (character.length == 0) {
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

export default withRMservice()(CharacterDetails);
