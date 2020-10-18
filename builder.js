let population = require("./population")

module.exports = {
    roleAttribute: [WORK, MOVE, MOVE, CARRY],

    checkBuilderPopulation: function(){
        return population.checkPopulation("builder")
    }
}