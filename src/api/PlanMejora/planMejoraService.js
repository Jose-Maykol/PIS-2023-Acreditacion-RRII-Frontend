import api from '../axios';

let url = {
    read: '/2023/A/plans',
    create: '/2023/A/plans',
    delete: '/plan/',
    update: '/plan/',
    readUser: '/2023/A/plans/users',
}

class PlanMejoraService {
    
    async read() {
        try {
            const response = await api.get(url.read);
            return response.data;
            
        } catch (error) {
            return error.response.data
        }
    }

    async readUser() {
        try {
            const response = await api.get(url.readUser);
            return response.data;
            
        } catch (error) {
            return error.response.data
        }
    }

    async create(params) {
        try {
            const response = await api.post(url.create, params);
            return {
                status: true,
                data: response.data
            }
        } catch (error) {
            return {
                status: false,
                data: error.response.data
            }
        }
    }

    async delete(id) {
        try {
            const response = await api.delete(url.delete + `${id}/`);
            return {
                status: true,
                data: response.data
            }
        } catch (error) {
            return {
                status: false,
                data: error.response.data
            }
        }
    }

    async update(id, params) {
        try {
            const response = await api.put(url.update + `${id}/`, params);
            return {
                status: true,
                data: response.data
            }
        } catch (error) {
            return {
                status: false,
                data: error.response.data
            }
        }
    }
}


export default new PlanMejoraService();