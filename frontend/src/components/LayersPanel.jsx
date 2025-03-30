import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteLayer, selectLayer, toggleVisibility, toggleLock } from '../redux/layersSlice';
import { FaEye, FaEyeSlash, FaLock, FaUnlock, FaTrash } from 'react-icons/fa';

const LayersPanel = () => {
  const dispatch = useDispatch();
  const { layers, selectedLayer } = useSelector((state) => state.layers);

  // Handle layer selection
  const handleSelectLayer = (layerId) => {
    dispatch(selectLayer(layerId));
  };

  return (
    <div className="w-60 bg-gray-100 h-full p-4 border-r overflow-auto">
      <h2 className="text-lg font-bold mb-4">Layers</h2>
      <div className="space-y-2">
        {layers.length === 0 && <p className="text-gray-500">No layers added yet.</p>}
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`flex items-center justify-between p-2 rounded cursor-pointer ${
              selectedLayer === layer.id
                ? 'bg-blue-200 border border-blue-500'
                : 'bg-white hover:bg-gray-200'
            }`}
            onClick={() => handleSelectLayer(layer.id)}
          >
            {/* Layer Name */}
            <div className="flex items-center space-x-2">
              <span className="font-medium">{layer.type}</span>
            </div>

            {/* Actions: Visibility, Lock, Delete */}
            <div className="flex items-center space-x-2">
              {/* Visibility Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleVisibility(layer.id));
                }}
              >
                {layer.visible ? (
                  <FaEye className="text-gray-600" />
                ) : (
                  <FaEyeSlash className="text-gray-400" />
                )}
              </button>

              {/* Lock/Unlock Layer */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleLock(layer.id));
                }}
              >
                {layer.locked ? (
                  <FaLock className="text-red-500" />
                ) : (
                  <FaUnlock className="text-green-500" />
                )}
              </button>

              {/* Delete Layer */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteLayer(layer.id));
                }}
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayersPanel;
