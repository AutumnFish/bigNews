module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Article.associate = function(models) {
    // associations can be defined here
  };

  return Article;
};