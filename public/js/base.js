"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj
}
: function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
}
;
function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i]
        }
        return arr2
    } else {
        return Array.from(arr)
    }
}
(function($) {
    var errorMessage = "This feature requires options in order to work, please check the documention.";
    var checkCallback = function checkCallback(options, callback) {
        if ($.isFunction(options)) {
            callback = options
        }
        return callback
    };
    var checkOptions = function checkOptions(options, optionsRequired) {
        var optionsValue = (typeof options === "undefined" ? "undefined" : _typeof(options)) === "object" ? $.isEmptyObject(options) === false : options !== undefined;
        if (optionsRequired && optionsValue) {
            return true
        } else if (optionsRequired === false) {
            return true
        }
    };
    $.fn.inView = function(options, callback) {
        var optionsChecked = checkOptions(options, false)
          , updatedCallback = optionsChecked ? checkCallback(options, callback) : false
          , callbackIsValid = typeof updatedCallback === "function"
          , self = this;
        var inViewEffect = function inViewEffect() {
            var $currentScrollPosition = $(window).scrollTop()
              , $windowHeight = $(window).height()
              , topTargetPosition = self.offset().top
              , bottomTargetPosition = self.outerHeight() + topTargetPosition
              , bufferAmount = typeof options === "function" ? 0 : options[Object.keys(options)[0]]
              , buffer = $windowHeight * bufferAmount
              , topTriggerPoint = topTargetPosition - buffer
              , alreadyRun = self.attr("data-functioncomplete") == "1"
              , fireAfter = options[Object.keys(options)[1]] === undefined ? false : options[Object.keys(options)[1]];
            if (optionsChecked) {
                if (callbackIsValid) {
                    if (fireAfter && $currentScrollPosition >= topTriggerPoint && !alreadyRun) {
                        self.attr("data-functioncomplete", "1");
                        updatedCallback.call(self)
                    }
                    if ($currentScrollPosition >= topTriggerPoint && $currentScrollPosition <= bottomTargetPosition && !alreadyRun) {
                        self.attr("data-functioncomplete", "1");
                        updatedCallback.call(self)
                    }
                }
            } else {
                console.error(errorMessage)
            }
        };
        (function triggerInView() {
            $(window).on("load", function() {
                inViewEffect()
            });
            $(window).on("scroll", function() {
                inViewEffect()
            })
        }
        )()
    }
    ;
    $.fn.breakpoint = function(options, callback, callback2, callback3) {
        var optionsChecked = checkOptions(options, true)
          , minTrigger = options.minWidth
          , hasMin = minTrigger !== undefined
          , maxTrigger = options.maxWidth
          , hasMax = maxTrigger !== undefined
          , minOnly = hasMin && !hasMax
          , maxOnly = !hasMin && hasMax
          , callbackIsValid = typeof callback === "function"
          , callback2IsValid = typeof callback === "function"
          , callback3IsValid = typeof callback === "function"
          , self = this;
        var breakpointEffect = function breakpointEffect() {
            var currentWindowSize = $("html").hasClass("no-touchevents") ? $(window).innerWidth() : $(window).outerWidth();
            if (optionsChecked) {
                if (callbackIsValid) {
                    if (minOnly) {
                        if (currentWindowSize >= minTrigger) {
                            callback.call(self)
                        } else if (callback2IsValid) {
                            callback2.call(self)
                        }
                    } else if (maxOnly) {
                        if (currentWindowSize <= maxTrigger) {
                            callback.call(self)
                        } else if (callback2IsValid) {
                            callback2.call(self)
                        }
                    } else {
                        if (currentWindowSize >= minTrigger && currentWindowSize <= maxTrigger) {
                            callback.call(self)
                        } else if (currentWindowSize >= minTrigger) {
                            if (callback2IsValid) {
                                callback2.call(self)
                            }
                        } else if (currentWindowSize <= maxTrigger) {
                            if (callback3IsValid) {
                                callback3.call(self)
                            }
                        }
                    }
                }
            } else {
                console.error(errorMessage)
            }
        };
        (function triggerBreakpoint() {
            $(window).on("load", function() {
                breakpointEffect()
            });
            $(window).on("resize", function() {
                breakpointEffect()
            })
        }
        )()
    }
    ;
    $.fn.onOrientation = function(options, callback, callback2) {
        var optionsChecked = checkOptions(options, true)
          , optionValue = options
          , callbackIsValid = typeof callback === "function"
          , self = this;
        var onOrientationEffect = function onOrientationEffect() {
            var orientationAngle = screen.orientation === undefined ? window.orientation : screen.orientation.angle
              , currentOrientation = orientationAngle === 90 ? "landscape" : "portrait";
            if (optionsChecked) {
                if (callbackIsValid) {
                    if (currentOrientation === optionValue) {
                        callback.call(self)
                    } else if (typeof callback2 === "function") {
                        callback2.call(self)
                    }
                }
            } else {
                console.error(errorMessage)
            }
        };
        (function triggetOnOrientation() {
            window.addEventListener("orientationchange", function() {
                onOrientationEffect()
            }, false)
        }
        )()
    }
    ;
    $.isDevice = function(options) {
        var optionsChecked = checkOptions(options, true), optionValue = options, mobileBreakpoint = 640, tabletBreakpoint = 991, checkResult, currentWindowSize;
        var checkDevice = function checkDevice() {
            if (optionsChecked) {
                currentWindowSize = $("html").hasClass("no-touchevents") ? $(window).outerWidth() - 17 : $(window).outerWidth();
                if (optionValue === "mobile") {
                    if (currentWindowSize <= mobileBreakpoint) {
                        checkResult = true
                    } else {
                        checkResult = false
                    }
                } else if (optionValue === "tablet") {
                    if (currentWindowSize > mobileBreakpoint && currentWindowSize <= tabletBreakpoint) {
                        checkResult = true
                    } else if (currentWindowSize > tabletBreakpoint && $("html").hasClass("touchevents")) {
                        checkResult = true
                    } else {
                        checkResult = false
                    }
                } else if (optionValue === "desktop") {
                    if (currentWindowSize > tabletBreakpoint) {
                        checkResult = true
                    } else {
                        checkResult = false
                    }
                }
                return checkResult
            } else {
                console.error(errorMessage)
            }
        };
        checkResult = checkDevice();
        return checkResult
    }
    ;
    $.fn.cssEventsComplete = function(options, callback) {
        var optionsChecked = checkOptions(options, false), noOptions = typeof options === "function", eventToWatch, target, updatedCallback = optionsChecked ? checkCallback(options, callback) : false, callbackIsValid = typeof updatedCallback === "function", self = this;
        var cssEventsCompleteCheck = function cssEventsCompleteCheck() {
            if (optionsChecked) {
                if (callbackIsValid) {
                    target = self[0];
                    if (noOptions) {
                        eventToWatch = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd"
                    } else if (options == "transition") {
                        eventToWatch = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"
                    } else if (options == "animation") {
                        eventToWatch = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd"
                    }
                    $(target).bind(eventToWatch, function() {
                        updatedCallback.call(self)
                    })
                } else {
                    console.error(errorMessage)
                }
            }
        };
        (function triggerCssEventsComplete() {
            $(document).ready(function() {
                cssEventsCompleteCheck()
            })
        }
        )()
    }
    ;
    $.queryString = function(options) {
        var optionsChecked = checkOptions(options, false), querystring = window.location.search.slice(1), hashValues = window.location.hash.substr(1), optionValue = options, queryStingResults, completeQueryContent = {}, defaultDivider = "&", customDivider = optionValue === undefined ? false : optionValue, defaultParts = querystring.indexOf(defaultDivider) > 0 ? querystring.split(defaultDivider) : 0;
        var attachDefaultParts = function attachDefaultParts() {
            var i = 0, thisDefaultPart, updatedDefaultPart, defaultPartList = [], $hasNoDivider = querystring.indexOf(defaultDivider) <= 0 && querystring.indexOf(customDivider) < 0;
            if (defaultParts.length > 0) {
                for (i; i < defaultParts.length; i++) {
                    thisDefaultPart = defaultParts[i];
                    updatedDefaultPart = thisDefaultPart.indexOf(customDivider) > 0 ? thisDefaultPart.substr(0, thisDefaultPart.indexOf(customDivider)) : thisDefaultPart;
                    defaultPartList.push(updatedDefaultPart)
                }
                completeQueryContent.defaultdivider = defaultPartList
            } else if ($hasNoDivider) {
                completeQueryContent.defaultdivider = [querystring]
            }
        };
        var attachCustomParts = function attachCustomParts() {
            var i = 0, thisCustomPart, updatedCustomerPart, customParts, customPartList = [], updatedQuerystring;
            if (customDivider && querystring.indexOf(customDivider) > 0) {
                updatedQuerystring = querystring.indexOf(defaultDivider) > 0 ? querystring.substr(querystring.indexOf(customDivider) + 1, querystring.length) : querystring;
                customParts = updatedQuerystring.split(customDivider);
                for (i; i < customParts.length; i++) {
                    thisCustomPart = customParts[i];
                    updatedCustomerPart = thisCustomPart.indexOf(defaultDivider) > 0 ? thisCustomPart.substr(0, thisCustomPart.indexOf(defaultDivider)) : thisCustomPart;
                    customPartList.push(updatedCustomerPart)
                }
                completeQueryContent.customdivider = customPartList
            }
        };
        var attachHashParts = function attachHashParts() {
            if (hashValues.length > 0) {
                completeQueryContent.hashvalue = hashValues
            }
        };
        var getQueryString = function getQueryString() {
            if (optionsChecked) {
                if (querystring) {
                    attachDefaultParts();
                    attachCustomParts();
                    attachHashParts();
                    return completeQueryContent
                }
            } else {
                console.error(errorMessage)
            }
        };
        queryStingResults = getQueryString();
        return queryStingResults
    }
    ;
    $.gACustomEvents = function(options) {
        var optionsChecked = checkOptions(options, false);
        var gACustomEventsSendEvent = function gACustomEventsSendEvent() {
            var categoryName, categoryAction, categoryLabel;
            if (optionsChecked) {
                categoryName = options.category;
                categoryAction = options.action;
                categoryLabel = options.label;
                ga("send", {
                    hitType: "event",
                    eventCategory: categoryName,
                    eventAction: categoryAction,
                    eventLabel: categoryLabel
                })
            } else {
                console.error(errorMessage)
            }
        };
        (function triggerGoogleAnalytics() {
            gACustomEventsSendEvent()
        }
        )()
    }
}
)(jQuery);
var CHEN = function(module, $) {
    module.objectFit = function() {
        var $objectFitItems = $(".js-object-fit")
          , browserIsIe = void 0;
        var checkBrowser = function checkBrowser() {
            var userAgent = window.navigator.userAgent
              , isIe = userAgent.indexOf("Trident/") > 0 || userAgent.indexOf("Edge/") > 0;
            return isIe
        };
        var objectFitEffect = function objectFitEffect($thisItem) {
            var $windowHeight = $(window).outerHeight()
              , $windowWidth = $(window).outerWidth()
              , $thisItemHeight = $($thisItem).outerHeight()
              , $thisItemWidth = $($thisItem).outerWidth();
            $($thisItem).addClass("object-fit-fallback");
            if ($thisItemHeight < $windowHeight) {
                $($thisItem).css("width", $windowWidth * 1.6 + "px")
            } else if ($thisItemWidth < $windowWidth) {
                $($thisItem).css("height", $windowHeight + "px")
            }
        };
        var objectFitWatch = function objectFitWatch() {
            var $thisItem = void 0;
            for (var i = 0; i < $objectFitItems.length; i++) {
                $thisItem = $objectFitItems[i];
                objectFitEffect($thisItem);
                $(window).on("resize", function() {
                    objectFitEffect($thisItem)
                })
            }
        };
        var scanDom = function scanDom() {
            browserIsIe = checkBrowser();
            $objectFitItems = $(".js-object-fit");
            if ($objectFitItems.length > 0 && browserIsIe) {
                objectFitWatch()
            }
        };
        (function init() {
            browserIsIe = checkBrowser();
            if (browserIsIe) {
                objectFitWatch()
            }
            setTimeout(function() {
                scanDom()
            }, 500)
        }
        )()
    }();
    return module
}(CHEN || {}, jQuery);

var CHEN = function(module, $) {
    module.overlay = function() {
        var $overlays = $(".js-overlay-target")
          , $overlayTriggers = $(".js-overlay-trigger")
          , activeClass = "active"
          , frozenClass = "frozen"
          , $theBody = $("body");
        var triggerOpenOverlay = function triggerOpenOverlay($thisOverlayTrigger, $thisOverlayTarget) {
            var $isActive;
            $thisOverlayTrigger.on("click", function() {
                $isActive = $(this).hasClass(activeClass);
                if (!$isActive) {
                    $(this).addClass(activeClass);
                    $thisOverlayTarget.addClass(activeClass);
                    $theBody.addClass(frozenClass)
                }
            })
        };
        var triggerCloseOverlay = function triggerCloseOverlay($thisOverlayClose) {
            var $thisParent, $thisParentId, $thisOverlayTriggerElement;
            $thisOverlayClose.on("click", function() {
                $thisParent = $(this).parents(".js-overlay-target");
                $thisParentId = $thisParent.attr("id");
                $thisOverlayTriggerElement = $overlayTriggers.filter("[data-overlay=" + $thisParentId + "]");
                $thisOverlayTriggerElement.removeClass(activeClass);
                $thisParent.removeClass(activeClass);
                $theBody.removeClass(frozenClass)
            })
        };
        var moveOverlayTarget = function moveOverlayTarget() {
            var $overlaysToMove = $overlays.filter("[data-move-overlay=\"true\"]");
            $theBody.append($overlaysToMove)
        };
        var overlaySetup = function overlaySetup() {
            var $thisOverlayTrigger, $thisOverlayTargetName, $thisOverlayTarget, $thisOverlayClose, index = 0;
            for (index; index < $overlayTriggers.length; index++) {
                $thisOverlayTrigger = $($overlayTriggers[index]);
                $thisOverlayTargetName = $thisOverlayTrigger.attr("data-overlay");
                $thisOverlayTarget = $overlays.filter("#" + $thisOverlayTargetName);
                $thisOverlayClose = $thisOverlayTarget.find(".js-overlay-close");
                triggerOpenOverlay($thisOverlayTrigger, $thisOverlayTarget);
                triggerCloseOverlay($thisOverlayClose)
            }
        };
        (function init() {
            if ($overlays.length > 0) {
                moveOverlayTarget();
                overlaySetup()
            }
        }
        )()
    }();
    return module
}(CHEN || {}, jQuery);
var CHEN = function(module, $) {
    module.swapOut = function() {
        var $swapoutElementTargets = $(".js-swapout-target");
        var triggerSwapOut = function triggerSwapOut() {
            var i = $swapoutElementTargets.length - 1
              , $thisTarget = void 0
              , $thisTargetParent = void 0;
            for (i; i >= 0; i--) {
                $thisTarget = $($swapoutElementTargets[i]);
                $thisTargetParent = $thisTarget.parents(".js-swapout");
                changeEffect($thisTarget, $thisTargetParent);
                watchChanges($thisTarget, $thisTargetParent)
            }
        };
        var changeEffect = function changeEffect($thisTarget) {
            var $thisTargetSwapUrl = $thisTarget.data("swapurl")
              , $thisTargetSwapType = $thisTarget.data("swaptype")
              , $thisTargetVideoControls = $thisTarget.data("video-controls")
              , $thisTargetVideoRepeat = $thisTarget.data("video-repeat") ? "loop" : ""
              , $thisTargetVideAutoplay = $thisTarget.data("video-autoplay") ? "autoplay" : ""
              , $thisTargetClasses = $thisTarget.attr("class")
              , $thisTargetClassesImage = $thisTargetClasses.length > 0 ? "class=\"" + $thisTargetClasses + "\"" : ""
              , $thisTargetClassesVideo = $thisTargetClasses.length > 0 ? "class=\"" + $thisTargetClasses.replace("js-swapout-target", "") + " js-swapout-replacement\"" : ""
              , $isDesktop = $(window).outerWidth() >= 992
              , $videoHtml = $("<video " + $thisTargetClassesVideo + " data-video-controls=\"" + $thisTargetVideoControls + "\" " + $thisTargetVideAutoplay + " " + $thisTargetVideoRepeat + " muted><source src=\"" + $thisTargetSwapUrl + "\" type=\"video/mp4\"></video>")
              , $imgHtml = $("<img " + $thisTargetClassesImage + " src=\"" + $thisTargetSwapUrl + "\">")
              , swapCode = $thisTargetSwapType === "video" ? $videoHtml : $imgHtml;
            if ($isDesktop && $thisTargetSwapUrl !== undefined) {
                $thisTarget.after(swapCode);
                $thisTarget.hide()
            }
        };
        var watchChanges = function watchChanges($thisTarget, $thisTargetParent) {
            var $swapReplacement = $thisTargetParent.find(".js-swapout-replacement")
              , $alreadyVisible = $swapReplacement.is(":visible");
            $thisTarget.breakpoint({
                minWidth: 992
            }, function() {
                $swapReplacement = $thisTargetParent.find(".js-swapout-replacement");
                $alreadyVisible = $swapReplacement.is(":visible");
                if ($swapReplacement.length > 0 && !$alreadyVisible) {
                    $(this).hide();
                    $swapReplacement.show()
                } else if (!$alreadyVisible) {
                    changeEffect($thisTarget, $thisTargetParent);
                    CHEN.playVideoInview.scanDom();
                    CHEN.objectFit.scanDom()
                }
            }, function() {
                $(this).show();
                $swapReplacement.hide()
            })
        };
        (function init() {
            if ($swapoutElementTargets.length > 0) {
                triggerSwapOut()
            }
        }
        )()
    }();
    return module
}(CHEN || {}, jQuery);
var CHEN = function(module, $) {
    module.smoothScroll = function() {
        var triggerSmoothScroll = function triggerSmoothScroll() {
            var $smoothTriggers = $(".js-smoothscroll");
            $smoothTriggers.on("click", function(event) {
                var $thisTrigger = $(this)
                  , $thisTriggerHref = $thisTrigger.attr("href")
                  , $thisTarget = $($thisTriggerHref)
                  , $thisTargetPosition = $thisTarget.offset().top;
                event.preventDefault();
                $("html, body").animate({
                    scrollTop: $thisTargetPosition
                }, 1000)
            })
        };
        (function init() {
            triggerSmoothScroll()
        }
        )()
    }();
    return module
}(CHEN || {}, jQuery);

var CHEN = function(module, $) {
    module.headerScroll = function() {
        var headerScrollToggleClass = function headerScrollToggleClass() {
            var $header = $("header"), originalScrollValue = 0, currentWindowScroll = 0, breakPoint = 100, direction, isActive;
            $(window).on("scroll", function() {
                currentWindowScroll = $(window).scrollTop();
                direction = currentWindowScroll > originalScrollValue ? "down" : "up";
                isActive = $header.hasClass("slide-up");
                if (direction === "down" && currentWindowScroll != originalScrollValue) {
                    if (currentWindowScroll > breakPoint && !isActive) {
                        $header.addClass("scrolled slide-up")
                    }
                } else if (currentWindowScroll != originalScrollValue) {
                    $header.removeClass("slide-up");
                    if (currentWindowScroll < breakPoint) {
                        $header.removeClass("scrolled")
                    }
                }
                originalScrollValue = currentWindowScroll
            })
        };
        (function init() {
            headerScrollToggleClass()
        }
        )()
    }();
    return module
}(CHEN || {}, jQuery);
var CHEN = function(module, $) {
    module.reveal = function() {
        var $revealContent = $(".js-reveal-target")
          , $revealTrigger = $(".js-reveal-trigger")
          , $viewAllText = $(".js-reveal-trigger .view-all")
          , $viewLessText = $(".js-reveal-trigger .view-less")
          , activeClass = "active";
        var triggerReveal = function triggerReveal() {
            $viewLessText.hide();
            $revealTrigger.on("click", function() {
                $revealContent.slideToggle("fast");
                $(this).toggleClass(activeClass);
                if ($(this).hasClass(activeClass)) {
                    $viewAllText.hide();
                    $viewLessText.show()
                } else {
                    $viewAllText.show();
                    $viewLessText.hide()
                }
            })
        };
        (function init() {
            triggerReveal()
        }
        )()
    }();
    return module
}(CHEN || {}, jQuery);
var CHEN = function(module, $) {
    module.searchBox = function() {
        var $searchBoxTriggers = $(".js-search-trigger")
          , $searchBoxItem = $(".js-search-box")
          , $searchBoxInput = $searchBoxItem.find("input")
          , $closeButton = $(".js-search-box-close")
          , activeClass = "active"
          , animationSpeed = 500;
        var searchBoxTrigger = function searchBoxTrigger() {
            var i = 0, $thisTrigger;
            for (i; i < $searchBoxTriggers.length; i++) {
                $thisTrigger = $($searchBoxTriggers[i]);
                $thisTrigger.on("click", function() {
                    var $isActive = $searchBoxItem.hasClass(activeClass);
                    if (!$isActive) {
                        $searchBoxItem.addClass(activeClass).slideDown(animationSpeed)
                    }
                })
            }
        };
        var searchBoxClose = function searchBoxClose() {
            $closeButton.on("click", function() {
                $searchBoxItem.removeClass(activeClass).slideUp(animationSpeed);
                $searchBoxInput.delay(animationSpeed).queue(function() {
                    $searchBoxInput.val("")
                })
            })
        };
        (function init() {
            searchBoxTrigger();
            searchBoxClose()
        }
        )()
    }();
    return module
}(CHEN || {}, jQuery);



var CHEN = function(module, $, TweenMax, CustomEase) {

    module.dotAnimation = function() {
        var $dotAnimationsElementsWrapper = $(".js-dot-icon-wrapper")
          , dotEase = CustomEase.create("custom", "M0,0,C0.204,0.098,0.2,1,1,1")
          , disabledClass = "disabled"
          , delayAmount = 400;
        var scaleEffect = function scaleEffect($thisSvgItem, $thisSvgItemsDots, $thisSvgItemsCircles, hoverIn) {
            for (var index = 0; index < $thisSvgItemsDots.length; index++) {
                var $thisItemDotElement = $($thisSvgItemsDots[index])
                  , $thisItemDotElementStartAmount = $thisItemDotElement.attr("data-start-amount")
                  , $thisItemDotElementEndAmount = $thisItemDotElement.attr("data-end-amount");
                if (hoverIn) {
                    TweenMax.to($thisItemDotElement, 0.5, {
                        ease: dotEase,
                        scale: $thisItemDotElementEndAmount,
                        transformOrigin: "center center"
                    })
                } else {
                    TweenMax.to($thisItemDotElement, 0.5, {
                        ease: dotEase,
                        scale: $thisItemDotElementStartAmount,
                        transformOrigin: "center center"
                    })
                }
            }
            for (var _index = 0; _index < $thisSvgItemsCircles.length; _index++) {
                var $thisItemCircleElement = $($thisSvgItemsCircles[_index])
                  , $thisItemCircleElementStartAmount = $thisItemCircleElement.attr("data-start-amount")
                  , $thisItemCircleElementEndAmount = $thisItemCircleElement.attr("data-end-amount");
                if (hoverIn) {
                    TweenMax.to($thisItemCircleElement, 0.5, {
                        ease: Power4.easeOut,
                        rotation: $thisItemCircleElementEndAmount,
                        transformOrigin: "center center"
                    })
                } else {
                    TweenMax.to($thisItemCircleElement, 0.5, {
                        ease: Power4.easeOut,
                        rotation: $thisItemCircleElementStartAmount,
                        transformOrigin: "center center"
                    })
                }
            }
        };
        var loadAnimation = function loadAnimation($thisSvgItem, $thisSvgItemsDots, $thisSvgItemsCircles, $associatedText) {
            for (var index = 0; index < $thisSvgItemsDots.length; index++) {
                var $thisItemDotElement = $($thisSvgItemsDots[index])
                  , $thisItemDotElementStartAmount = $thisItemDotElement.attr("data-start-amount")
                  , $thisItemDotElementEndAmount = $thisItemDotElement.attr("data-end-amount");
                TweenMax.to($thisItemDotElement, 0.5, {
                    ease: dotEase,
                    scale: $thisItemDotElementEndAmount,
                    transformOrigin: "center center"
                });
                TweenMax.to($thisItemDotElement, 0.5, {
                    delay: 0.75,
                    ease: dotEase,
                    scale: $thisItemDotElementStartAmount,
                    transformOrigin: "center center"
                })
            }
            for (var _index2 = 0; _index2 < $thisSvgItemsCircles.length; _index2++) {
                var $thisItemCircleElement = $($thisSvgItemsCircles[_index2]);
                TweenMax.to($thisItemCircleElement, 0.5, {
                    delay: 0.15,
                    ease: dotEase,
                    scale: 1,
                    transformOrigin: "center center"
                })
            }
            $associatedText.css("opacity", "1")
        };
        var triggerLoadAnimation = function triggerLoadAnimation($thisDotAnimationsWrapper, $thisDotAnimationsSvgs) {
            $thisDotAnimationsWrapper.inView({
                buffer: 0.55,
                firewhenbelow: true
            }, function() {
                $thisDotAnimationsWrapper.removeClass(disabledClass);
                var _loop3 = function _loop3(index) {
                    var $thisSvgItem = $($thisDotAnimationsSvgs[index])
                      , $thisSvgItemDelay = delayAmount + delayAmount * index
                      , $thisSvgItemsDots = $thisSvgItem.children(".dot-icon-dot").find("circle")
                      , $thisSvgItemsCircles = $thisSvgItem.children(".dot-icon-circle").find("circle")
                      , $associatedText = $thisSvgItem.siblings(".js-dot-text");
                    setTimeout(function() {
                        loadAnimation($thisSvgItem, $thisSvgItemsDots, $thisSvgItemsCircles, $associatedText)
                    }, $thisSvgItemDelay)
                };
                for (var index = 0; index < $thisDotAnimationsSvgs.length; index++) {
                    _loop3(index)
                }
            })
        };
        var watchHover = function watchHover($thisSvgItem, $thisSvgItemsDots, $thisSvgItemsCircles) {
            $thisSvgItem.hover(function() {
                var isDesktop = $.isDevice("desktop")
                  , disabled = $dotAnimationsElementsWrapper.hasClass(disabledClass);
                if (isDesktop && !disabled) {
                    scaleEffect($thisSvgItem, $thisSvgItemsDots, $thisSvgItemsCircles, true)
                }
            }, function() {
                var isDesktop = $.isDevice("desktop")
                  , disabled = $dotAnimationsElementsWrapper.hasClass(disabledClass);
                if (isDesktop && !disabled) {
                    scaleEffect($thisSvgItem, $thisSvgItemsDots, $thisSvgItemsCircles, false)
                }
            })
        };
        var setItems = function setItems($allElements) {
            for (var index = 0; index < $allElements.length; index++) {
                var $thisItem = $($allElements[index]);
                TweenMax.set($thisItem, {
                    scale: 0,
                    transformOrigin: "center center"
                })
            }
        };
        var dotAnimationsSetup = function dotAnimationsSetup() {
            for (var index = 0; index < $dotAnimationsElementsWrapper.length; index++) {
                var $thisDotAnimationsWrapper = $($dotAnimationsElementsWrapper[index])
                  , $thisDotAnimationsSvgs = $thisDotAnimationsWrapper.find(".js-dot-icon")
                  , isDesktop = $.isDevice("desktop");
                if (isDesktop) {
                    triggerLoadAnimation($thisDotAnimationsWrapper, $thisDotAnimationsSvgs)
                }
                for (var _index3 = 0; _index3 < $thisDotAnimationsSvgs.length; _index3++) {
                    var _$thisSvgItem = $($thisDotAnimationsSvgs[_index3])
                      , _$thisSvgItemsDots = _$thisSvgItem.children(".dot-icon-dot").find("circle")
                      , _$thisSvgItemsCircles = _$thisSvgItem.children(".dot-icon-circle").find("circle")
                      , $allElements = [].concat(_toConsumableArray(_$thisSvgItemsDots), _toConsumableArray(_$thisSvgItemsCircles));
                    if (isDesktop) {
                        setItems($allElements)
                    }
                    watchHover(_$thisSvgItem, _$thisSvgItemsDots, _$thisSvgItemsCircles)
                }
            }
        };
        (function init() {
            if ($dotAnimationsElementsWrapper.length > 0) {
                dotAnimationsSetup()
            }
        }
        )()
    }();
    return module
}(CHEN || {}, jQuery, TweenMax, CustomEase);
var CHEN = function(module, $) {
    module.menuIcon = function() {
        var $menuLink = $(".menu > li > a")
          , $subMenu = $(".menu .sub-nav")
          , subMenuLabel = "[aria-label=\"submenu\"]"
          , windowWidth = window.innerWidth;
        function showSubmenu(dropdown) {
            dropdown.attr("aria-hidden", "false")
        }
        ;function hideSubmenu(dropdown) {
            dropdown.attr("aria-hidden", "true")
        }
        ;function focusInSubmenu(target) {
            target.addClass("focus")
        }
        ;function focusOutSubmenu(target) {
            target.removeClass("focus")
        }
        ;if (windowWidth > 1023) {
            $subMenu.prev("a").attr("aria-haspopup", "true").append("<span aria-hidden=\"true\"> &#x25be;</span>");
            var $menuLinkHasSub = $("[aria-haspopup]");
            $menuLink.focus(function() {
                hideSubmenu($(subMenuLabel));
                focusOutSubmenu($(subMenuLabel).prev())
            });
            $menuLinkHasSub.on("mouseover focus", function() {
                showSubmenu($(this).next());
                focusInSubmenu($(this))
            });
            $menuLinkHasSub.parents("li").mouseleave(function() {
                hideSubmenu($(this).find(subMenuLabel));
                focusOutSubmenu($(this).find(subMenuLabel).prev())
            })
        } else {
            $subMenu.prev("a").attr("aria-haspopup", "true");
            showSubmenu($(subMenuLabel))
        }
    }();
    return module
}(CHEN || {}, jQuery);
//# sourceMappingURL=base.min.js.map


jQuery(document).ready(function($) {
	$('.js-slide-tabs-triggers .js-overlay-trigger').click(function() {
		$('.overlay').addClass('active');
		$( '#'+$(this).data('slide') ).trigger('click');
		if( $('html').attr('lang') == 'en-US' ) {
      		$('.brain-cards-slider .slick-slider').prepend('<span class="js-overlay-close overlay-close">Close<span class="close-icon"></span></span>');
    		}
    		else {
      		$('.brain-cards-slider .slick-slider').prepend('<span class="js-overlay-close overlay-close">关<span class="close-icon"></span></span>');
    		}
		$('.slick-slider .overlay-close').click(function() {
			$('.overlay').removeClass('active');
		});
	});
});

