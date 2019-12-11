const Champion = require('./Champion');

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

  describe('hometown', () => {
    it('requires a hometown', () => {
      const champion = new Champion({
        fullName: 'Nate Diaz',
        fightingStyle: 'thugjitsu',
        wins: 20,
        losses: 10
      });

      const { errors } = champion.validateSync();
      expect(errors.hometown.message).toEqual('Path `hometown` is required.');
    });
  });

  describe('fightingStyle', () => {
    it('requires a fighting style', () => {
      const champion = new Champion({
        fullName: 'Nate Diaz',
        hometown: 'Stockton, CA',
        wins: 20,
        losses: 10
      });
      
      const { errors } = champion.validateSync();
      expect(errors.fightingStyle.message).toEqual('Path `fightingStyle` is required.');
    });
  
    it('must be have the value of boxing, wrestling, karate, thugjitsu, sambo, or muay thai', () => {
      const champion = new Champion({
        fullName: 'Nate Diaz',
        hometown: 'Stockton, CA',
        fightingStyle: 'loving sumo with harsh scowling and tender emotions',
        wins: 20,
        losses: 10
      });
  
      const { errors } = champion.validateSync();
      expect(errors.fightingStyle.message).toEqual('`loving sumo with harsh scowling and tender emotions` is not a valid enum value for path `fightingStyle`.');
    });
  });
});
