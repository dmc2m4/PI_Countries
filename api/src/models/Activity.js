const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      set (value) {
        this.setDataValue('name', value.toUpperCase())
      }
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    dificult :{
      type: DataTypes.INTEGER,
      validate : {
        min: 1,
        max: 5,
        isEven(value){
            if(value < 1 || value > 5) throw new Error ("La dificultad debe ser un valor entre 1 y 5")
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      validate : {
        min: 1,
        max: 24,
        isEven (value){
            if(value < 1|| value > 24) throw new Error ("La duración debe ser entre 1 hora y 24 horas")
        },
        get (){
            if (this.getDataValue("duration") === 1) return `${this.getDataValue("duration")} hora`
            return `${this.getDataValue("duration")} horas`
        }
      }
    },
    season: {
      type: DataTypes.ENUM('summer', 'spring', 'winter', 'autumn','all seasons'),
      set (value) {
        this.setDataValue('season', value.toLowerCase())
      }
    },
  },{
    timestamps: true,
    createdAt: false,
    updatedAt: 'actualizado'
  });
};