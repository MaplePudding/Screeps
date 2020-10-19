let population = require("./population")
let createCreep = require("./createCreep")
let resource = require("./resource")

module.exports = {
    roleAttribute_1: [MOVE, MOVE, WORK, CARRY],
    roleAttribute_2: [WORK, WORK, MOVE, MOVE, MOVE, CARRY],

    /**
     * Check the population
     */

    checkUpgraderPopulation: function(){
        return population.checkPopulation("repairer");
    },

    /**
     * Get a upgrader
     */

    createUpgrader: function(){
        let date = new Date();

        let creepName = "Repairer" + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();

        if(Game.rooms["E37N3"].energyCapacityAvailable < 400){
            createCreep.createCreep(this.roleAttribute_1, creepName, {memory: {role: "repairer", repairing: false}})
        }else if(Game.rooms["E37N3"].energyCapacityAvailable >= 400  && Game.rooms["E37N3"].energyCapacityAvailable < 500){
            createCreep.createCreep(this.roleAttribute_2, creepName, {memory: {role: "repairer", repairing: false}})
        }
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

        if(upgrader.memory.upgrading){
            if(upgrader.upgradeController(upgrader.room.controller) === ERR_NOT_IN_RANGE){
                upgrader.moveTo(upgrader.room.controller);
            }else{
                upgrader.upgradeController(upgrader.room.controller);
            }
        }else{
            resource.getEnergy(upgrader);
        }
    }
}