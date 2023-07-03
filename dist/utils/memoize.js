"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function memoize(func, resolver) {
    if (typeof func !== "function" ||
        (resolver != null && typeof resolver !== "function")) {
        throw new TypeError("Expected a function");
    }
    const memoized = (...args) => {
        const key = resolver ? resolver.apply(this, args) : args[0];
        const cache = memoized.cache;
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
    };
    memoized.cache = new (memoize.Cache || Map)();
    return memoized;
}
memoize.Cache = Map;
exports.default = memoize;
