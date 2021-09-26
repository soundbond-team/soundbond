module.exports = (sequelize, Sequelize) => {
  const Sound = sequelize.define("sound", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Sound;
};
