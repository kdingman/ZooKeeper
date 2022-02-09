const fs = require('fs');

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeeper.js');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper (
        { name: "Kelly", id: "4607734" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Kelly");
    expect(zookeeper.id).toBe("4607734");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Kelly",
            age: 39,
            favoriteAnimal: "llama",
        },
        {
            id: "3",
            name: "Joy",
            age: 32,
            favoriteAnimal: "turtle",
        }
    ];

    const updatedZookeepers = filterByQuery({ age: 39 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);

});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Kelly",
            age: 39,
            favoriteAnimal: "llama"
        },
        {
            id: "3",
            name: "Joy",
            age: 32,
            favoriteAnimal: "turtle",
        },
    ];

    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Joy");
});

test("validates age", () => {
    const zookeeper = {
        id: "2",
        name: "Kelly",
        age: 39,
        favoriteAnimal: "llama",
    };

    const invalidZookeeper = {
        id: "3",
        name: "Joy",
        age: "32",
        favoriteAnimal: "turtle"
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});