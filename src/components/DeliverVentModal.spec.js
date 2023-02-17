import { printVentilatorName } from './DeliverVent.modal';

describe('DeliverVentModal helper functions', () => {
  describe('printVentilatorName()', () => {
    it('should print name in the correct format', () => {
      const mockVent = {
        brand: 'Philips',
        model: 'Trilogy 3000',
        serial: '12548PT3000',
      };

      const result = printVentilatorName(mockVent);

      expect(result).toBe('Philips Trilogy 3000 [s/n: 12548PT3000]');
    });
  });
});
