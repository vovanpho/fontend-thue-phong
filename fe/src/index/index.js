function requestHeader(){
    return {
        headers:new Headers({
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem('accessToken')}`
        })
    }
}
export const PATH = "http://localhost:8080/";
export {requestHeader};