export class FetchService {

    public constructor(private BACKEND_URL: string) {
    }

    async get<T>(url: string) {
        const response = await fetch(this.BACKEND_URL + url, {
            method: 'GET',
        });

        const result = await response.json() as APIResponse<T>

        return {status: response.status, response: response, data: result};
    }

    async post<T>(url: string, body: any) {
        const response = await fetch(this.BACKEND_URL + url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const result = await response.json() as APIResponse<T>

        return {status: response.status, response: response, data: result};
    }


    async delete<T>(url: string) {
        const response = await fetch(this.BACKEND_URL + url, {
            method: 'DELETE'
        });

        const result = await response.json() as APIResponse<T>

        return {status: response.status, response: response, data: result}
    }

    async download<T>(url: string) {
        const response = await fetch(this.BACKEND_URL + url, {
            method: 'GET',
        });

        return {status: response.status, response: response};
    }
}