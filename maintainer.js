let population = require("./population")
let createCreep = require("./createCreep")
let resource = require("./resource")

module.exports = {
    roleAttribute_1: [WORK, MOVE, MOVE, CARRY],
    roleAttribute_2: [WORK, WORK, MOVE, MOVE, MOVE, CARRY],

    checkMaintainerPopulation: function(){
        return population.checkPopulation("maintainer")
    },

    /**
     * Get a maintainer
     */

    createMaintainer: function(){
        let date = new Date();

        let creepName = "Maintainer" + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();
        
        if(Game.rooms["E37N3"].energyAvailable <= 500){
            createCreep.createCreep(this.roleAttribute_1, creepName, {memory: {role: "maintainer", maintaining: false, harvesting: false}});
        }else if(Game.rooms["E37N3"].energyAvailable > 500 && Game.rooms["E37N3"].energyAvailable < 650){
            createCreep.createCreep(this.roleAttribute_2, creepName, {memory: {role: "maintainer", maintaining: false, harvesting: false}});
        }
    },

    getEnergyNoTarget: function(maintainer){

        if(!maintainer.store[RESOURCE_ENERGY]){
            maintainer.memory.harvesting = false;
        }
    
        if(maintainer.store[RESOURCE_ENERGY] === maintainer.store.getCapacity(RESOURCE_ENERGY)){
            maintainer.memory.harvesting = true;
        }
            
        if(!maintainer.memory.harvesting){
            let resourceArray = maintainer.room.find(FIND_SOURCES);

            if(maintainer.harvest(resourceArray[0]) === ERR_NOT_IN_RANGE){
                maintainer.moveTo(resourceArray[0]);
            }else{
                maintainer.harvest(resourceArray[0])
            }
        }else{
            let targetArray = maintainer.room.find(FIND_STRUCTURES, {
                filter: (structure) =>{
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            })
    
            if(maintainer.transfer(targetArray[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                maintainer.moveTo(targetArray[0]);
            }else{
                maintainer.transfer(targetArray[0]);
            }
        }
    },

    changeMaintainerHarvestingStatus: function(maintainer){
        if(maintainer.store[RESOURCE_ENERGY] === 0){
            maintainer.memory.building = false;
        }
        
        if(maintainer.store[RESOURCE_ENERGY] === maintainer.store.getCapacity()){
            maintainer.memory.building = true;
        }
    },

    changeMaintainerMaintainingStatus: function(maintainer){
        if(!maintainer.store[RESOURCE_ENERGY]){
            maintainer.memory.maintaining = false;
        }

        if(maintainer.store[RESOURCE_ENERGY] === maintainer.sotre.getCapacity(RESOURCE_ENERGY)){
            maintainer.memory.maintaining = true;
        }
    },

    simpleRun: function(maintainer){

        this.changeMaintainerHarvestingStatus(maintainer);

        let targetArray = maintainer.room.find(STRUCTURE_TOWER);

        if(targetArray.length === 0){
            this.getEnergyNoTarget(maintainer)
        }else{

            this.changeMaintainerMaintainingStatus(maintainer)

            /**
             * Build
             */
            
            if(maintainer.memory.maintaining){
                if(maintainer.transfer(targetArray[0]) === ERR_NOT_IN_RANGE){
                    maintainer.moveTo(targetArray[0]);
                }else{
                    maintainer.transfer(targetArray[0]);
                }
            }else{
                resource.getEnergy(maintainer);
            }
        }
    }
}