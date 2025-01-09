import React from 'react';

interface TypeSelectProps {
  types: { id: number; name: string; image: string }[];
  value: string;
  onChange: (value: string) => void;
}

const TypeSelect: React.FC<TypeSelectProps> = ({ types, value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        {types.find((type) => type.id === Number(value)) && (
          <img
            src={types.find((type) => type.id === Number(value))?.image}
            alt={types.find((type) => type.id === Number(value))?.name}
            className="w-6 h-6"
          />
        )}
      </div>
    </div>
  );
};

export default TypeSelect;