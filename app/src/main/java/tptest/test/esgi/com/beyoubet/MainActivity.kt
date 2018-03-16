package tptest.test.esgi.com.beyoubet

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity() {

//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
//    }
    var mywebview: WebView? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        mywebview = findViewById<WebView>(R.id.webview)
        mywebview!!.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                view?.loadUrl(url)
                return true
            }

            override fun onReceivedError(view: WebView, errorCode: Int, description: String, failingUrl: String) {
                Log.i("WEB_VIEW_TEST", "error code:" + errorCode)
                super.onReceivedError(view, errorCode, description, failingUrl)
            }
        }
        mywebview!!.loadUrl("http://www.matchendirect.fr/rss/foot-ligue-1-c16.xml")
//        mywebview!!.loadUrl("http://www.foot-national.com/match-foot-marseille-bastia-205886.html")
//        mywebview!!.loadUrl("https://www.facebook.com/")
    }
}
