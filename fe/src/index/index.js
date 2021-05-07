function requestHeader(){
    return {
        headers:new Headers({
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem('accessToken')}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        })
    }
}
export const PATH = "http://localhost:8080/";
export {requestHeader};