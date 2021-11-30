// import axios from "axios";

// export function makePost(url, body) {
//     const config = {
//         headers: {
//             "X-Auth-Token": localStorage.getItem("token")
//         }
//     }
//     try {
//         //const response = await axios.post(url, body, config);
//         //return response.data;
//     } catch (err) {
//         return undefined;
//     }
// }


export const config = {
    headers: {
        "X-Auth-Token": localStorage.getItem("token")
    }
}
