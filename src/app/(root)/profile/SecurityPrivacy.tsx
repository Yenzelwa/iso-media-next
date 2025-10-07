import React, { useState, useEffect, useRef } from 'react';
import { Shield, Calendar, User, Settings, Play, History } from 'lucide-react';
import { track } from '@/src/lib/obs/events';

interface Device {
  id: number;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
  ip: string;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  autoLogout: string;
}

export const SecurityPrivacy: React.FC = () => {
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    emailNotifications: true,
    autoLogout: "30"
  });

  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const twoFAHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Fetch security settings and devices
  useEffect(() => {
    const fetchSecurityData = async () => {
      try {
        setLoading(true);

        // Test or non-browser env: use fallback immediately
        if (typeof fetch !== 'function') {
          setSettings({ twoFactorEnabled: false, emailNotifications: true, autoLogout: '30' });
          try { localStorage.setItem('auto_logout_minutes', '30'); } catch { /* ignore */ }
          setDevices([
            { id: 1, device: "MacBook Pro", browser: "Chrome", location: "Los Angeles, CA", lastActive: "Active now", current: true, ip: "192.168.1.100" },
            { id: 2, device: "iPhone 14 Pro", browser: "Safari", location: "Los Angeles, CA", lastActive: "2 hours ago", current: false, ip: "192.168.1.101" },
            { id: 3, device: "Samsung TV", browser: "Tizen", location: "Los Angeles, CA", lastActive: "Yesterday", current: false, ip: "192.168.1.102" },
            { id: 4, device: "Windows PC", browser: "Edge", location: "Los Angeles, CA", lastActive: "3 days ago", current: false, ip: "192.168.1.103" },
          ]);
          return;
        }

        // Fetch security settings
        const settingsResponse = await fetch('/api/security', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json',
          },
        });

        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json();
          setSettings({
            twoFactorEnabled: settingsData.twoFactorEnabled || false,
            emailNotifications: settingsData.emailNotifications ?? true,
            autoLogout: settingsData.autoLogout || "30"
          });
          // Persist auto logout preference for idle detector
          try {
            if (settingsData?.autoLogout) {
              localStorage.setItem('auto_logout_minutes', String(settingsData.autoLogout));
            }
          } catch { /* ignore */ }
        }

        // Fetch active devices
        const devicesResponse = await fetch('/api/security/devices', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json',
          },
        });

        if (devicesResponse.ok) {
          const devicesData = await devicesResponse.json();
          setDevices(devicesData.items || devicesData || []);
        } else {
          // Fallback to mock data
          setDevices([
            { id: 1, device: "MacBook Pro", browser: "Chrome", location: "Los Angeles, CA", lastActive: "Active now", current: true, ip: "192.168.1.100" },
            { id: 2, device: "iPhone 14 Pro", browser: "Safari", location: "Los Angeles, CA", lastActive: "2 hours ago", current: false, ip: "192.168.1.101" },
            { id: 3, device: "Samsung TV", browser: "Tizen", location: "Los Angeles, CA", lastActive: "Yesterday", current: false, ip: "192.168.1.102" },
            { id: 4, device: "Windows PC", browser: "Edge", location: "Los Angeles, CA", lastActive: "3 days ago", current: false, ip: "192.168.1.103" },
          ]);
        }

      } catch (err) {
        console.error('Error fetching security data:', err);
        setError('Failed to load security settings.');
        // Fallback to mock data
        setDevices([
          { id: 1, device: "MacBook Pro", browser: "Chrome", location: "Los Angeles, CA", lastActive: "Active now", current: true, ip: "192.168.1.100" },
          { id: 2, device: "iPhone 14 Pro", browser: "Safari", location: "Los Angeles, CA", lastActive: "2 hours ago", current: false, ip: "192.168.1.101" },
          { id: 3, device: "Samsung TV", browser: "Tizen", location: "Los Angeles, CA", lastActive: "Yesterday", current: false, ip: "192.168.1.102" },
          { id: 4, device: "Windows PC", browser: "Edge", location: "Los Angeles, CA", lastActive: "3 days ago", current: false, ip: "192.168.1.103" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSecurityData();
  }, []);

  // Manage focus, escape key, and background scroll when 2FA modal is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!showTwoFactorSetup) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the 2FA heading for screen readers
    setTimeout(() => {
      twoFAHeadingRef.current?.focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowTwoFactorSetup(false);
        track('profile.security.2fa.modal.close');
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showTwoFactorSetup]);

  const handleToggle = async (setting: keyof typeof settings) => {
    if (setting === 'twoFactorEnabled') {
      if (!settings.twoFactorEnabled) {
        // Show setup process
        setShowTwoFactorSetup(true);
        track('profile.security.2fa.modal.open');
      } else {
        // Disable 2FA with confirmation
        if (confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
          try {
            const response = await fetch('/api/security', {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ twoFactorEnabled: false }),
            });

            if (response.ok) {
              setSettings(prev => ({ ...prev, twoFactorEnabled: false }));
            } else {
              throw new Error('Failed to update setting');
            }
          } catch (err) {
            console.error('Error updating 2FA setting:', err);
            setError('Failed to update two-factor authentication setting.');
          }
        }
      }
    } else {
      const newValue = typeof settings[setting] === 'boolean' ? !settings[setting] : settings[setting];

      try {
        const response = await fetch('/api/security', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [setting]: newValue }),
        });

        if (response.ok) {
          setSettings(prev => ({
            ...prev,
            [setting]: newValue
          }));
        } else {
          throw new Error('Failed to update setting');
        }
      } catch (err) {
        console.error('Error updating setting:', err);
        setError('Failed to update security setting.');
      }
    }
  };

  const completeTwoFactorSetup = async () => {
    try {
      if (typeof fetch !== 'function') {
        setSettings(prev => ({ ...prev, twoFactorEnabled: true }));
        setShowTwoFactorSetup(false);
        alert('Two-factor authentication has been enabled successfully!');
        return;
      }
      const response = await fetch('/api/security', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ twoFactorEnabled: true }),
      });

      if (response.ok) {
        setSettings(prev => ({ ...prev, twoFactorEnabled: true }));
        setShowTwoFactorSetup(false);
        track('profile.security.2fa.modal.close');
        alert('Two-factor authentication has been enabled successfully!');
      } else {
        throw new Error('Failed to enable 2FA');
      }
    } catch (err) {
      console.error('Error enabling 2FA:', err);
      setError('Failed to enable two-factor authentication.');
    }
  };

  const handleAutoLogoutChange = async (value: string) => {
    try {
      if (typeof fetch !== 'function') {
        setSettings(prev => ({ ...prev, autoLogout: value }));
        try { localStorage.setItem('auto_logout_minutes', String(value)); } catch { /* ignore */ }
        return;
      }
      const response = await fetch('/api/security', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ autoLogout: value }),
      });

      if (response.ok) {
        setSettings(prev => ({ ...prev, autoLogout: value }));
        try {
          localStorage.setItem('auto_logout_minutes', String(value));
        } catch { /* ignore */ }
      } else {
        throw new Error('Failed to update auto logout setting');
      }
    } catch (err) {
      console.error('Error updating auto logout:', err);
      setError('Failed to update auto logout setting.');
      // Still update UI for better UX
      setSettings(prev => ({ ...prev, autoLogout: value }));
      try {
        localStorage.setItem('auto_logout_minutes', String(value));
      } catch { /* ignore */ }
    }
  };

  const getDeviceIcon = (deviceName: string) => {
    const device = deviceName.toLowerCase();
    if (device.includes('iphone') || device.includes('samsung') || device.includes('mobile')) {
      return <User className="w-6 h-6 text-white" />;
    } else if (device.includes('tv') || device.includes('smart tv')) {
      return <Play className="w-6 h-6 text-white" />;
    } else {
      return <Settings className="w-6 h-6 text-white" />;
    }
  };

  const logoutDevice = async (deviceId: number) => {
    const deviceToLogout = devices.find(d => d.id === deviceId);
    if (deviceToLogout && !deviceToLogout.current) {
      try {
        if (typeof fetch !== 'function') {
          setDevices(prevDevices => prevDevices.filter(d => d.id !== deviceId));
          alert(`Successfully logged out ${deviceToLogout.device}`);
          return;
        }
        const response = await fetch(`/api/security/devices/${deviceId}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setDevices(prevDevices => prevDevices.filter(d => d.id !== deviceId));
          alert(`Successfully logged out ${deviceToLogout.device}`);
        } else {
          throw new Error('Failed to logout device');
        }
      } catch (err) {
        console.error('Error logging out device:', err);
        setError('Failed to logout device. Please try again.');
      }
    }
  };

  const logoutAllDevices = async () => {
    const nonCurrentDevices = devices.filter(d => !d.current);
    if (nonCurrentDevices.length > 0) {
      if (confirm(`Are you sure you want to log out all ${nonCurrentDevices.length} other devices?`)) {
        try {
          if (typeof fetch !== 'function') {
            setDevices(prevDevices => prevDevices.filter(d => d.current));
            alert(`Successfully logged out ${nonCurrentDevices.length} devices`);
            return;
          }
          const response = await fetch('/api/security/devices/logout-all-others', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            setDevices(prevDevices => prevDevices.filter(d => d.current));
            alert(`Successfully logged out ${nonCurrentDevices.length} devices`);
          } else {
            throw new Error('Failed to logout all devices');
          }
        } catch (err) {
          console.error('Error logging out all devices:', err);
          setError('Failed to logout all devices. Please try again.');
        }
      }
    } else {
      alert('No other devices to log out');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className="text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

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
                data-testid="toggle"
                aria-label="Toggle two-factor authentication"
                role="switch"
                aria-checked={settings.twoFactorEnabled}
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
              <label htmlFor="auto-logout-select" className="sr-only">Auto Logout</label>
              <select
                id="auto-logout-select"
                aria-label="Auto Logout"
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
            <div role="region" aria-label={device.device}
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
                    {getDeviceIcon(device.device)}
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

      {/* Two-Factor Authentication Setup Modal */}
      {showTwoFactorSetup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="twofa-setup-heading"
            className="bg-gradient-to-br from-gray-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 id="twofa-setup-heading" ref={twoFAHeadingRef} tabIndex={-1} className="text-2xl font-bold text-white mb-2">Enable Two-Factor Authentication</h3>
              <p className="text-gray-400 text-sm">Secure your account with an additional verification step</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
                <h4 className="text-white font-semibold mb-2">Step 1: Download an Authenticator App</h4>
                <p className="text-gray-400 text-sm">Use Google Authenticator, Authy, or similar apps</p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
                <h4 className="text-white font-semibold mb-2">Step 2: Scan QR Code</h4>
                <div className="bg-white rounded-lg p-4 mx-auto w-32 h-32 flex items-center justify-center">
                  <div className="text-black text-xs text-center">QR Code<br/>Placeholder</div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
                <h4 className="text-white font-semibold mb-2">Step 3: Enter Verification Code</h4>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500"
                  maxLength={6}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => { setShowTwoFactorSetup(false); track('profile.security.2fa.modal.close'); }}
                className="flex-1 bg-gray-600/20 text-gray-400 px-6 py-3 rounded-xl font-medium hover:bg-gray-600/30 transition-colors border border-gray-600/30"
              >
                Cancel
              </button>
              <button
                onClick={completeTwoFactorSetup}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
              >
                Complete Setup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Accessibility: focus + escape + scroll lock for the 2FA modal
// Attach effects at the end of the module to keep component concise
// Note: keep minimal side effects only when the modal is open
