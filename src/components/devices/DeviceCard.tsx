import { Lightbulb, Wind, Plug, AirVent } from 'lucide-react';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import type { Device } from '../../types';

interface DeviceCardProps {
  device: Device;
  onToggle: (deviceId: string) => void;
  onUpdate: (deviceId: string, updates: Partial<Device>) => void;
}

export function DeviceCard({ device, onToggle, onUpdate }: DeviceCardProps) {
  const getIcon = () => {
    switch (device.type) {
      case 'light':
        return <Lightbulb size={24} />;
      case 'ac':
        return <AirVent size={24} />;
      case 'fan':
        return <Wind size={24} />;
      case 'plug':
        return <Plug size={24} />;
    }
  };

  const getColor = () => {
    if (device.status === 'off') return 'text-gray-400';
    switch (device.type) {
      case 'light':
        return 'text-yellow-500';
      case 'ac':
        return 'text-blue-500';
      case 'fan':
        return 'text-cyan-500';
      case 'plug':
        return 'text-green-500';
    }
  };

  return (
    <Card className="hover:border-blue-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${device.status === 'on' ? 'bg-blue-50' : 'bg-gray-50'}`}>
          <div className={getColor()}>
            {getIcon()}
          </div>
        </div>
        <Toggle
          enabled={device.status === 'on'}
          onChange={() => onToggle(device.id)}
        />
      </div>

      <h3 className="font-semibold text-gray-900 text-lg mb-1">{device.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{device.location}</p>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Power Usage</span>
        <span className="font-semibold text-gray-900">{device.powerUsage}W</span>
      </div>

      {device.type === 'light' && device.brightness !== undefined && device.status === 'on' && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Brightness</span>
            <span className="font-semibold text-gray-900">{device.brightness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={device.brightness}
            onChange={(e) => onUpdate(device.id, { brightness: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      )}

      {device.type === 'ac' && device.temperature !== undefined && device.status === 'on' && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Temperature</span>
            <span className="font-semibold text-gray-900">{device.temperature}°C</span>
          </div>
          <input
            type="range"
            min="16"
            max="30"
            value={device.temperature}
            onChange={(e) => onUpdate(device.id, { temperature: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      )}

      {device.type === 'fan' && device.speed !== undefined && device.status === 'on' && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Speed</span>
            <span className="font-semibold text-gray-900">Level {device.speed}</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={device.speed}
            onChange={(e) => onUpdate(device.id, { speed: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      )}
    </Card>
  );
}
