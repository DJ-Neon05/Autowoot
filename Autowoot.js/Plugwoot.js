/*
 * TERMS OF REPRODUCTION USE
 *
 * Failure to follow these terms will result in me getting very angry at you
 * and having your software tweaked or removed if possible. Either way, you're
 * still an idiot for not following such a basic rule.
 * NO EVENT SHALL THE AUTHORS
 * BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */
 
/*
 * NOTE:  DO NOT CHANGE ANYTHING ON THIS SCRIPT OR THE AUTHOR!
 * 
 * CONTACT THE AUTHOR BEFORE EDITING ANYTHING ON THIS SCRIPT ANYTHING THAT ARE AND WILL BE CHANGED BY A DIFFERENT AUTHOR
 * WILL FACE THE CONSEQUENCES!
 *
 * @Author         Tawi Jordan - ๖ۣۜĐJ - ɴᴇᴏɴ - TFL (Member. on Plug.dj)
 *
 */
 
 
var path = 'http://pastebin.com/raw.php?i=';
 
 
function message(contents) {
        var msg = '<div class="message"><i class="icon icon-chat-admin"></i><span class="from admin ">๖ۣۜĐل - ɴᴇᴏɴ - TFL </span><span class="text">&nbsp;' + contents + '</span></div>';
        $('#chat-messages').append(msg);
}
 
var scriptFail = window.setTimeout(function() {
    message('Oops! An Error Occurred');
  }, 2000);

 
$.getScript(path + 'rM15aY1b' , function() {API.chatLog("PlugWoot V."+ pw.version+" is now available!",true);
  window.clearTimeout(scriptFail);
});
