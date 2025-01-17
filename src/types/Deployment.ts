import { User } from "./user";

interface InstanceConfig {
    type: string;
}

// Define the Model interface that extends Document
export interface Deployment extends Document {
    _id:string;
    model_id: string;
    user: User;
    instance_config: InstanceConfig;
    endpoint_name: string;
    status: string
}