import { useEffect, useState } from 'react';
import { DeviceCard } from './DeviceCard';
import { apiService } from '../../services/api';
import type { Device } from '../../types';

export function DevicesGrid() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
      const data = await apiService.getDevices();
      setDevices(data);
    } catch (error) {
      console.error('Failed to load devices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (deviceId: string) => {
    try {
      const updatedDevice = await apiService.toggleDevice(deviceId);
      setDevices(devices.map(d => d.id === deviceId ? updatedDevice : d));
    } catch (error) {
      console.error('Failed to toggle device:', error);
    }
  };

  const handleUpdate = async (deviceId: string, updates: Partial<Device>) => {
    try {
      const updatedDevice = await apiService.updateDevice(deviceId, updates);
      setDevices(devices.map(d => d.id === deviceId ? updatedDevice : d));
    } catch (error) {
      console.error('Failed to update device:', error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {devices.map(device => (
        <DeviceCard
          key={device.id}
          device={device}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
