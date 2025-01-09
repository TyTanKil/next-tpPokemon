import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';

interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
  };
  evolutions: Array<{
    id: number;
    name: string;
  }>;
}

interface PokemonPageProps {
  pokemon: PokemonDetails;
}

const PokemonPage = ({ pokemon }: PokemonPageProps) => {
  const [pokemonData, setPokemonData] = useState<PokemonDetails | null>(pokemon);
  return (
    <div>
      <button onClick={() => window.history.back()}>Retour</button>

      {pokemonData ? (
        <div>
          <h1>{pokemonData.name}</h1>
          <img src={pokemonData.image} alt={pokemonData.name} />
          
          <h2>Statistiques :</h2>
          <ul>
            <li>PV: {pokemonData.stats.hp}</li>
            <li>Attaque: {pokemonData.stats.attack}</li>
            <li>Defence: {pokemonData.stats.defense}</li>
            <li>Vitesse: {pokemonData.stats.speed}</li>
            <li>Attaque Special: {pokemonData.stats.specialAttack}</li>
            <li>Defence Special: {pokemonData.stats.specialDefense}</li>
          </ul>

          <h2>Évolutions :</h2>
          <ul>
            {pokemonData.evolutions.map((evolution) => (
              <li key={evolution.id}>
                {evolution.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pokedexId } = context.params!;

  const res = await fetch(`https://nestjs-pokedex-api.vercel.app/pokemons/${pokedexId}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  const pokemon = {
    id: data.id,
    name: data.name,
    image: data.image,
    stats: data.stats,
    evolutions: data.evolutions || [],
  };

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonPage;
