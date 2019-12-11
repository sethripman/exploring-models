const Drink = require('./Drink');

describe('Champion', () => {
  describe('fullName', () => {
    it('requires a full name', () => {
      const champion = new Champion({
        hometown: 'Stockton, CA',
        fightingStyle: 'thugjitsu',
        wins: 20,
        losses: 10
      });

      const { errors } = champion.validateSync();
      expect(errors.fullName.message).toEqual('Path `fullName` is required.');
    });
  });

});
