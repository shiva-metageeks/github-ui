type InputParam = {
    type: "string" | "integer" | "number" | "file" | "boolean" | "select";
    id: string;
    title: string;
    description?: string;
    required?: boolean;
    min?: number; //for int and number
    max?: number; //for int and number
    default_value?: number | string;
    readonly?: boolean;
    options?: string[];
  };
  type IArenaModel = {
    title: string;
    model_id: string;
    total_runs: number;
    description?: string;
    display_image: string;
    inference_url?: string;
    private: boolean;
    category: string;
    owner: string;
    inputParams: InputParam[];
    license_link: string;
    github_link: string;
    cold_boot_status: string;
    default_output?: string[];
  };
  type LatestModelType = {
    title: string;
    total_runs: number;
    display_image: string;
    inference_url: string;
    private: boolean;
    category: string;
    owner: string;
    inputParams: InputParam[];
    license_link: string;
    github_link: string;
    cold_boot_status: string;
  };
  
  type FeaturedModelType = {
    title: string;
    total_runs: number;
    display_image: string;
    inference_url: string;
    private: boolean;
    category: string;
    owner: string;
    inputParams: InputParam[];
    license_link: string;
    github_link: string;
    cold_boot_status: string;
  };
  
  export type { LatestModelType, FeaturedModelType, IArenaModel, InputParam };
  