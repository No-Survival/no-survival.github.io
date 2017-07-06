module.exports = function(priority, early,value,isMultiply,resource) {
        this.value = value;
        this.multiply = isMultiply?true:false;
        this.resource = resource;
        this.priority = priority;
        this.early = early;
}
