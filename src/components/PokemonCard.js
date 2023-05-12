import React, { useContext, useEffect, useState } from ‘react’;
import { FavoritesContext } from ‘../FavoritesProvider’;
import { Link } from ‘react-router-dom’;
import { Card, Button, Container, Row, Col } from ‘react-bootstrap’;
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
    <Card className=“border card-spacing” style={{ width: ‘18rem’, display: ‘flex’, flexDirection: ‘column’ }}>
      {sprites && (
        <Card.Img variant=“top” src={sprites.front_default} style={{ width: ‘15em’, height: ‘15em’ }} alt={name} />
      )}
      <Card.Body className=“d-flex flex-column justify-content-between”>
        <div>
          <Card.Title style={{ textDecoration: ‘none’, fontWeight: ‘bold’, fontSize: ‘24px’, marginTop: ‘10px’, marginBottom: ‘10px’ }}>
            {name.toLowerCase()}
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

export { PokemonCard };