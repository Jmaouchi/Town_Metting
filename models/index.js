const User = require('./User');
const Families = require('./Families')
const Member = require('./Member')


Member.belongsTo(Families, {
  foreignKey: 'family_id'
});

// create associations
Families.hasMany(Member, {
  foreignKey: 'family_id'
});

module.exports = { User, Families, Member};
