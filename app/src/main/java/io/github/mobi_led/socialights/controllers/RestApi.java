package io.github.mobi_led.socialights.controllers;

import com.loopj.android.http.*;

public class RestApi {

    private static final String BASE_URL = "http://hylkevisser.nl:8080/api/";

    private static AsyncHttpClient client = new AsyncHttpClient();

    public static void get(String url, RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.get(getAbsoluteUrl(url), params, responseHandler);
    }

    public static void post(String url, RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.post(getAbsoluteUrl(url), params, responseHandler);
    }

    public static void put(String url, RequestParams params, AsyncHttpResponseHandler responseHandler){
        client.put(getAbsoluteUrl(url), params, responseHandler);
    }

    private static String getAbsoluteUrl(String relativeUrl) {
        return BASE_URL + relativeUrl;
    }
}
