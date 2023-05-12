import React, { useContext, useEffect, useState } from ‘react’;
import { Link } from ‘react-router-dom’;
import { Card, Container, Row, Col } from ‘react-bootstrap’;
import { FavoritesContext } from ‘../FavoritesProvider’;
function PokemonCard({ url, name }) {
  const [pokemon, setPokemon] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemonData();
  }, [url]);
  const handleAddFavorite = () => {
    addFavorite(name);
  };
  const handleRemoveFavorite = () => {
    removeFavorite(name);
  };
  if (!pokemon) {
    return <p>Fetching Pokemon...</p>;
  }
  const { sprites, abilities } = pokemon;
  return (
    <Card className=“border” style={{ width: ‘18rem’, display: ‘flex’, flexDirection: ‘column’ }}>
      {sprites && (
        <Card.Img variant=“top” src={sprites.front_default} style={{ width: ‘15em’, height: ‘15em’ }} alt={name} />
      )}
      <Card.Body className=“d-flex flex-column justify-content-between”>
        <div>
          <Card.Title style={{ textDecoration: ‘underline’, color: ‘blue’, fontSize: ‘24px’, marginTop: ‘10px’, marginBottom: ‘10px’ }}>
            <Link to={`/${name}`} style={{ textDecoration: ‘none’, fontWeight: ‘normal’ }}>
              {name.toLowerCase()}
            </Link>
          </Card.Title>
          <Row>
            <Col sm={12}>
              <Card.Text>
                <strong>Abilities:</strong>
                <ul>
                  {abilities.map((ability) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                  ))}
                </ul>
              </Card.Text>
            </Col>
          </Row>
        </div>
        {!favorites.includes(name) ? (
          <button className=“btn btn-success” onClick={handleAddFavorite}>
            Add to Favorites
          </button>
        ) : (
          <button className=“btn btn-danger” onClick={handleRemoveFavorite}>
            Remove from Favorites
          </button>
        )}
      </Card.Body>
    </Card>
  );
}
function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  return (
    <Container>
      <Row className=“justify-content-center mt-4 favorites-row”>
        {favorites.map((favorite) => (
          <Col md={3} className=“my-3” key={favorite}>
            <div className=“card-spacing”>
              <PokemonCard url={`https://pokeapi.co/api/v2/pokemon/${favorite}`} name={favorite} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export { Favorites };