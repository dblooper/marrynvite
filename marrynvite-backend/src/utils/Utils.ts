const DICTIONARY = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");

export function generateUniqueKey() {
    let uniqueKey = '';
    for(let i = 0; i < 8; i++) {
        uniqueKey += DICTIONARY[Math.floor(Math.random()*(DICTIONARY.length - 1))]
    }
    return uniqueKey;
}