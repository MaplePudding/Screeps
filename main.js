const Builder = require("./builder");
const Harvester = require("./harvester");
const Upgrader = require("./upgrader");
const Defender = require("./defender");
const Structure = require("./structure");

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
            Harvester.simpleRun(Game.creeps[creep]);
        }
    }
}

function simpleRunBuilder(){
    for(creep in Game.creeps){
        if(Game.creeps[creep].memory.role === "builder"){
            Builder.simpleRun(Game.creeps[creep]);
        }
    }
}

function simpleRunUpgrader(){
    for(creep in Game.creeps){
        if(Game.creeps[creep].memory.role === "upgrader"){
            Upgrader.simpleRun(Game.creeps[creep])
        }
    }
}

module.exports.loop = function(){
    deleteCreep();

    if(Harvester.checkHarvesterPopulation() < 5){
        Harvester.createHarvester();
    }

    if(Builder.checkBuilderPopulation() < 6){
        Builder.createBuilder();
    }

    if(Upgrader.checkUpgraderPopulation() < 3){
        Upgrader.createUpgrader();
    }



    simpleRunHarvester();
    simpleRunBuilder();
    simpleRunUpgrader();


    Structure.createStructure("extention");
    Structure.createStructure("road");
    Structure.createStructure("tower")
}