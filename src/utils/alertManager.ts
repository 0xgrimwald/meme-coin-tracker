import { PriceAlert, AlertFormData } from '../types/alert';

const ALERTS_STORAGE_KEY = 'meme-coin-alerts';

export const alertManager = {
  getAlerts(): PriceAlert[] {
    try {
      const stored = localStorage.getItem(ALERTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading alerts:', error);
      return [];
    }
  },

  saveAlerts(alerts: PriceAlert[]): void {
    try {
      localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
    } catch (error) {
      console.error('Error saving alerts:', error);
    }
  },

  createAlert(alertData: AlertFormData): PriceAlert {
    const alert: PriceAlert = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...alertData,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    const alerts = this.getAlerts();
    alerts.push(alert);
    this.saveAlerts(alerts);
    
    return alert;
  },

  removeAlert(alertId: string): void {
    const alerts = this.getAlerts();
    const filteredAlerts = alerts.filter(alert => alert.id !== alertId);
    this.saveAlerts(filteredAlerts);
  },

  toggleAlert(alertId: string): void {
    const alerts = this.getAlerts();
    const alertIndex = alerts.findIndex(alert => alert.id === alertId);
    
    if (alertIndex !== -1) {
      alerts[alertIndex].isActive = !alerts[alertIndex].isActive;
      this.saveAlerts(alerts);
    }
  },

  checkAlerts(currentPrices: { [coinId: string]: number }): PriceAlert[] {
    const alerts = this.getAlerts();
    const triggeredAlerts: PriceAlert[] = [];

    alerts.forEach(alert => {
      if (!alert.isActive || alert.triggeredAt) return;

      const currentPrice = currentPrices[alert.coinId];
      if (!currentPrice) return;

      const shouldTrigger = 
        (alert.condition === 'above' && currentPrice >= alert.targetPrice) ||
        (alert.condition === 'below' && currentPrice <= alert.targetPrice);

      if (shouldTrigger) {
        alert.triggeredAt = new Date().toISOString();
        alert.isActive = false;
        triggeredAlerts.push(alert);
      }
    });

    if (triggeredAlerts.length > 0) {
      this.saveAlerts(alerts);
    }

    return triggeredAlerts;
  }
};