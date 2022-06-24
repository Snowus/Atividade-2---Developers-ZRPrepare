module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("events", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    data: {
      type: Sequelize.STRING,
    },
    startAt: {
      type: Sequelize.TIME,
    },
    endAt: {
      type: Sequelize.TIME,
    },
    local: {
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
    calendarID: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Event;
};
