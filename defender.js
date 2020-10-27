let population = require("./population")
let createCreep = require("./createCreep")
let resource = require("./resource")

module.exports = {
    roleAttribute_1: [WORK, MOVE, MOVE, CARRY, ATTACK],
    roleAttribute_2: [WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, ATTACK],

    checkDefenderPopulation: function(){
        return population.checkPopulation("defender")
    },

    /**
     * Get a defender
     */

    createDefender: function(){
        let date = new Date();

        let creepName = "Defender" + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();
        
        if(Game.rooms["E37N3"].energyAvailable <= 550){
            createCreep.createCreep(this.roleAttribute_1, creepName, {memory: {role: "defender", defending: false, harvesting: false}})
        }else if(Game.rooms["E37N3"].energyAvailable > 550 ){
            createCreep.createCreep(this.roleAttribute_2, creepName, {memory: {role: "defender", defending: false, harvesting: false}})
        }
    },

    getEnergyNoInvader: function(defender){

        if(!defender.store[RESOURCE_ENERGY]){
            defender.memory.harvesting = false;
        }
    
        if(defender.store[RESOURCE_ENERGY] === defender.store.getCapacity(RESOURCE_ENERGY)){
            defender.memory.harvesting = true;
        }
            
        if(!defender.memory.harvesting){
            let resourceArray = builder.room.find(FIND_SOURCES);

            if(builder.harvest(resourceArray[0]) === ERR_NOT_IN_RANGE){
                defender.moveTo(resourceArray[0]);
            }else{
                defender.harvest(resourceArray[0])
            }
        }else{
            let targetArray = defender.room.find(FIND_STRUCTURES, {
                filter: (structure) =>{
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            })
    
            if(defender.transfer(targetArray[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                defender.moveTo(targetArray[0]);
            }else{
                defender.transfer(targetArray[0]);
            }
        }
    },

    changeDefenderHarvestingStatus: function(defender){
        if(defender.store[RESOURCE_ENERGY] === 0){
            defender.memory.harvesting = false;
        }
        
        if(defender.store[RESOURCE_ENERGY] === defender.store.getCapacity()){
            defender.memory.harvesting = true;
        }
    },

    changeDefenderDefendingStatus: function(defender){
        if(!defender.store[RESOURCE_ENERGY]){
            defender.memory.defending = false;
        }

        if(defender.store[RESOURCE_ENERGY] === defender.store.getCapacity(RESOURCE_ENERGY)){
            defender.memory.defending = true;
        }
    },

    /**
     * Builder run function
     */

    simpleRun: function(defender){

        this.changeDefenderHarvestingStatus(defender)

        let invaderArray = defender.room.find(FIND_HOSTILE_CREEPS);

        if(invaderArray.length === 0){
            this.getEnergyNoInvader(defender);
        }else{

            /**
             * Build
             */

            this.changeDefenderDefendingStatus(defender);

            if(defender.memory.defending){
                if(defender.attack(invaderArray[0]) === ERR_NOT_IN_RANGE){
                    defender.moveTo(invaderArray[0]);
                }else{
                    defender.attack(invaderArray[0]);
                }
            }else{
                resource.getEnergy(defender);
            }
        }
    }
}