'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import PokemonCard from './PokemonCard';
import TypeSelect from './TypeSelect';

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [types, setTypes] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemons = async (reset = false) => {
    try {
      const response = await axios.get('https://nestjs-pokedex-api.vercel.app/pokemons', {
        params: {
          page,
          limit,
          name: nameFilter,
          types: typeFilter ? [typeFilter] : undefined,
        },
      });
      if (reset) {
        setPokemons(response.data);
      } else {
        setPokemons((prev) => [...prev, ...response.data]);
      }
      if (response.data.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await axios.get('https://nestjs-pokedex-api.vercel.app/types');
      setTypes(response.data);
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    fetchPokemons(true);
  }, [limit, nameFilter, typeFilter]);

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const handleScroll = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="filters flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <TypeSelect
          types={types}
          value={typeFilter}
          onChange={setTypeFilter}
        />
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border border-gray-300 p-2 rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <InfiniteScroll
        dataLength={pokemons.length}
        next={handleScroll}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="pokemon-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PokemonList;