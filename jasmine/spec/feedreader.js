$(function () {
    //Suite to test the RSS feeds 
    describe('RSS Feeds', function () {
        //allFeeds has been defined
        it('RSS feeds have been defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        //allFeeds should have URLs and the URLs should not be empty
        it('have URLs and the URLs are not empty', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });
        //allFeeds should have a name and the name should not be empty 
        it('have names and the names are not empty', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    //Suite to test the menu
    describe('The Menu', function () {
        //The menu icon is hidden by default 
        it('menu is not visible by default', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
        //Check the click event
        it('toggle is working on click event', function () { 
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    //Suite to test the initial entries
    describe('Initial Entries', function () {
        //A test to ensure when the loadFeed function is called an asynchronous request has been triggered 
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        //A test to ensure loadFeed function has at least a single '.entry' within the '.feed' container
        it('feed contains at least a single entry element', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    //A test to ensure new feed has been loaded
    describe('New Feed Selection', function() {
        var feedContainer = $('.feed'),
            firstContainer,
            secondContainer;
        
        // A test to ensure that the new feed is loaded via the loadFeed function
		beforeEach(function(done) {
            loadFeed(0, function() {
                firstContainer = feedContainer.html();
                loadFeed(1, function() {
                    secondContainer = feedContainer.html();
                    done();
                });
            });        
         });
        // Tests to see if two entries are not equal
		it('when a new feed has been loaded content changes', function() {
            expect(firstContainer).not.toEqual(secondContainer);
        }); 
	});
}());
