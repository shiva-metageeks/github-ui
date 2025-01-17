import { ICommon } from "./ICommon";

export interface Space extends ICommon{
  sdk: 'streamlit' | 'gradio' | 'docker' | 'static';
  sdk_template: string,
  hardware_type: string;
  deployed_url?: string;
  status:string;
}