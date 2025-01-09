import PokemonList from '../components/PokemonList';
import '../index.css';

export default function Home() {
  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokédex</h1>
      <PokemonList />
    </div>
  );
}