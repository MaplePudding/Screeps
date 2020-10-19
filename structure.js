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
    }
}