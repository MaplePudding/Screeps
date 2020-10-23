module.exports = {
    structureObj: {
        "extention": STRUCTURE_EXTENSION,
        "road": STRUCTURE_ROAD,
        "tower": STRUCTURE_TOWER,
    },

    createStructure: function(structure){
        for(flag in Game.flags){
            if(flag.indexOf(structure) != -1){
                Game.flags[flag].pos.createConstructionSite(this.structureObj[structure]);
            }
        }
    },

    towerDefend: function(towers, hostiles){
        towers.forEach((tower) => tower.attack(hostiles[0]));
    },

    towerRepair: function(towers, repairArray){
        towers.forEach((tower) => tower.repair(repairArray[0]));
    },

    towerHeal: function(){

    },

    runTower: function(){

        let towers = Game.rooms["E37N3"].find(FIND_STRUCTURES, {
            filter: (structure) =>{
                return structure.structureType === STRUCTURE_TOWER;
            }
        })

        console.log(towers.length)

        if(towers.length !== 0){
            let hostiles = Game.rooms["E37N3"].find(FIND_HOSTILE_CREEPS);

            let repairArray = Game.rooms["E37N3"].find(FIND_STRUCTURES, {
                filter: (object) =>{
                    return object.hits < object.hitsMax && object.structureType != STRUCTURE_WALL;
                }
            }).sort((a,b) => a.hits - b.hits);

            if(hostiles.length > 0){
                this.towerDefend(towers, hostiles);
            }else if(repairArray.length > 0){
                this.towerRepair(towers, repairArray);
            }else{

            }
        }
    }

    
}