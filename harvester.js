let population = require("./population")
let createCreep = require("./createCreep")
let resource = require("./resource");
const structure = require("./structure");

module.exports = {

    roleAttribute_1: [CARRY, WORK, MOVE],
    roleAttribute_2: [CARRY, WORK, MOVE, MOVE],
    roleAttribute_3: [CARRY, MOVE, MOVE, MOVE, WORK, WORK],
    /**
     * Check the population
     */
    
    checkHarvesterPopulation: function(){
        return population.checkPopulation("harvester");

    },

    /**
     * Get a harvester
     */

    createHarvester: function(){
        let date = new Date();

        let creepName = "Harvester" + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();

        if(Game.rooms["E37N3"].energyCapacityAvailable < 250){
            createCreep.createCreep(this.roleAttribute_1, creepName, {memory: {role: "harvester"}})
        }else if(Game.rooms["E37N3"].energyCapacityAvailable >= 250 && Game.rooms["E37N3"].energyCapacityAvailable < 450){
            createCreep.createCreep(this.roleAttribute_2, creepName, {memory: {role: "harvester"}})
        }else if(Game.rooms["E37N3"].energyCapacityAvailable >= 400 && Game.rooms["E37N3"].energyCapacityAvailable < 600){
            createCreep.createCreep(this.roleAttribute_3, creepName, {memory: {role: "harvester"}})
        }

    },

    /**
     * Simple run function
     */

    simpleRun: function(harvester){
        
        if(harvester.carry.energy < harvester.carryCapacity){
            resource.getEnergy(harvester)
        }else{
            let targetArray = harvester.room.find(FIND_STRUCTURES, {
                filter: (structure) =>{
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            })


            if(harvester.transfer(targetArray[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                harvester.moveTo(targetArray[0]);
            }else{
                harvester.transfer(targetArray[0]);
            }
        }
        
    }
}