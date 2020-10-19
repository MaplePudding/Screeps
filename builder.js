let population = require("./population")
let createCreep = require("./createCreep")
let resource = require("./resource")

function build(builder){

}

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
        
        if(Game.rooms["E37N3"].energyCapacityAvailable < 350){
            createCreep.createCreep(this.roleAttribute_1, creepName, {memory: {role: "builder", building: false}})
        }else if(Game.rooms["E37N3"].energyCapacityAvailable >= 350 && Game.rooms["E37N3"].energyCapacityAvailable < 650){
            createCreep.createCreep(this.roleAttribute_2, creepName, {memory: {role: "builder", building: false}})
        }
    },

    /**
     * Builder run function
     */

    simpleRun: function(builder){

        if(builder.store[RESOURCE_ENERGY] === 0){
            builder.memory.building = false;
        }
        
        if(builder.store[RESOURCE_ENERGY] === builder.store.getCapacity()){
            builder.memory.building = true;
        }

        /**
         * Build
         */

        if(builder.memory.building){
            let siteArray = builder.room.find(FIND_CONSTRUCTION_SITES);

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