'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Area);
      this.hasMany(models.User)
    }
  }
  Curso.init({
    sigla: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: DataTypes.TEXT,
    areaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Curso',
  });
  return Curso;
};