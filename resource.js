const structure = require("./structure");

module.exports = {
    getEnergy: function(creep){

        if(creep.memory.role === "harvester"){

            /**
             * The function fro harvester
             */

            let resourceArray = creep.room.find(FIND_SOURCES);

            if(creep.harvest(resourceArray[0]) === ERR_NOT_IN_RANGE){
                creep.moveTo(resourceArray[0]);
            }else{
                creep.harvest(resourceArray[0])
            }
        }else{
            let resourceArray = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) =>{
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) + 15 < structure.store.getCapacity(RESOURCE_ENERGY));
                }
            })

            if(resourceArray.length != 0){

                /**
                 * Get energy from spawn or extention
                 */

                for(resource in resourceArray){
                    if(creep.withdraw(resourceArray[resource], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                        creep.moveTo(resourceArray[resource])
                    }else{
                        creep.withdraw(resourceArray[resource], RESOURCE_ENERGY);
                    }
                }
            }else{

                /**
                 * No energy in extention or spawn
                 */

                let resourceArray = creep.room.find(FIND_SOURCES);

                if(creep.harvest(resourceArray[0]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(resourceArray[0]);
                }else{
                    creep.harvest(resourceArray[0])
                }
            }
        }
    }
}