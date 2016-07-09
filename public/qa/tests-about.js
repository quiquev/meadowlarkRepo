suite('"About" Page Tests', function(){
    test('Page should contain link to Contact page', function(){
        assert($('a[href="/contact"]').length);
    });
});
