import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Trash2, Clock } from 'lucide-react';
import { PriceAlert } from '../types/alert';
import { alertManager } from '../utils/alertManager';
import { formatPrice } from '../utils/formatters';

const AlertsPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  const loadAlerts = () => {
    setAlerts(alertManager.getAlerts());
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleToggleAlert = (alertId: string) => {
    alertManager.toggleAlert(alertId);
    loadAlerts();
  };

  const handleRemoveAlert = (alertId: string) => {
    alertManager.removeAlert(alertId);
    loadAlerts();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const activeAlerts = alerts.filter(alert => alert.isActive && !alert.triggeredAt);
  const triggeredAlerts = alerts.filter(alert => alert.triggeredAt);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Bell className="mr-2" size={20} />
        Price Alerts
      </h3>

      {alerts.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Bell size={48} className="mx-auto mb-4 opacity-50" />
          <p>No price alerts set yet</p>
          <p className="text-sm">Click the bell icon on any coin to set an alert</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeAlerts.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 text-green-400">Active Alerts ({activeAlerts.length})</h4>
              {activeAlerts.map(alert => (
                <div key={alert.id} className="bg-gray-700 rounded-lg p-4 mb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">{alert.coinName}</span>
                        <span className="text-gray-400 text-sm uppercase">({alert.coinSymbol})</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Alert when price goes <span className="font-semibold">{alert.condition}</span> {formatPrice(alert.targetPrice)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        <Clock size={12} className="inline mr-1" />
                        Created {formatDate(alert.createdAt)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleAlert(alert.id)}
                        className="text-gray-400 hover:text-yellow-400 transition-colors"
                        title="Pause alert"
                      >
                        <BellOff size={16} />
                      </button>
                      <button
                        onClick={() => handleRemoveAlert(alert.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete alert"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {triggeredAlerts.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 text-blue-400">Triggered Alerts ({triggeredAlerts.length})</h4>
              {triggeredAlerts.map(alert => (
                <div key={alert.id} className="bg-gray-700 rounded-lg p-4 mb-3 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">{alert.coinName}</span>
                        <span className="text-gray-400 text-sm uppercase">({alert.coinSymbol})</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Price went <span className="font-semibold">{alert.condition}</span> {formatPrice(alert.targetPrice)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        <Clock size={12} className="inline mr-1" />
                        Triggered {formatDate(alert.triggeredAt!)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveAlert(alert.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      title="Delete alert"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;