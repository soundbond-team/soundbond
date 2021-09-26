module.exports = (sequelize, Sequelize) => {
    const Sound = sequelize.define("sound", {
        /* Modèle son.
        Sequelize supports CRUD functions:
            create a new Tutorial: create(object)
            find a Tutorial by id: findByPk(id)
            get all Tutorials: findAll()
            update a Tutorial by id: update(data, where: { id: id })
            remove a Tutorial: destroy(where: { id: id })
            remove all Tutorials: destroy(where: {})
            find all Tutorials by title: findAll({ where: { title: ... } })
        */

        title:          { type: Sequelize.STRING, },
        description:    { type: Sequelize.STRING, },
        published:      { type: Sequelize.BOOLEAN, },
    });

    return Sound;
};

// OTM : https://bezkoder.com/sequelize-associate-one-to-many/
// MTM : https://bezkoder.com/sequelize-associate-many-to-many/
