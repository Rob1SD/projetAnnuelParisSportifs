package tptest.test.esgi.com.beyoubet

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.EditText
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*
import org.json.JSONObject
import java.net.URL

class MainActivity : AppCompatActivity() {

//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
//    }
    val urlTxt = "http://c48d3312.ngrok.io/match"
//    var matchList: EditText? = null
   /* override fun onCreate(savedInstanceState: Bundle?) {
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


//        Log.i("RESULTAT REQU", testurl);
        mywebview!!.loadUrl(urlTxt)
        Thread({
            val testurl = URL( urlTxt).readText()

            runOnUiThread({
                Toast.makeText(this, testurl, Toast.LENGTH_SHORT).show()
            })
        }).start()

    }*/
        override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

       Thread({
           val textURL = URL( urlTxt).readText()

           runOnUiThread({
               var resultText = "";
               val jsonObj = JSONObject(textURL)
               val jsonSize = jsonObj["length"].toString().toInt() - 1;
               for (i in 0 .. jsonSize)
               {
                   var cur=JSONObject(jsonObj["child"+i].toString())
                   var date=cur["date"].toString()
                   var match=cur["match"].toString()
                   var score=cur["score"].toString()
                   resultText+=date + " " + match + " " +score + "\n"
               }
               var matchList = findViewById<EditText>(R.id.matchList) as? EditText
               matchList!!.setText(resultText);
           })
       }).start()

        setContentView(R.layout.activity_main)
    }
}
