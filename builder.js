let population = require("./population")
let createCreep = require("./createCreep")
let resource = require("./resource")
let harvester = require("./harvester")

module.exports = {
    roleAttribute_1: [WORK, MOVE, MOVE, CARRY],
    roleAttribute_2: [WORK, WORK, MOVE, MOVE, MOVE, CARRY],

    checkBuilderPopulation: function(){
        return population.checkPopulation("builder")
    },

    /**
     * Get a harvester
     */

    createBuilder: function(){
        let date = new Date();

        let creepName = "Builder" + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();
        
        if(Game.rooms["E37N3"].energyAvailable <= 400){
            createCreep.createCreep(this.roleAttribute_1, creepName, {memory: {role: "builder", building: false, harvesting: false}})
        }else if(Game.rooms["E37N3"].energyAvailable > 400 && Game.rooms["E37N3"].energyAvailable < 650){
            createCreep.createCreep(this.roleAttribute_2, creepName, {memory: {role: "builder", building: false, harvesting: false}})
        }
    },

    getEnergyNoSite: function(builder){

        if(!builder.store[RESOURCE_ENERGY]){
            builder.memory.harvesting = false;
        }
    
        if(builder.store[RESOURCE_ENERGY] === builder.store.getCapacity(RESOURCE_ENERGY)){
            builder.memory.harvesting = true;
        }
            
        if(!builder.memory.harvesting){
            let resourceArray = builder.room.find(FIND_SOURCES);

            if(builder.harvest(resourceArray[0]) === ERR_NOT_IN_RANGE){
                builder.moveTo(resourceArray[0]);
            }else{
                builder.harvest(resourceArray[0])
            }
        }else{
            let targetArray = builder.room.find(FIND_STRUCTURES, {
                filter: (structure) =>{
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            })
    
            if(builder.transfer(targetArray[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                builder.moveTo(targetArray[0]);
            }else{
                builder.transfer(targetArray[0]);
            }
        }
    },

    changeBuilderHarvestingStatus: function(builder){
        if(builder.store[RESOURCE_ENERGY] === 0){
            builder.memory.building = false;
        }
        
        if(builder.store[RESOURCE_ENERGY] === builder.store.getCapacity()){
            builder.memory.building = true;
        }
    },

    changeBuilderBuildingStatus: function(builder){
        if(!builder.store[RESOURCE_ENERGY]){
            builder.memory.building = false;
        }

        if(builder.store[RESOURCE_ENERGY] === builder.store.getCapacity(RESOURCE_ENERGY)){
            builder.memory.building = true;
        }
    },

    /**
     * Builder run function
     */

    simpleRun: function(builder){

        this.changeBuilderHarvestingStatus(builder)

        let siteArray = builder.room.find(FIND_CONSTRUCTION_SITES);

        if(siteArray.length === 0){
            
        }else{

            /**
             * Build
             */

            this.changeBuilderBuildingStatus(builder);

            if(builder.memory.building){
                if(builder.build(siteArray[0]) === ERR_NOT_IN_RANGE){
                    builder.moveTo(siteArray[0]);
                }else{
                    builder.build(siteArray[0]);
                }
            }else{
                resource.getEnergy(builder);
            }
        }
    }
}