import { useEffect, useState } from 'react';
import { StatCard } from '../ui/Card';
import { apiService } from '../../services/api';
import type { DashboardStats } from '../../types';
import { Zap, Power, Activity } from 'lucide-react';

export function DashboardStatsSection() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const data = await apiService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-gray-100 rounded-xl h-36 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Devices"
        value={stats.totalDevices}
        subtitle={`${stats.activeDevices} active`}
        icon={<Power size={24} />}
      />

      <StatCard
        title="Active Devices"
        value={stats.activeDevices}
        subtitle={`${Math.round(
          (stats.activeDevices / stats.totalDevices) * 100
        )}% of total`}
        icon={<Activity size={24} />}
      />

      <StatCard
        title="Energy Usage"
        value={`${stats.totalEnergy.toFixed(2)} kW`}
        subtitle="Current consumption"
        icon={<Zap size={24} />}
      />
    </div>
  );
}
