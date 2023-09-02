export default function CheckInternetConnection(){
    let status = navigator.onLine ? true : false;  
    return status;
}