// Initialize your app
var myApp = new Framework7({
    init: false,
    swipeBackPage: true,
    router: true,
    animateNavBackIcon: true,
    cache: false,
    precompileTemplates: true,
    template7Pages: true,
    statusbarOverlay: false,
    animatePages: true
});
var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true
});


var locStor = {         //Для упрощенного обращения
    set: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: function (key) {
        return JSON.parse(localStorage.getItem(key));
    }
};

myApp.onPageBeforeAnimation('*', function (page) {
    switch (page.url) {
        case '#drag-and-drop':
            $$('.controlBtn[data-control="check"]').parent().prev().attr('readonly', true);
            $$('.controlBtn[data-control="check"]').attr('data-control', 'edit');
            break;
        case '#charts':
            $$('.tab-link').removeClass('active');
            $$('.tab-link[href="#tab1"]').addClass('active');
            myApp.showTab('#tab1');
            charts.buildCharts();
            break;
    }
});

/* start pages */

myApp.onPageInit('index', function (page) {

    $$('.menuList li').on('click', function(){
        mainView.router.load({pageName:$$(this).dataset().link});
    });

});

var index = {
    firstCome: function () {
        if(!locStor.get('jkh_all')){
            var obj;
            obj = {
                list: [
                    {
                        title: 'Item 1',
                        pozition: '0'
                    },
                    {
                        title: 'Item 2',
                        pozition: '1'
                    },
                    {
                        title: 'Item 3',
                        pozition: '2'
                    },
                    {
                        title: 'Item 4',
                        pozition: '3'
                    },
                    {
                        title: 'Item 5',
                        pozition: '4'
                    }
                ]
            };
            locStor.set('jkh_all', obj);
        }
    }
};

/* end pages */

document.addEventListener('DOMContentLoaded', ready, false);

function ready() {
    index.firstCome();
}

myApp.init();
