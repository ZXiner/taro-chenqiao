import CryptoJS from 'crypto-js/crypto-js'

function encryption(data) {
    // let strs = [];
    // for (let i in data) { strs.push(i + '=' + data[i]); }
    // strs.sort(); // 数组排序
    // strs = strs.join('&'); // 数组变字符串
    // let endData = strs + '&sign=' + CryptoJS.MD5(strs + 'ADfj3kcadc2349akvm1CPFFCD84f').toString(); // MD5加密
    // let key = CryptoJS.enc.Utf8.parse("0880076B18D7EE81"); // 加密秘钥
    // let iv = CryptoJS.enc.Utf8.parse("CB3EC842D7C69578"); //  矢量
    // let encryptResult = CryptoJS.AES.encrypt(endData, key, { //  AES加密
    //     iv: iv,
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7 // 后台用的是pad.Pkcs5,前台对应为Pkcs7
    // });
    //
    // return encodeURIComponent(CryptoJS.enc.Base64.stringify(encryptResult.ciphertext));  // Base64加密再 encode;

    let key = '3132333435363738393041424344454631323334353637383930414243444566';
    console.log('密钥：', key);
    key = CryptoJS.enc.Hex.parse(key);

    let iv = '30313233343536373839414243444546';
    console.log('偏移量：', iv);
    iv = CryptoJS.enc.Hex.parse(iv);

    console.log('原数据：', data);

    if(typeof data ==='object'){
        data = JSON.stringify(data);
    }
    let enc = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    debugger
    let enced = enc.ciphertext.toString();
    console.log("加密：", enced);
    return enced;
}

function decryption(data) {
    // let key = CryptoJS.enc.Utf8.parse("0880076B18D7EE81");  // 加密秘钥
    // let iv = CryptoJS.enc.Utf8.parse("CB3EC842D7C69578");   //  矢量
    // let baseResult = CryptoJS.enc.Base64.parse(data);   // Base64解密
    // let ciphertext = CryptoJS.enc.Base64.stringify(baseResult);     // Base64解密
    // let decryptResult = CryptoJS.AES.decrypt(ciphertext, key, { // AES解密
    //     iv: iv,
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7
    // });
    // let resData = decryptResult.toString(CryptoJS.enc.Utf8).toString();
    // return JSON.parse(resData);

    let key = '3132333435363738393041424344454631323334353637383930414243444566';
    console.log('密钥：', key);
    key = CryptoJS.enc.Hex.parse(key);

    let iv = '30313233343536373839414243444546';
    console.log('偏移量：', iv);
    iv = CryptoJS.enc.Hex.parse(iv);

    let dec = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(data), key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    debugger
    let decStr =  CryptoJS.enc.Utf8.stringify(dec);
    console.log('解密:',JSON.parse(decStr));
}

export {encryption, decryption};
