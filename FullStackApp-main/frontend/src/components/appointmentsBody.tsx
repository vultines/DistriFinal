import React from 'react';

interface BodyCardProps {
  title: string;
  description: string;
  stablishment: string;
}

const BodyCard: React.FC<BodyCardProps> = ({ title, description, stablishment }) => {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>

        <div className="flex justify-end mt-4">
            <p className="text-gray-600">{stablishment}</p>
        
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Verificar
            </button>
        </div>
        
      </div>
    );
  };
  
export default BodyCard;

