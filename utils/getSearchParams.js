export default function getSearchParams(params) {
    let args = {};
    if (typeof window === 'undefined') return args;
    let query = params ? params.substring(1) : location.search.substring(1);
    let pairs = query.split("&");
    for (let i = 0; i < pairs.length; i++) {
        let pos = pairs[i].indexOf("=");
        if (pos == -1) {
            continue;
        }
        let name = pairs[i].substring(0, pos);
        let value = pairs[i].substring(pos + 1);
        args[name] = decodeURIComponent(value);
    }
    return args;
}
