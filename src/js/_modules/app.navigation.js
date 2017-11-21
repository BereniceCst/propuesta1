/**
 * Menu Plugin
 **/
$.fn.extend({

    /**
     * pass the options variable to the function
     *
     *   $(id).navigation({ 
     *       accordion: true,
     *       animate: 'easeOutExpo',
     *       speed: 200,
     *       closedSign: '[+]',
     *       openedSign: '[-]'
     *   });
     *
     **/
    navigation: function(options) {

        var defaults = {
                accordion: true,
                animate: 'easeOutExpo',
                speed: 200,
                closedSign: '[+]',
                openedSign: '[-]'
            },

            /**
             * extend our default options with those provided.
             **/
            opts = $.extend(defaults, options),

            /**
             * assign current element to variable, in this case is UL element
             **/
            self = $(this);

        if (!self.hasClass(myapp_config.navInitalized)) {

            /**
             * confirm build to prevent rebuild error
             **/
            self.addClass(myapp_config.navInitalized);

            /**
             * add a mark [+] to a multilevel menu
             **/
            self.find("li").each(function() {
                if ($(this).find("ul").length !== 0) {

                    /**
                     * add the multilevel sign next to the link
                     **/
                    $(this).find("a:first").append("<b class='collapse-sign'>" + opts.closedSign + "</b>");

                    /**
                     * avoid jumping to the top of the page when the href is an #
                     **/
                    if ($(this).find("a:first").attr('href') == "#") {
                        $(this).find("a:first").click(function() {
                            return false;
                        });
                    }
                }
            });

            /**
             * add open sign to all active lists
             **/
            self.find("li.active").each(function() {
                $(this).parents("ul")
                	.parent("li")
                	.find("a:first")
                	.attr('aria-expanded', true)
                	.find("b:first")
                	.html(opts.openedSign);
            });

            /**
             * click events
             **/
            self.find("li a").on('mousedown', function(e) {

                if ($(this).parent().find("ul").length !== 0) {

                    if (opts.accordion) {

                        /**
                         * do nothing when the list is open
                         **/
                        if (!$(this).parent().find("ul").is(':visible')) {

                            parents = $(this).parent().parents("ul");
                            visible = self.find("ul:visible");
                            visible.each(function(visibleIndex) {
                                var close = true;
                                parents.each(function(parentIndex) {

                                    if (parents[parentIndex] == visible[visibleIndex]) {

                                        close = false;
                                        return false;
                                    }
                                });
                                if (close) {

                                    if ($(this).parent().find("ul") != visible[visibleIndex]) {

                                        $(visible[visibleIndex]).slideUp(opts.speed + 300, opts.animate, function() {
                                            $(this).parent("li")
                                            	.removeClass("open")
                                            	.find("a:first")
                                            	.attr('aria-expanded', false)
                                            	.find("b:first")
                                            	.html(opts.closedSign);

                                            if (myapp_config.debugState)
                                                console.log("nav item closed")    
                                        });
                                    }
                                }
                            });
                        }
                    }

                    /**
                     * Add active class to open element
                     **/
                    if ($(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active")) {

                        $(this).parent().find("ul:first").slideUp(opts.speed + 100, opts.animate, function() {
                            $(this).parent("li")
                            	.removeClass("open")
                            	.find("a:first")
                            	.attr('aria-expanded', false)
                            	.find("b:first").delay(opts.speed)
                            	.html(opts.closedSign);

                            if (myapp_config.debugState)
                                console.log("nav item closed")
                        });
                    } else {
                        $(this).parent().find("ul:first").slideDown(opts.speed, opts.animate, function() {

                            $(this).parent("li")
                            	.addClass("open")
                            	.find("a:first")
                            	.attr('aria-expanded', true)
                            	.find("b:first").delay(opts.speed)
                            	.html(opts.openedSign);

                            if (myapp_config.debugState)
                                console.log("nav item opened");


                            /* bug fixed: addresses the .mod-main-boxed class bug, when nav exceeds content height */
                            if (myapp_config.root_.hasClass("mod-main-boxed")) {
                                initApp.fixAppHeight();
                            }
                        });
                    }
                }
            });    

        } else {
            
            if (myapp_config.debugState)
                console.log(" this menu already exists");       
        }

    },

    /**
     * DOC: $(id).destroy();
     **/
    destroy: function() {
        self = $(this);
        if (self.hasClass(myapp_config.navInitalized)) {
            self.find("li").removeClass("active open");
            self.find("li a").off('mousedown').removeClass("active").removeAttr("aria-expanded").find(".collapse-sign").remove();
            self.removeClass(myapp_config.navInitalized).find("ul").removeAttr("style");
        }
    }
}); 
