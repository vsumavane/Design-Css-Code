import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteLayer, selectLayer, toggleVisibility, toggleLock } from '../redux/layersSlice';
import { FaEye, FaEyeSlash, FaLock, FaUnlock, FaTrash } from 'react-icons/fa';

const LayersPanel = () => {
  const dispatch = useDispatch();
  const { layers, selectedLayer } = useSelector((state) => state.layers);
  const [apiKey, setApiKey] = useState('jhb'); // Replace with actual API key logic
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  // Handle layer selection
  const handleSelectLayer = (layerId) => {
    dispatch(selectLayer(layerId));
  };

  // Handle AI prompt submission
  const handlePromptSubmit = async () => {
    if (!apiKey) return;
    try {
      // Replace with actual API call logic
      const aiResponse = `Response for: ${prompt}`;
      setResponse(aiResponse);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
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
                  !layer.locked ? dispatch(deleteLayer(layer.id)) : null;
                }}
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Prompt and Response Section */}
      {apiKey && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h3 className="text-md font-bold mb-2">AI Assistant</h3>
          <textarea
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white py-1 rounded"
            onClick={handlePromptSubmit}
          >
            Submit
          </button>
          {response && (
            <div className="mt-2 p-2 bg-gray-100 rounded">
              <strong>Response:</strong>
              <p>{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LayersPanel;
