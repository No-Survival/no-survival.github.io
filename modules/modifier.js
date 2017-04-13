exports = function(priority, func, early) {
        this.modify = func;
        this.priority = priority;
        this.early = early;
}
