import {ElMessageBox} from "element-plus";

const messageBox = (title,context,type,fn) => {
    ElMessageBox.confirm(context, title,
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: type,
        }).then(fn).catch(() => {
            console.log(`${context} 被取消了`);
    });
}
export default messageBox;
