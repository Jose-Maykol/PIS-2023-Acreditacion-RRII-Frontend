export interface Evidence {
    id: string;
    code: string;
    name: string;
    path: string;
    file?: string; //
    size?: string; //
    user_id: number;
    plan_id?: number | null; //
    folder_id?: number; //
    evidence_type_id: number;
    standard_id: number;
    date_id: number;
    created_at: string;
    updated_at: string;
    full_name: string;
    extension?: string; //
    type: string;
    parent_id?: number;
}

export interface Folder {
    id: number;
    name: string;
    path: string;
    user_id: number;
    parent_id: number;
    evidence_type_id: number;
    standard_id: number;
    date_id: number;
    created_at: string;
    updated_at: string;
    full_name: string;
    type: string;
}