export const serialize = function (obj, prefix) {
    var str = [],
        p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            // var k = prefix ? prefix + "[" + p + "]" : p,
            var k = prefix ? prefix  : p,
                v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    var result = str.join("&")
    return result.replace(/&&+/gi, '&')
}