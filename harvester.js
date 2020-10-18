let population = require("./population")

module.exports = {

    roleAttribute: [MOVE, CARRY, WORK],

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

        Game.spawns["Spawn1"].spawnCreep(this.roleAttribute, creepName, {memory: {role : "harvester"}})
    },

    /**
     * Simple run function
     */

    simpleRun: function(harvester){
        let source = harvester.room.find(FIND_SOURCES);
        
        if(harvester.carry.energy < harvester.carryCapacity){
            if(harvester.harvest(source[0]) === ERR_NOT_IN_RANGE){
                harvester.moveTo(source[0]);
            }else{
                harvester.harvest(source[0]);
            }
        }else{
            if(harvester.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                harvester.moveTo(Game.spawns["Spawn1"]);
            }else{
                harvester.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY);
            }
        }


    }
}