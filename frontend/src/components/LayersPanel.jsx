import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaTrash, FaPlus } from "react-icons/fa";

const LayersPanel = () => {
  const [layers, setLayers] = useState([
    { id: 1, name: "Layer 1", visible: true },
    { id: 2, name: "Layer 2", visible: true },
  ]);

  // Add New Layer
  const addLayer = () => {
    const newLayer = {
      id: layers.length + 1,
      name: `Layer ${layers.length + 1}`,
      visible: true,
    };
    setLayers([...layers, newLayer]);
  };

  // Delete Layer
  const deleteLayer = (id) => {
    setLayers(layers.filter((layer) => layer.id !== id));
  };

  // Toggle Layer Visibility
  const toggleVisibility = (id) => {
    setLayers(
      layers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  return (
    <div className="w-60 bg-gray-100 border-l border-gray-300 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Layers</h2>
        <button
          onClick={addLayer}
          className="text-green-600 hover:text-green-800"
        >
          <FaPlus />
        </button>
      </div>

      <div className="space-y-2">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className="flex items-center justify-between bg-white p-2 rounded shadow"
          >
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleVisibility(layer.id)}
                className="text-gray-600 hover:text-gray-800"
              >
                {layer.visible ? <FaEye /> : <FaEyeSlash />}
              </button>
              <span className="text-sm">{layer.name}</span>
            </div>

            <button
              onClick={() => deleteLayer(layer.id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayersPanel;