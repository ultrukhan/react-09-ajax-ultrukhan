import PropTypes from 'prop-types';
import './Header.css';

const ITEMS = [
  { key: 'people', label: 'People' },
  { key: 'planets', label: 'Planets' },
  { key: 'starships', label: 'Starships' },
];

function Header({ active, onSelect }) {
  return (
    <header className="header">
      <h1 className="header__logo">Star Wars DB</h1>
      <nav className="header__nav">
        {ITEMS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`header__item${active === key ? ' header__item--active' : ''}`}
            onClick={() => onSelect(key)}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

Header.propTypes = {
  active: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Header;
