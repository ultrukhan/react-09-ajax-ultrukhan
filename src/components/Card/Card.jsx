import { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const IMAGE_BASE = 'https://react-10-ajax.github.io/star-wars-visualguide/img';

const IMAGE_FOLDERS = {
  people: 'characters',
  planets: 'planets',
  starships: 'starships',
};

const CAPTIONS = {
  gender: 'Gender',
  birth_year: 'Birth Year',
  eye_color: 'Eye color',
  height: 'Height',
  mass: 'Mass',
  hair_color: 'Hair color',
  population: 'Population',
  orbital_period: 'Orbital period',
  diameter: 'Diameter',
  climate: 'Climate',
  terrain: 'Terrain',
  gravity: 'Gravity',
  model: 'Model',
  manufacturer: 'Manufacturer',
  cost_in_credits: 'Cost in credits',
  length: 'Length',
  crew: 'Crew',
  starship_class: 'Class',
};

const NOT_AVAILABLE = 'not available';

function Card({ entity, id, data }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const src = `${IMAGE_BASE}/${IMAGE_FOLDERS[entity]}/${id}.jpg`;
  const name = data ? data.name : '...';
  const fields = data
    ? Object.entries(data).filter(([key]) => key !== 'name' && CAPTIONS[key])
    : [];

  return (
    <article className="card">
      <div className="card__image-wrap">
        <img
          className={`card__image${failedSrc === src ? ' card__image--broken' : ''}`}
          src={src}
          alt="illustration"
          onError={() => setFailedSrc(src)}
        />
      </div>
      <div className="card__body">
        <h3 className="card__title">{name}</h3>
        {data && data.name !== NOT_AVAILABLE && (
          <ul className="card__list">
            {fields.map(([key, value]) => (
              <li key={key} className="card__item">
                <span className="card__caption">{CAPTIONS[key]}</span>
                <span className="card__value">{value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

Card.propTypes = {
  entity: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default Card;
