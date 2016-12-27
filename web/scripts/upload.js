require.config({
    baseUrl: '/'
});

require(['dist/bundle'], function(umdLib) {

    var canvasUmd = umdLib.default;
    var fileSelect = document.querySelector('input[type="file"]');
    var pre = document.querySelector('pre');

    function readFile(fileObject, cb) {
        var reader = new FileReader();
        reader.onload = function(e) {
            cb(e.target.result);
        }
        reader.readAsText(fileObject);
    }

    function convertFile(fileObject) {
        var fileName = fileObject.name.match(/([\.\-\w]+)\.\w+?$/)[1];
        var umdConfig = {
            'module-name': fileName,
            'parse-labels': true
        };

        readFile(fileObject, function(fileContents) {
            var umd = canvasUmd(umdConfig).convert(fileContents);
            pre.textContent = umd;
        });
    }


    fileSelect.addEventListener('change', function(e) {
        convertFile(e.target.files.item(0));
    })
});