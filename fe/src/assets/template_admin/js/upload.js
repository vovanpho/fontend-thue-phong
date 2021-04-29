import { PATH, requestHeader } from "../../../index/index.js";
class UploadFilesService {
  upload(file, onUploadProgress){
    let formDate = new FormData();
    formDate.append("file",file);
    // return fetch(`${PATH}api/upload`,{
    //     method:"POST",
    //     headers:{
    //       "Content-Type": "multipart/form-data",
    //       'Authorization':`Bearer ${localStorage.getItem('accessToken')}`
    //     },
    //     body:formDate,
    //     onUploadProgress
    // })
  };
  async getFiles(){
    const response = await fetch(`${PATH}api/files`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return function () { console.log(response.data); };
  }
}
export default new UploadFilesService();