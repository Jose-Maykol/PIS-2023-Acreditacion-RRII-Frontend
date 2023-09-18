declare module '@/api/Estandar/estandarService.js' {
    import { AxiosResponse } from 'axios'
    import { ApiResponse } from '@/types/ApiResponse'
    export class EstandarService {
    	listEstandar(): Promise<{ status: boolean; data: any }>;
    	listEstandarValues(): Promise<{ status: boolean; data: any }>;
    	showEstandar(id: number): Promise<{ status: boolean; data: any }>;
    	updateEstandar(id: number, params: any): Promise<{ status: boolean; data: any }>;
    }

    const instance: EstandarService
    export default instance
  }