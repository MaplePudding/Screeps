const Builder = require("./builder");
const Harvester = require("./harvester");
const Upgrader = require("./upgrader");
const Defender = require("./defender");
const Structure = require("./structure");
const Repairer = require("./repairer");
const Maintainer = require("./maintainer");
const structure = require("./structure");

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
            Upgrader.simpleRun(Game.creeps[creep]);
        }
    }
}

function simpleRunRepairer(){
    for(creep in Game.creeps){
        if(Game.creeps[creep].memory.role === "repairer"){
            Repairer.simpleRun(Game.creeps[creep]);
        }
    }
}

function simpleRunMaintainer(){
    for(creep in Game.creeps){
        if(Game.creeps[creep].memory.role === "maintainer"){
            Maintainer.simpleRun(Game.creeps[creep]);
        }
    }
}

function createCreep(){
    if(Harvester.checkHarvesterPopulation() < 7){
        Harvester.createHarvester();
    }

    if(Builder.checkBuilderPopulation() < 3 && Harvester.checkHarvesterPopulation() > 5){
        Builder.createBuilder();
    }

    if(Upgrader.checkUpgraderPopulation() < 4 && Harvester.checkHarvesterPopulation() > 3){
        Upgrader.createUpgrader();
    }

    if(Repairer.checkRepairerPopulation() < 2 && Harvester.checkHarvesterPopulation() > 5){
        Repairer.createRepairer();
    }

    if(Maintainer.checkMaintainerPopulation() < 2 && Harvester.checkHarvesterPopulation() > 4){
        Maintainer.createMaintainer();
    }
}

function createAllStructure(){
    Structure.createStructure("extention");
    Structure.createStructure("road");
    Structure.createStructure("tower");
}

function simpleRun(){
    simpleRunHarvester();
    simpleRunBuilder();
    simpleRunUpgrader();
    simpleRunRepairer();
    simpleRunMaintainer();
    structure.runTower();
}

module.exports.loop = function(){
    deleteCreep();
    createCreep();
    simpleRun();
    createAllStructure();


}