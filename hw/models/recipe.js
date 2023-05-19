const { v4: uuid }  = require('uuid')
const fs = require('fs')
const path = require('path')

const { mongoConnect, ObjectId } = require("../service/mongodb")
const db = mongoConnect()

module.exports = class Recipe {
    constructor(name, ingredient, instruction){
        this.id = uuid()
        this.name = name
        this.ingredient = ingredient
        this.instruction = instruction
    }

    async save(){
        return (await db).collection("RECIPE").insertOne(this)
    }

    static async fetchAllRecipes(){
        return (await db).collection("RECIPE").find().toArray()
    }

    //update

    static async updateOne(data) {
        return (await db).collection("RECIPE").updateOne(
        { _id: new ObjectId(data.id) }, //filter
        { $set: { name: data.name, ingredient: data.ingredients, instruction: data.instruction } }) //update
    }

    //delete a recipe

    static async deleteOne(id) {
        return (await db).collection("RECIPE").deleteOne({ _id: new ObjectId(id) })
    }

    //delete all recipes

    static async deleteAll() {
        return (await db).collection("RECIPE").deleteMany()
    }

    static async findById(id) {
        return (await db).collection("RECIPE").find({ _id: new ObjectId(id) }).toArray()
    }
}
