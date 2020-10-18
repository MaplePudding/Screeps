let Harvester = require("./harvester")

/**
 * Delete dead creep
 */

function deleteCreep(){
    for(creep in Game.creeps){
        if(!Game.creeps[creep]){
            delete Game.creeps[creep];
        }
    }
}

function simpleRunHarvester(){
    for(creep in Game.creeps){
        if(Game.creeps[creep].memory.role === "harvester"){
            Harvester.simpleRun(Game.creeps[creep])
        }
    }
}

module.exports.loop = function(){
    deleteCreep();

    if(Harvester.checkHarvesterPopulation() < 5){
        Harvester.createHarvester();
    }

    simpleRunHarvester();

}