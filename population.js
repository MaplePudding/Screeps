module.exports = {
    checkPopulation: function(role){
        let population = 0;

        for(creep in Game.creeps){
            if(Game.creeps[creep].memory.role === role){
                ++population;
            }
        }

        console.log(population)

        return population
    }
}