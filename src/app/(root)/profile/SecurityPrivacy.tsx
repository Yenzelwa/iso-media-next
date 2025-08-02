import React, { useState } from 'react';
import { Shield, Calendar, Bell, User, Settings, Eye, History } from 'lucide-react';

export const SecurityPrivacy: React.FC = () => {
  const [settings, setSettings] = useState({
    twoFactorEnabled: false,
    emailNotifications: true,
    autoLogout: "30",
    loginAlerts: true,
    dataCollection: false
  });

  const [devices, setDevices] = useState([
    {
      id: 1,
      device: "MacBook Pro",
      browser: "Chrome",
      location: "Los Angeles, CA",
      lastActive: "Active now",
      current: true,
      ip: "192.168.1.100"
    },
    {
      id: 2,
      device: "iPhone 14 Pro",
      browser: "Safari",
      location: "Los Angeles, CA",
      lastActive: "2 hours ago",
      current: false,
      ip: "192.168.1.101"
    },
    {
      id: 3,
      device: "Samsung TV",
      browser: "Smart TV App",
      location: "Los Angeles, CA",
      lastActive: "1 day ago",
      current: false,
      ip: "192.168.1.102"
    },
    {
      id: 4,
      device: "Windows PC",
      browser: "Edge",
      location: "New York, NY",
      lastActive: "3 days ago",
      current: false,
      ip: "203.45.67.89"
    }
  ]);

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: typeof prev[setting] === 'boolean' ? !prev[setting] : prev[setting]
    }));
  };

  const handleAutoLogoutChange = (value: string) => {
    setSettings(prev => ({ ...prev, autoLogout: value }));
  };

  const logoutDevice = (deviceId: number) => {
    const deviceToLogout = devices.find(d => d.id === deviceId);
    if (deviceToLogout && !deviceToLogout.current) {
      setDevices(prevDevices => prevDevices.filter(d => d.id !== deviceId));
      alert(`Successfully logged out ${deviceToLogout.device}`);
    }
  };

  const logoutAllDevices = () => {
    const nonCurrentDevices = devices.filter(d => !d.current);
    if (nonCurrentDevices.length > 0) {
      if (confirm(`Are you sure you want to log out all ${nonCurrentDevices.length} other devices?`)) {
        setDevices(prevDevices => prevDevices.filter(d => d.current));
        alert(`Successfully logged out ${nonCurrentDevices.length} devices`);
      }
    } else {
      alert('No other devices to log out');
    }
  };

  return (
    <div className="space-y-8">
      {/* Security Settings */}
      <div className="relative">
        <div className="absolute -left-8 top-0 w-1 h-20 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
        <h2 className="text-3xl font-bold text-white mb-2">Security Settings</h2>
        <p className="text-gray-400 text-sm mb-6">Manage your account security and authentication</p>

        <div className="space-y-4">
          {/* Two-Factor Authentication */}
          <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-white font-bold text-lg">Two-Factor Authentication</span>
                  <p className="text-gray-400 text-sm">Add extra security layer to your account</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('twoFactorEnabled')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.twoFactorEnabled ? 'bg-red-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Auto Logout */}
          <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-white font-bold text-lg">Auto Logout</span>
                  <p className="text-gray-400 text-sm">Automatically log out after inactivity</p>
                </div>
              </div>
              <select
                value={settings.autoLogout}
                onChange={(e) => handleAutoLogoutChange(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="480">8 hours</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>

          {/* Login Alerts */}
          <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-white font-bold text-lg">Login Alerts</span>
                  <p className="text-gray-400 text-sm">Get notified of new device logins</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('loginAlerts')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.loginAlerts ? 'bg-red-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Devices */}
      <div className="relative">
        <div className="absolute -left-8 top-0 w-1 h-20 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
        <h2 className="text-3xl font-bold text-white mb-2">Active Devices</h2>
        <p className="text-gray-400 text-sm mb-6">Manage devices that have access to your account</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400 text-sm">
              {devices.length} active sessions found
            </div>
            <button
              onClick={logoutAllDevices}
              className="bg-red-600/20 text-red-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-600/30 transition-colors border border-red-500/30 flex items-center space-x-2"
            >
              <History className="w-4 h-4" />
              <span>Logout All Other Devices</span>
            </button>
          </div>

          {devices.map((device) => (
            <div
              key={device.id}
              className={`bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
                device.current 
                  ? 'border-red-500/40 bg-red-600/5' 
                  : 'border-gray-700/30 hover:border-red-500/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    device.current 
                      ? 'bg-gradient-to-br from-red-600 to-red-800' 
                      : 'bg-gradient-to-br from-gray-600 to-gray-800'
                  }`}>
                    {device.device.includes('iPhone') || device.device.includes('Samsung') ? (
                      <User className="w-6 h-6 text-white" />
                    ) : device.device.includes('TV') ? (
                      <Eye className="w-6 h-6 text-white" />
                    ) : (
                      <Settings className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-lg">{device.device}</span>
                      {device.current && (
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Current Device
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{device.browser} • {device.location}</p>
                    <p className="text-gray-500 text-xs">IP: {device.ip} • {device.lastActive}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      device.current ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {device.lastActive}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className={`w-2 h-2 rounded-full ${
                        device.current ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-xs text-gray-500">
                        {device.current ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  {!device.current && (
                    <button
                      onClick={() => logoutDevice(device.id)}
                      className="bg-red-600/20 text-red-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-600/30 transition-colors border border-red-500/30"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="relative">
        <div className="absolute -left-8 top-0 w-1 h-20 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
        <h2 className="text-3xl font-bold text-white mb-2">Privacy Settings</h2>
        <p className="text-gray-400 text-sm mb-6">Control your data and privacy preferences</p>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-white font-bold text-lg">Data Collection</span>
                  <p className="text-gray-400 text-sm">Allow collection of viewing analytics</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('dataCollection')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.dataCollection ? 'bg-red-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.dataCollection ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center">
                  <History className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-white font-bold text-lg">Download Account Data</span>
                  <p className="text-gray-400 text-sm">Export your account information and data</p>
                </div>
              </div>
              <button className="bg-red-600/20 text-red-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-600/30 transition-colors border border-red-500/30">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
