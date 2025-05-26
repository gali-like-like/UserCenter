import {ElMessage} from "element-plus";

const message = (msg,type) => {
    ElMessage({
        message: msg,
        type: type,
    })
}
export default message;
