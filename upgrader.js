let population = require("./population")
let createCreep = require("./createCreep")
let resource = require("./resource")

module.exports = {
    roleAttribute_1: [MOVE, MOVE, WORK, CARRY],
    roleAttribute_2: [WORK, WORK, CARRY, MOVE, MOVE, CARRY],

    /**
     * Check the population
     */

    checkUpgraderPopulation: function(){
        return population.checkPopulation("upgrader");
    },

    /**
     * Get a upgrader
     */

    createUpgrader: function(){
        let date = new Date();

        let creepName = "Upgrader" + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();

        if(Game.rooms["E37N3"].energyAvailable < 400){
            createCreep.createCreep(this.roleAttribute_1, creepName, {memory: {role: "upgrader", upgrading: false}})
        }else if(Game.rooms["E37N3"].energyAvailable >= 400 ){
            createCreep.createCreep(this.roleAttribute_2, creepName, {memory: {role: "upgrader", upgrading: false}})
        }
    },

    /**
     * Upgrader run function
     */

    simpleRun: function(upgrader){

        if(!upgrader.store[RESOURCE_ENERGY]){
            upgrader.memory.upgrading = false;
        }
        
        if(upgrader.store[RESOURCE_ENERGY] === upgrader.store.getCapacity()){
            upgrader.memory.upgrading = true;
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