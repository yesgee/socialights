package io.github.mobi_led.client;

import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Scanner;

import rx.Observable;
import rx.android.schedulers.AndroidSchedulers;
import rx.functions.Action1;
import rx.functions.Func1;
import rx.schedulers.Schedulers;
import rx.subjects.AsyncSubject;
import rx.subjects.PublishSubject;

public class Connection implements Runnable {

    private PublishSubject<JSONObject> rawData;

    private Socket connection;

    private int messageCount = 0;

    private HashMap<Integer, Request> activeRequests = new HashMap();
    private LinkedList<Request> sendQueue = new LinkedList();

    private String host;

    private PrintWriter out;
    private BufferedInputStream buf;
    private Scanner in;

    public Connection(String host) {
        this.host = host;
        this.rawData = PublishSubject.create();
        this.processResponses();
    }

    public void connect() throws IOException {
        Log.i("Connection", "connect() — Connecting");
        this.connection = new Socket(this.host, 5000);
        this.messageCount = this.sendQueue.size();
        this.out = new PrintWriter(this.connection.getOutputStream(), true);
        this.buf = new BufferedInputStream(this.connection.getInputStream());
        this.in = new Scanner(buf);
    }

    public void disconnect() throws IOException {
        Log.i("Connection", "disconnect() — Disconnecting");
        if (this.connection.isConnected()) {
            if (this.out != null)
                this.out.println("exit");
            if (this.connection != null)
                this.connection.close();
        }
    }

    private void send(String message) {
        this.out.println(message);
    }

    public Observable<JSONObject> call(String message) {
        this.messageCount++;
        Request request = new Request(message, this.messageCount);
        this.activeRequests.put(this.messageCount, request);
        this.sendQueue.add(request);
        Log.d("Connection", "Added Request " + this.messageCount + " to the queue.");
        return request.getObservable();
    }

    public Observable<JSONObject> detailsView() {
        return this.call("detailsView");
    }

    public Observable<JSONObject> documentation() {
        return this.call("documentation");
    }

    public Observable<JSONObject> paramAdd(String key, String value) {
        return this.call("paramAdd " + key + "=" + value);
    }

    public Observable<JSONObject> paramDelete(String key) {
        return this.call("paramDelete " + key);
    }

    public Observable<JSONObject> paramsDelete() {
        return this.call("paramsDelete");
    }

    public Observable<JSONObject> paramView(String key) {
        return this.call("paramView " + key);
    }

    public Observable<JSONObject> paramsView() {
        return this.call("paramsView");
    }

    public Observable<JSONObject> roomView(String room) {
        return this.call("roomView " + room);
    }

    public Observable<JSONObject> roomAdd(String room) {
        return this.call("roomAdd " + room);
    }

    public Observable<JSONObject> roomLeave(String room) {
        return this.call("roomLeave " + room);
    }

    public Observable<JSONObject> say(String room, String message) {
        return this.call("say " + room + " " + message);
    }

    public Observable<JSONObject> action(String action) {
        return this.call(action);
    }

    public Observable<JSONObject> action(String action, JSONObject params) {
        JSONObject object = new JSONObject();
        try {
            object.put("action", action);
            object.put("params", params);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return this.call(object.toString());
    }

    public Observable<JSONObject> context(final String context) {
        return this.rawData
                .subscribeOn(Schedulers.newThread())
                .observeOn(AndroidSchedulers.mainThread())
                .filter(new Func1<JSONObject, Boolean>() {
                    @Override
                    public Boolean call(JSONObject item) {
                        try {
                            return item.has("context") && item.getString("context").equals(context);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        return false;
                    }
                });
    }

    public Observable<JSONObject> room(final String room) {
        return this.context("user").filter(new Func1<JSONObject, Boolean>() {
            @Override
            public Boolean call(JSONObject item) {
                try {
                    return item.has("room") && item.getString("room").equals(room);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                return false;
            }
        });
    }

    private void processResponses() {
        this.context("response").subscribe(new Action1<JSONObject>() {
            public void call(JSONObject data) {
                if (data.has("messageCount")) {
                    Integer messageId;
                    try {
                        messageId = data.getInt("messageCount");
                        Log.d("Connection", "processResponses() - Received response for " + messageId.toString());
                        Request request = activeRequests.remove(messageId);
                        if (request != null) {
                            request.resolve(data);
                        }
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
    }

    public void run() {
        try {
            this.connect();

            String inLine;
            String outLine;
            Request request;

            while (!Thread.currentThread().isInterrupted() && this.connection.isConnected()) {

                if (this.buf.available() > 0) {
                    if (in.hasNextLine()) {
                        inLine = in.nextLine();
                        if (inLine != null) {
                            try {
                                Log.v("Connection", "run() - Received line " + inLine);
                                JSONObject object = new JSONObject(inLine);
                                this.rawData.onNext(object);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }

                request = sendQueue.poll();
                if (request != null) {
                    Log.v("Connection", "processing out");

                    outLine = request.getMessage();
                    this.out.println(outLine);
                    Log.v("Connection", "run() - Sent line " + outLine);
                }
            }

            Log.d("Connection", "run() - Interrupted.");

            this.disconnect();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                this.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    class Request {
        private int id;
        private String message;
        private AsyncSubject<JSONObject> observable;

        public int getId() {
            return this.id;
        }

        public String getMessage() {
            return this.message;
        }

        public Observable<JSONObject> getObservable() {
            return this.observable
                    .subscribeOn(Schedulers.newThread())
                    .observeOn(AndroidSchedulers.mainThread());
        }

        public Request(String message, int id) {
            this.message = message;
            this.id = id;
            this.observable = AsyncSubject.create();
        }

        public String toString() {
            return "<Request:" + this.id + ">";
        }

        public void resolve(JSONObject response) {
            if (response.has("error")) {
                String err = response.optString("error", "Unknown Server Error");
                Log.w("Request", "resolve() - " + this.toString() + " error: " + err);
                Exception exception = new Exception(err);
                this.observable.onError(exception);
            } else {
                Log.i("Request", "resolve() - " + this.toString() + " Completed");
                this.observable.onNext(response);
            }
            this.observable.onCompleted();
        }
    }

}
