/**
 * SFCollectionAnalyzer
 * JavaScript module to convert CollectionType of Symfony to HTML template
 *
 */
var SFCollectionAnalyzer = (function () {
    var inputs = ['input', 'select', 'checkbox', 'radio', 'textarea'];

    /**
     * Decompose collection dom to children
     * @param dom
     * @returns array of doms
     */
    function decompose(dom) {
        var data = [];
        for(var i in inputs){
            dom.find(inputs[i]).each(function(i) {
                item = {
                    name: $(this).attr('data-name'),
                    dom: $(this)
                };
                data[$(this).attr('data-name')] = $(this);
            });
        }
        return data;
    }

    /**
     * Build template
     * @param dom
     * @returns string
     */
    function build (dom, template) {
        var data = decompose(dom);
        for (var k in data){
            if (data.hasOwnProperty(k)) {
                html = domToHTML(data[k]);
                template = template.replace('#'+k+'#', html);
            }
        }
        return template;
    }

    /**
     * Convert dom to html
     * @param dom
     * @returns html
     */
    function domToHTML(dom) {
        return dom.clone().wrap('<div/>').parent().html()
    }

    return {
        buildTemplate: function (dom, template) {
            return build(dom, template);
        }
    }

})();