import OrderStatusTag from './OrderStatus-tag';

describe('OrderStatusTag helper functions', () => {
  describe('OrderStatusTag()', () => {
    it('should return yellow tag if status = PENDING', () => {
      const result = OrderStatusTag({ status: 'PENDING' });

      expect(result.type).toBe('span');
      expect(result.props).toEqual({
        className: 'tag is-warning',
        children: 'PENDING',
      });
    });

    it('should return green tag if status = DISPATCHED', () => {
      const result = OrderStatusTag({ status: 'DISPATCHED' });

      expect(result.type).toBe('span');
      expect(result.props).toEqual({
        className: 'tag is-success',
        children: 'DISPATCHED',
      });
    });

    it('should return blue tag if status = RETURNED', () => {
      const result = OrderStatusTag({ status: 'RETURNED' });

      expect(result.type).toBe('span');
      expect(result.props).toEqual({
        className: 'tag is-info',
        children: 'RETURNED',
      });
    });

    it('should return red tag if status = CLOSED', () => {
      const result = OrderStatusTag({ status: 'CLOSED' });

      expect(result.type).toBe('span');
      expect(result.props).toEqual({
        className: 'tag is-danger is-outlined',
        children: 'CLOSED',
      });
    });
  });
});
