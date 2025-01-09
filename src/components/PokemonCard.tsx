import Link from 'next/link';

interface PokemonType {
  id: number;
  name: string;
  image: string;
}

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, types }) => {
  return (
    <Link href={`/pokemon/${id}`} className="card bg-white shadow-md rounded-lg p-4 m-2 w-60 border border-gray-300">
      <img src={image} alt={name} className="w-full h-24 object-contain mb-4"/>
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-700">#{id}</p>
      <div className="types flex flex-wrap gap-2 mt-2">
        {types.map((type) => (
          <div key={type.id} className="type flex items-center gap-1">
            <img src={type.image} alt={type.name} title={type.name} className="w-6 h-6"/>
          </div>
        ))}
      </div>
    </Link>
  );
};

export default PokemonCard;
