let population = require("./population")
let createCreep = require("./createCreep")
let resource = require("./resource")
let harvester = require("./harvester")

module.exports = {
    roleAttribute_1: [MOVE, MOVE, WORK, CARRY],
    roleAttribute_2: [WORK, MOVE, MOVE, CARRY, CARRY, MOVE],

    /**
     * Check the population
     */

    checkRepairerPopulation: function(){
        return population.checkPopulation("repairer");
    },

    /**
     * Get a upgrader
     */

    createRepairer: function(){
        let date = new Date();

        let creepName = "Repairer" + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();

        if(Game.rooms["E37N3"].energyAvailable < 450){
            createCreep.createCreep(this.roleAttribute_1, creepName, {memory: {role: "repairer", repairing: false, harvesting: false}})
        }else if(Game.rooms["E37N3"].energyAvailable >= 450  && Game.rooms["E37N3"].energyAvailable < 550){
            createCreep.createCreep(this.roleAttribute_2, creepName, {memory: {role: "repairer", repairing: false, harvesting: false}})
        }
    },

    getRepaireTargetArr: function(repairer){
        return repairer.room.find(FIND_STRUCTURES, {
            filter: (object) =>{
                return object.hits < object.hitsMax;
            }
        }).sort((a,b) => a.hits - b.hits);
    },

    /**
     * Upgrader run function
     */

    simpleRun: function(repairer){

        if(!repairer.store[RESOURCE_ENERGY]){
            repairer.memory.repairing = false;
        }

        if(repairer.store[RESOURCE_ENERGY] === repairer.store.getCapacity()){
            repairer.memory.repairing = true;
        }

        let targetArray = this.getRepaireTargetArr(repairer);

        if(targetArray.length === 0){
            harvester.simpleRun(repairer);
        }else{

            /**
            * Repaire target
            */
            
            if(repairer.memory.repairing){
                if(repairer.repair(targetArray[0]) === ERR_NOT_IN_RANGE) {
                    repairer.moveTo(targetArray[0]);
                }else{
                    repairer.repair(targetArray[0])
                }
            }else{
                resource.getEnergy(repairer);
            }
        }
    }
}