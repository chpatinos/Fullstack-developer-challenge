module.exports = (sequelize, Sequelize) => {
  const Person = sequelize.define("person", {
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birth: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  Person.hasOne(Person, { as: "Father", foreignKey: "father" });
  Person.hasOne(Person, { as: "Mother", foreignKey: "mother" });

  Person.addHook("beforeValidate", (person) => {
    person.birth = new Date(person.birth);
  });

  return Person;
};
