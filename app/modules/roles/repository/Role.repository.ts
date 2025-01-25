
import { AbstractClass } from "../../../helper/abstractClass/AbstractClass.repository.js";
import { RoleDocument } from "../../../interface/RoleInterface.js";
import Role from "../models/Role.model.js";


export class RoleRepository extends AbstractClass<RoleDocument> {
    constructor() {
      super(Role); // Pass the Role model to the abstract class
    }
  
    // Additional methods specific to Role can be added here
  }