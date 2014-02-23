if(document.documentElement.hasAttribute('sort-visualize-app')) {
    document.addEventListener('DOMContentLoaded', main);
}

function main() {
    var vm = window.vm = new ViewModel();
    ko.applyBindings(vm);
    vm.changed();
}
