export class StringUtils {
    static isEmpty(string) {
        return !string || string.length === '';
    }

    static isBlank(string) {
        return StringUtils.isEmpty(string) || /^\s*$/.test(string);
    }

    static capitalize(string) {
        if(!StringUtils.isBlank(string)){
            return string[0].toUpperCase() + string.split('').splice(1).join('');
        }
    
        return string;
    };

    static capitalizeEach(string) {
        if(!StringUtils.isBlank(string)){
            return string.split(' ').map(word => StringUtils.capitalize(word)).join(' ');
        }
    
        return string;
    }
}

export class ObjectUtils {
    static isEmpty(object) {
        return !object || Object.keys(object).length === 0;
    }
}

export class ArrayUtils {
    static isEmpty(array) {
        return !array || array.length === 0;
    }
}