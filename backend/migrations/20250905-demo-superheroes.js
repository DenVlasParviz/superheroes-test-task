'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const heroes = [
            {
                nickname: "Superman",
                real_name: "Clark Kent",
                origin_description: "Clark Kent was born Kal-El on the planet Krypton, the son of Jor-El and Lara. Moments before Krypton's destruction, his parents sent him to Earth in a spacecraft. Raised in Smallville by Jonathan and Martha Kent, Clark discovered he had extraordinary powers, including super strength, flight, heat vision, and invulnerability. As an adult, he adopts the identity of Superman to protect humanity.",
                superpowers: "Flight, super strength, heat vision",
                catch_phrase: "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
            },
            {
                nickname: "Batman",
                real_name: "Bruce Wayne",
                origin_description: "Bruce Wayne witnessed the murder of his parents, Thomas and Martha Wayne, as a child, which led him to dedicate his life to fighting crime in Gotham City. Using his wealth, intellect, and physical training, he became Batman, a vigilante who relies on martial arts, detective skills, and a vast array of high-tech gadgets to combat criminals and supervillains.",
                superpowers: "Martial arts, high intellect, gadgets",
                catch_phrase: "I am vengeance, I am the night!",
            },
            {
                nickname: "Wonder Woman",
                real_name: "Diana Prince",
                origin_description: "Diana Prince, known as Wonder Woman, is the daughter of Queen Hippolyta of the Amazons, a race of warrior women living on the hidden island of Themyscira. She was sculpted from clay and given life by the gods, gaining superhuman strength, agility, and combat skills. She leaves her home to protect humanity and promote peace, wielding her Lasso of Truth and indestructible bracelets in battle.",
                superpowers: "Super strength, agility, combat skill",
                catch_phrase: "In the name of all that is good!",
            }
        ];

        const insertedHeroes = await queryInterface.bulkInsert('superheroes', heroes, { returning: true });

        const images = [

            {
                superhero_id: insertedHeroes[0].id,
                url: '1757071351315-527508421.webp',
            },
            {
                superhero_id: insertedHeroes[0].id,
                url: '1757071351317-938475612.webp',
            },


            {
                superhero_id: insertedHeroes[1].id,
                url: '1757071351320-827364912.webp',
            },
            {
                superhero_id: insertedHeroes[1].id,
                url: '1757071351322-483920175.jpg',
            },

            {
                superhero_id: insertedHeroes[2].id,
                url: '1757071351330-194756283.webp',
            },
            {
                superhero_id: insertedHeroes[2].id,
                url: '1757071351333-672849310.jpg',
            },
        ];

        await queryInterface.bulkInsert('images', images);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('images', null, {});
        await queryInterface.bulkDelete('superheroes', null, {});
    }
};
