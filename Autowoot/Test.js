/*
 Copyright (c) 2013-2017 by Tawi Jordan - ๖ۣۜĐJ - ɴᴇᴏɴ - TFL
 
 Permission to use this software for any purpose without fee is hereby granted, provided
 that the above copyright notice and this permission notice appear in all copies.
 
 Permission to copy and/or edit this software or parts of it for any purpose is permitted,
 provided that the following points are followed.
 - The above copyright notice and this permission notice appear in all copies
 - Within two (2) days after modification is proven working, any modifications are send back
   to the original authors to be inspected with the goal of inclusion in the official software
 - Any edited version are only test versions and not permitted to be run as a final product
 - Any edited version aren't to be distributed
 - Any edited version have the prerelease version set to something that can be distinguished
   from a version used in the original software
 
 
 TERMS OF REPRODUCTION USE
 
 Failure to follow these terms will result in me getting very angry at you
 and having your software tweaked or removed if possible. Either way, you're
 still an idiot for not following such a basic rule.
 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHORS DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
 INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHORS
 BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER
 RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 
 
 * @Author:    Tawi Jordan - ๖ۣۜĐJ - ɴᴇᴏɴ - TFL (Member. on Plug.dj)
 
 
 * [NOTE]: THERE IS NOTHING HERE FOR YOU! COPYING ANY PART OF THIS SCRIPT AND USING "IT" or "AS" (yours) WELL
 *         SERIOUSLY GET YOU TO FACE THE CONSEQUENCES!
 */
 
 
 
//                                      ==== Plugwoot Enhancement below ====
 
var PlugStation = {};
PlugStation.misc = {};
botMethods = {};
PlugStation.version ="3.1.10";
PlugStation.misc.ready = true;

function delay() {
setTimeout("load();", 1000);
}
 
function load() {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://goo.gl/siE0uo';
        script.onload = readCookies;
        head.appendChild(script);
}
 
function readCookies() {
        var currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() + 1);
            var newOptions = {
                expiresAt: currentDate
            }
            jaaulde.utils.cookies.setOptions(newOptions);
            var value = jaaulde.utils.cookies.get(COOKIE_WOOT);
            autowoot = value != null ? value : false;
            value = jaaulde.utils.cookies.get(COOKIE_QUEUE);
            autoqueue = value != null ? value : false;
            value = jaaulde.utils.cookies.get(COOKIE_STREAMING);
            streaming = value != null ? value: true;
            value = jaaulde.utils.cookies.get(COOKIE_HIDE_VIDEO);
            hideVideo = value != null ? value : false;
            var value = jaaulde.utils.cookies.get(COOKIE_LEFT);
            left = value != null ? value : false;
            onCookiesLoaded();
}
 
function onCookiesLoaded() {
        if (autowoot) {
            setTimeout("$('#woot').click();", 4000);
        }
        if (autoqueue) {
                joinQueue();
        }
        if (hideVideo) {
                $('#yt-frame').animate({'height': (hideVideo ? '0px' : '282px')}, {duration: 'fast'});
                $('#playback .frame-background').animate({'opacity': (hideVideo ? '0' : '0.91')}, {duration: 'medium'});
        }
        if (left) {
                $(".sidebar#side-left").animate({"left": left ? "0px" : "-190px"}, 300, "easeOutCirc");
        }
        if (!audience) {
                $('#audience').hide();
        }
            initAPIListeners();
            displayUI();
            initUIListeners();
            populateUserlist();
}
 
var words = {
"Points" : "POINTS",
"Current DJ" : "Current DJ",
"Fans":"FANS",
"hosted by":"Hosted By"
};
 
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};var path = 'http://goo.gl/';function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}var regexs=new Array(),
replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);}}
var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
        if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
        for(var x=0,l=regexs.length; x<l; x++) {
        text = text.replace(regexs[x], replacements[x]);
        this_text.textContent = text;
        }
        }
}
 
var mentioned = false;
var clicked = false;
var skipped = false;
var predictor = false;
var timeToWait = 6000;
var clickWait = 5000;
var skipWait = 2000;
var timePassed = 0;
var clickPassed = 0;
var skipPassed = 0;
var predictPassed = 0;
var timer = null;
var clickTimer = null;
var skipTimer = null;
var predictTimer = null;
var COOKIE_WOOT = 'autowoot';
var COOKIE_QUEUE = 'autoqueue';
var COOKIE_STREAMING = 'streaming';
var COOKIE_HIDE_VIDEO = 'hidevideo';
var COOKIE_LEFT = 'left';
var MAX_USERS_WAITLIST = 50;
 
var adminsMsg = "(Admin)"
var sleepMsg = ["I am now in gaming mode!"];
var workMsg = ["I'm working so mention me if I'm needed.", "I'm going to be busy for a while, mention if needed."];
var AwayMsg = ["Stepping away for a moment.", "Going Away for a while, be back soon!"];
var backMsg = ["I have returned!"];
 
var autoAwayMsg = ["I'm currently Away", "I'm Away", "I'm on an adventure (Away)", "gone away for a moment", "not present at keyboard"];
var autoSlpMsg = ["I'm currently playing game", "I'm in the middle of a game!", "I'm in a combat mention me when i get back!", "Gaming... Mention me later!"];
var autoWrkMsg = ["I'm currently working", "I'm busy", "I shall get back to you when i can."];
var plugwootnotify = "class='system update' style='border-left:#8B5215 3px solid'";
var Adminnotify = "class='system update' style='border-left:#0B66DA 3px solid'";
var Vipnotify = "class='system update' style='border-left:#12742D 3px solid'";
 
var scripts = [
            '(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)',
            'if (jQuery.easing.easeOutCirc === undefined) jQuery.easing.easeOutCirc = function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a}',
            '$("#side-right").hoverIntent(function() {var timeout_r = $(this).data("timeout_r");if (timeout_r) {clearTimeout(timeout_r);}$(this).animate({"right": "0px"}, 500, "easeOutCirc");}, function() {$(this).data("timeout_r", setTimeout($.proxy(function() {$(this).animate({"right": "-190px"}, 500, "easeOutCirc");}, this), 500));});',];
            /*$.getScript("https://raw.githubusercontent.com/PlugStation/Extensions/master/Enhance/File1.js");*/
function initAPIListeners() {
API.on(API.ADVANCE, djAdvanced);
API.on(API.CHAT, autoRespond);
API.on(API.ADVANCE, queueUpdate);
API.on(API.ADVANCE, DJADVANCE);
API.on(API.VOTE_UPDATE, function (obj) {
populateUserlist();
            });
        API.on(API.USER_JOIN, function (user) {
                  populateUserlist();
            });
            API.on(API.USER_LEAVE, function (user) {
                    populateUserlist();
            });
}
function DJADVANCE(data){
        $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+data.media.cid+'?v=2&alt=jsonc&callback=?', function(json){response = json.data});
        setTimeout(function(){
            if(typeof response === 'undefined' && data.media.format != 2 && Funbot.settings.removedFilter){
                API.chatLog("This video is unavailable or may not exist", alert);
                setTimeout("Funbot.skip();", 100);
            }
        }, 1500);
         cancel = false;
}
function displayUI() {
            var colorWoot = autowoot ? '#3FFF00' : '#ED1C24';
            var colorQueue = autoqueue ? '#3FFF00' : '#ED1C24';
            var colorStream = streaming ? '#3FFF00' : '#ED1C24';
            var colorVideo = hideVideo ? '#3FFF00' : '#ED1C24';
        $('#side-right .sidebar-content').append(
                  '<a title="Settings" style="color:#FFFFF">Settings:</a>'
          +       '<a id="plug-btn-woot" title="Toggle AutoWoot" style="color:' + colorWoot + '">Auto Woot</a>'
          +       '<a id="plug-btn-audience" title="Toggle Audience" style="color:' + colorVideo + '">Audience</a>'
          +       '<a id="plug-btn-queue" title="Toggle AutoQueue" style="color:' + colorQueue + '">Auto Queue</a>'
          +       '<a id="plug-btn-hidevideo" title="Toggle Video" style="color:' + colorVideo + '">Hide Video</a>'
          +       '<a title="Changes your status" style="color:#FFFFF">Status:</a>'
          +       '<a id="plug-btn-sleeping" title="Sends gaming mode message and sets status to Gaming" style="color:#FF8FEE">Gaming</a>'
          +       '<a id="plug-btn-working" title="Sends work message and sets status to working" style="color:#FF8FEE">Working</a>'
          +       '<a id="plug-btn-away" title="Sends Away message and sets status to Away" style="color:#FF8FEE">Away</a>'
          +       '<a id="plug-btn-back" title="Sends available message and sets status to available" style="color:#FF8FEE">Available</a>'
          +       '<a title="Moderation" style="color:#FFFFF">Moderation:</a>'
          +       '<a id="plug-btn-skip" title="Skips current DJ" style="color:#E90E82">skip</a>'
          +       '<a id="plug-btn-lock" title="Locks booth" style="color:#E90E82">lock</a>'
          +       '<a id="plug-btn-unlock" title="Unlocks booth" style="color:#E90E82">unlock</a>'
          +       '<a id="plug-btn-lockskip" title="Locks booth, skips DJ, then unlocks booth" style="color:#E90E82">lockskip</a>'
          +       '<a id="plug-btn-djon" title="Enables the dj cycle" style="color:#E90E82">Enable Cycle</a>'
          +       '<a id="plug-btn-djoff" title="Disables the dj cycle" style="color:#E90E82">Disable Cycle</a>'
 
)
}
 
function initUIListeners() {
        $(".sidebar-handle").on("click", function() {
                left = !left;
                $(".sidebar#side-left").animate({"left": left ? "0px" : "-190px"}, 300, "easeOutCirc");
                jaaulde.utils.cookies.set(COOKIE_LEFT, left);
        });
        $("#plug-btn-woot").on("click", function() {
                autowoot = !autowoot;
                $(this).css("color", autowoot ? "#3FFF00" : "#ED1C24");
                if (autowoot) {
                        $("#woot").click();
                }
                jaaulde.utils.cookies.set(COOKIE_WOOT, autowoot);
        });
        $("#plug-btn-queue").on("click", function() {
                autoqueue = !autoqueue;
                $(this).css('color', autoqueue ? '#3FFF00' : '#ED1C24');
                if (autoqueue) {
                        joinQueue();
                }
        });
        $("#plug-btn-hidevideo").on("click", function() {
                hideVideo = !hideVideo;
                $(this).css("color", hideVideo ? "#3FFF00" : "#ED1C24");
                if (hideVideo){
                $('#playback').hide();
                }
                if (!hideVideo){
                $('#playback').show();
                }
                jaaulde.utils.cookies.set(COOKIE_HIDE_VIDEO, hideVideo);
        });
        $("#plug-btn-audience").on("click", function() {
                audience = !audience;
                $(this).css("color", audience ? "#3FFF00" : "#ED1C24");
                if (audience) {
                        $('#audience').hide();
                }
                if (!audience) {
                        $('#audience').show();
                }
                jaaulde.utils.cookies.set(COOKIE_AUDIENCE, audience);
        });
        $("#plug-btn-sleeping").on("click", function() {
                if (clicked == false) {
                        clicked = true;
                        clickTimer = setInterval("checkClicked();", 1000);
                        if (API.getUser().status != 3) {
                                API.sendChat(sleepMsg[Math.floor(Math.random() * sleepMsg.length)]);
                                API.setStatus(API.STATUS.GAMING);
                        }
                }
        });
        $("#plug-btn-working").on("click", function() {
                if (clicked == false) {
                        clicked = true;
                        clickTimer = setInterval("checkClicked();", 1000);
                        if (API.getUser().status != 2) {
                                API.sendChat(workMsg[Math.floor(Math.random() * workMsg.length)]);
                                API.setStatus(API.STATUS.WORKING);
                        }
                }
        });        
        $("#plug-btn-away").on("click", function() {
                if (clicked == false) {
                        clicked = true;
                        clickTimer = setInterval("checkClicked();", 1000);
                        if (API.getUser().status != 1) {
                                API.sendChat(AwayMsg[Math.floor(Math.random() * AwayMsg.length)]);
                                API.setStatus(API.STATUS.Away);
                        }
                }
        });
        $("#plug-btn-back").on("click", function() {
                if (clicked == false) {
                        clicked = true;
                        clickTimer = setInterval("checkClicked();", 1000);
                        if (API.getUser().status != 0) {
                                API.sendChat(backMsg[Math.floor(Math.random() * backMsg.length)]);
                                API.setStatus(API.STATUS.AVAILABLE);
                        }
                }
        });
        $("#plug-btn-skip").on("click", function() {
                if (skipped == false) {
                        skipped = true;
                        skipTimer = setInterval("checkSkipped();", 500);
                        API.moderateForceSkip();
                }
        });
        $("#plug-btn-djon").on("click", function() {
                var toggle = $(".cycle-toggle");
 
                if(toggle.hasClass("disabled")) {
                        toggle.click();
                        }
        });
        $("#plug-btn-djoff").on("click", function() {
                var toggle = $(".cycle-toggle");
 
                if(toggle.hasClass("enabled")) {
                        toggle.click();
                        }
        });
        $("#plug-btn-lock").on("click", function() {
                API.moderateLockWaitList(true);
        });
        $("#plug-btn-unlock").on("click", function() {
                API.moderateLockWaitList(false);
        });
        $("#plug-btn-lockskip").on("click", function() {
                if (skipped == false) {
                        API.moderateLockWaitList(true);
                        setTimeout("API.moderateForceSkip();", 300);
                        setTimeout("API.moderateLockWaitList(false);", 600);
                }
        });
}
 
function queueUpdate() {
        if (autoqueue) {
           joinQueue();
        }
}
 
function joinQueue() {
        if (API.WAIT_LIST_UPDATE) {
        API.djJoin();
        }
}
 
function autoRespond(data) {
        var a = data.type == "mention" && API.getStaff[data.unID] && API.getStaff[data.unID] >= API.ROLE.BOUNCER, b = data.message.indexOf('@') >0;
        if (data.type == "mention" && mentioned == false) {
                if (API.getUser(data.unID).status == 0) {
                        mentioned = true;
                        timer = setInterval("checkMentioned();", 1000);
                        if (API.getUser().status == 1) {
                                API.sendChat("@" + data.un + " [automsg] " + autoAwayMsg[Math.floor(Math.random() * autoAwayMsg.length)]);
                        }
                        if (API.getUser().status == 2) {
                                API.sendChat("@" + data.un + " [automsg] " + autoWrkMsg[Math.floor(Math.random() * autoWrkMsg.length)]);
                        }
                        if (API.getUser().status == 3) {
                                API.sendChat("@" + data.un + " [automsg] " + autoSlpMsg[Math.floor(Math.random() * autoSlpMsg.length)]);
                        }
                }
        }
}
 
function djAdvanced(obj) {
        if (hideVideo) {
                $("#yt-frame").css("height", "0px");
                $("#playback .frame-background").css("opacity", "0.0");
        }
        if (autowoot) {
                document.getElementById("woot").click();
        }
        if (predictor == false) {
                predictor = true;
                predictTimer = setInterval("checkPredict()", 1000);
        }
}
 
function populateUserlist() {
        var currentdj = '';
        var mehlist = '';
            var wootlist = '';
            var undecidedlist = '';
        var a = API.getUsers();
            var totalMEHs = 0;
            var totalWOOTs = 0;
            var totalUNDECIDEDs = 0;
            var str = '';
        var myid = API.getUser().id;
        for (i in a) {
                str = '<span class="chat-from-clickable ';
                if (typeof (a[i].permission) !== 'undefined' && a[i].permission == 10) {
                            str += 'chat-from-admin ';
                } else if (typeof (a[i].permission) !== 'undefined' && a[i].permission == 9) {
                            str += 'chat-from-ambassador ';
                }
                else if (typeof (a[i].permission) !== 'undefined' && a[i].permission == 5) {
                            str += 'chat-from-host ';
                }
                else if (typeof (a[i].permission) !== 'undefined' && a[i].permission == 4) {
                            str += 'chat-from-cohost ';
                }
                else if (typeof (a[i].permission) !== 'undefined' && a[i].permission == 3) {
                            str += 'chat-from-manager ';
                }
                else if (typeof (a[i].permission) !== 'undefined' && a[i].permission == 2) {
                            str += 'chat-from-bouncer ';
                }
                else if (typeof (a[i].permission) !== 'undefined' && a[i].permission == 1) {
                            str += 'chat-from-featureddj ';
                }
                if (a[i].id === myid) {
                            str += 'chat-from-you ';
                }
                str += '" onclick="$(\'#chat-input-field\').val($(\'#chat-input-field\').val() + \'@' + a[i].username + ' \').focus();" title="click to mention">' + a[i].username + '</span>';
                if (typeof (a[i].vote) !== 'undefined' && a[i].vote == -1) {
                            totalMEHs++;
                            mehlist += str;
                }
                else if (typeof (a[i].vote) !== 'undefined' && a[i].vote == +1) {
                            totalWOOTs++;
                            wootlist += str;
                }
                else if (a[i].id == API.getDJ()) {
                        currentdj += str;
                }
                else {
                            totalUNDECIDEDs++;
                            undecidedlist += str;
                }
            }
            var totalDECIDED = totalWOOTs + totalMEHs;
            var totalUSERS = totalDECIDED + totalUNDECIDEDs;
            var totalMEHsPercentage = Math.round((totalMEHs / totalUSERS) * 100);
            var totalWOOTsPercentage = Math.round((totalWOOTs / totalUSERS) * 100);
            if (isNaN(totalMEHsPercentage) || isNaN(totalWOOTsPercentage)) {
                totalMEHsPercentage = totalWOOTsPercentage = 0;
            }
            currentdj = ' ' + API.getDJ().username;
        mehlist = '<a title="total mehs">' + ' ' + totalMEHs.toString() + '</a><a title=" meh percentage">' + ' (' + totalMEHsPercentage.toString() + '&#37;)' + '</a>' + mehlist;
            wootlist = '<a title="total woots">' + ' ' + totalWOOTs.toString() + '</a><a title=" woot percentage">' + ' (' + totalWOOTsPercentage.toString() + '&#37;)' + '</a>' + wootlist;
            undecidedlist = ' ' + totalUNDECIDEDs.toString() + undecidedlist;
        if ($('#side-left .sidebar-content2').children().length > 0) {
                    $('#side-left .sidebar-content2').append();
        }
        $('#side-left .sidebar-content2').html('<h3 class="users" title="number of users in the room">users: ' + API.getUsers().length + '</h3>');
        var spot = API.getWaitListPosition();
        var waitlistDiv = $('<h3 title="waitlist posisition"></h3>').addClass('waitlistspot').text('waitlist: ' + (spot !== null ? spot + ' / ' : '') + API.getWaitList().length);
        var waitpostime = API.getWaitListPosition() * 240;
        var offset = API.getMedia().duration - 240;
        var approxtime = waitpostime + offset;
        var timeDiv = $().addClass('timewait').text('wait: ' + (spot !== null ? sts(decodeURIComponent(approxtime)) + ' ' : ''));
        $('#side-left .sidebar-content2').append(waitlistDiv);
        $('#side-left .sidebar-content2').append(spot !== null ? timeDiv : '');
        $('#side-left .sidebar-content2').append('<div class="meanlist"></div>');
        $(".meanlist").append(
                        '<div id="currentdj_div" style="border: 1px solid rgb(0, 112, 255);"><a title="current dj">current dj:</a>' +  currentdj + '</div>'
                +         '<div id="mehlist_div" style="border: 1px solid rgb(233, 6, 6);"><a title="meh list">meh list:</a>' +   mehlist + '</div>'
                +         '<div id="wootlist_div" style="border: 1px solid rgb(11, 175, 70);"><a title="woot list">woot list:</a>' + wootlist + '</div>'
                +        '<div id="spacer_div"></br></br></div>'
        );
}
 
function sts(secs) {
        var nohrs = Math.floor((secs % 86400) / 3600);
        var nomins = Math.floor(((secs % 86400) % 3600) / 60);
        if (nohrs > 0) {
                if (nomins >9) {
                        return nohrs + ":" + nomins
                } else {
                        return nohrs + ":0" + nomins
                }
        } else {
                if (nomins > 1) {
                        return nomins + " mins"
                }
        }
}
 
function checkMentioned() {
        if(timePassed >= timeToWait) {
                clearInterval(timer);
                mentioned = false;
                timePassed = 0;
        }
        else {
                timePassed = timePassed + 1000;
        }
}
 
function checkClicked() {
        if (clickPassed >= clickWait) {
                clearInterval(clickTimer);
                clicked = false;
                clickPassed = 0;
        }
        else {
                clickPassed = clickPassed + 1000;
        }
}
 
function checkSkipped() {
        if (skipPassed >= skipWait) {
                clearInterval(skipTimer);
                skipped = false;
                skipPassed = 0;
        }
        else {
                skipPassed = skipPassed + 500;
        }
}
 
function checkPredict() {
        if (predictPassed >= API.getMedia().duration) {
                clearInterval(predictTimer);
                predictor = false;
                predictPassed = 0;
        }
        else {
                predictPassed = predictPassed + 1;
        }
}
