(function (global) {
    System.config({
        paths: {            
            'npm:': 'node_modules/',
            'wistia':'npm:wistia/vendor/e-v1.js'
        },
        map: {
            wwwroot: 'wwwroot',
        },
        packages: {
            '.': {
                defaultExtension: 'js'
            }
        }
    });
})(this);