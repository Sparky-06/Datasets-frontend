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
      setDevices(devices.map(d => (d.id === deviceId ? updatedDevice : d)));
    } catch (error) {
      console.error('Failed to toggle device:', error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  // ✅ WORKING FILTER (matches your API + DeviceCard)
  const filteredDevices = devices.filter(device =>
    // Living Room: Light + AC
    (device.location === 'Living Room' &&
      (device.type === 'light' || device.type === 'ac')) ||

    // Bedroom: Fan only
    (device.location === 'Bedroom' && device.type === 'fan')
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredDevices.map(device => (
        <DeviceCard
          key={device.id}
          device={device}
          onToggle={handleToggle}
          onUpdate={() => {}}
        />
      ))}
    </div>
  );
}
