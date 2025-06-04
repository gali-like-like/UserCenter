async function calculateFileSHA256(file) {
    // 1. 读取文件为 ArrayBuffer
    const buffer = await file.arrayBuffer();

    // 2. 使用 Web Crypto API 计算 SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);

    // 3. 将结果转为十六进制字符串
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default calculateFileSHA256;

// // 使用示例
// const fileInput = document.querySelector('input[type="file"]');
// fileInput.addEventListener('change', async (e) => {
//     const file = e.target.files[0];
//     const sha256 = await calculateFileSHA256(file);
//     console.log('SHA-256:', sha256); // 输出：64位十六进制字符串
// });
