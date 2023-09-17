import api from '../axios';

let url = {
    listUsers: '/users',
    detailUser: '/users/profile',
    createUser: '/users/register',
    updateUser: '/users/',
    deleteUser: '/user/',
    enableUsers: '/users/enabled_users',
}

class UsersService {
    
    async listUsers() {
        try {
            const response = await api.get(url.listUsers);

            return {
                status: response.status, 
                data: response.data
            }
            
        } catch (error) {
            return {
                status: false, 
                data: error.response.data
            };
        }
    }

    async detailUser() {
        try {
            const response = await api.get(`${url.detailUser}`);

            return {
                status: response.status, 
                data: response.data
            }
        } catch (error) {
            return {
                status: false, 
                data: error.response.data
            };
        }
    }

    async createUser(params) {
        try {
            
            const response = await api.post(url.createUser, params);

            return {
                status: response.status, 
                data: response.data
            }
        } catch (error) {
            return {
                status: false, 
                data: error.response.data
            };
        }
    }

    async updateUser(id, params) {
        try {
           
            const response = await api.put(`${url.updateUser}`, {id, ...params});

            return {
                status: response.status, 
                data: response.data
            }
        } catch (error) {
            return {
                status: false, 
                data: error.response.data
            };
        }
    }

    async deleteUser(id) {
        try {
            const response = await api.delete(`${url.deleteUser}/${id}`);

            return {
                status: response.status, 
                data: response.data
            }
        } catch (error) {
            return {
                status: false, 
                data: error.response.data
            };
        }
    }

    async enableUsers() {
        try {
            const response = await api.get(`${url.enableUsers}`);

            return {
                status: response.status, 
                data: response.data
            }
        } catch (error) {
            return {
                status: false, 
                data: error.response.data
            };
        }
    }

}

export default new UsersService();