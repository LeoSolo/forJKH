myApp.onPageInit('drag-and-drop', function (page) {
    dragDrop.buildList();
});

var dragDrop = {
    buildList: function(){
        var obj = locStor.get('jkh_all'),
            objAfterSort;

        $$('#sortableList').html('');

        var template,
            cont,
            html;

        obj.list.sort(function (a, b) {
            return a.position - b.position;
        });

        var new_obj = {
            lists: obj.list
        };

        template = '{{#each lists}}'+
            '<li data-index="{{@index}}">' +
                '<div class="item-content">' +
                    '<div class="item-inner">' +
                        '<input type="text" class="item-title" value="{{title}}" readonly>' +
                        '<div class="item-after">' +
                            '<div class="controlBtn" data-control="edit"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="sortable-handler"></div>' +
            '</li>' +
            '{{/each}}';

        cont = Template7.compile(template);

        html = cont(new_obj);

        $$('#sortableList').append(html);

        this.getControls();
    },
    getControls: function(){
        $$('.controlBtn').on('click', function(){
            var currentThis = this,
                obj = locStor.get('jkh_all'),
                currentInput = $$(this).parent().prev();

            switch ($$(this).dataset().control){
                case 'edit':
                    $$(currentThis).attr('data-control', 'check');
                    $$(currentInput).removeAttr("readonly");
                    $$(currentInput).focus();
                    break;
                case 'check':
                    $$(currentThis).attr('data-control', 'edit');
                    $$(currentInput).attr("readonly", true);
                    obj.list[$$(currentThis).parent().parent().parent().parent().dataset().index].title = $$(currentInput).val();
                    locStor.set('jkh_all', obj);
                    break;
            }
        });

        $$('#sortableList li').on('sort', function(){
            var obj = locStor.get('jkh_all');
            for(var i = 0; i < $$('#sortableList li').length; i++){
                obj.list[$$('#sortableList li').eq(i).dataset().index].position = i;
                $$('#sortableList li').eq(i).attr('data-index', i);
            }
            locStor.set('jkh_all', obj);
        });
    }
};
