import { FilterQuery } from "mongoose";
import { CreationAttributes, Model, ModelStatic, WhereOptions, Attributes } from "sequelize";

// Define a base interface that includes the `id`
export interface BaseAttributes {
    id: number; // or string depending on your database configuration
}

// Define the abstract class
export abstract class AbstractClass<ModelType extends Model> {
    protected modelName: ModelStatic<ModelType>;

    constructor(model: ModelStatic<ModelType>) {
        this.modelName = model;
    }

    // Save a new instance of the model
    async save(data: CreationAttributes<ModelType>): Promise<ModelType> {
        try {
            const instance = await this.modelName.create(data);
            return instance;
        } catch (err) {
            throw err; // Handle error as appropriate
        }
    }

    // Get an instance by its ID
    async getById(id: number | string): Promise<ModelType | null> {
        try {
            const instance = await this.modelName.findByPk(id);
            return instance;
        } catch (error) {
            throw error; // Handle error as appropriate
        }
    }

    // Update an instance by its ID
    async updateById(data: Partial<ModelType>, Filterable:WhereOptions<ModelType>): Promise<ModelType | undefined> {
        try {
            const [numberOfAffectedRows, [updatedInstance]] = await this.modelName.update(data, {
                where: Filterable , // 'id' should now be recognized
                returning: true,
            });
            return updatedInstance; // Return the updated instance
        } catch (error) {
            throw error;
        }
    }

    // Get an instance by specific fields
    async getByField(params: WhereOptions<ModelType>): Promise<ModelType | null> {
        try {
            const instance = await this.modelName.findOne({ where: params,raw:true });
            return instance;
        } catch (error) {
            throw error; // Handle error as appropriate
        }
    };
    async getAllByField(params:WhereOptions<ModelType>):Promise<Array<ModelType>>{
        try{
            return this.modelName.findAll({where:params,raw:true})
        }catch(err){
            throw err;
        }
    };
    async deleteOne(params:WhereOptions<ModelType>):Promise<any>{
        try{
            return await this.modelName.destroy({where:params});

        }catch(err){
            throw err;
        }
    }

    // Bulk delete operation
    // async bulkDelete(ids: Array<number | string>): Promise<void> {
    //     try {
    //         await this.modelName.update({ isDeleted: true }, { where: { id: ids } });
    //     } catch (err) {
    //         throw err; // Handle error as appropriate
    //     }
    // }
}
