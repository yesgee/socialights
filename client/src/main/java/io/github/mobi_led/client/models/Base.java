package io.github.mobi_led.client.models;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class Base implements Serializable {

    private String id;
    private Date createdAt;
    private Date updatedAt;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String toString() {
        return getClass().getName() + "@" + this.id;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public boolean equals(Object object) {
        if (object instanceof Base && ((Base) object).getId().equals(this.id)) {
            return true;
        } else {
            return false;
        }
    }

    public JSONObject toJSON() throws JSONException {
        return new JSONObject();
    }

    public JSONObject toJSON(boolean sparse) throws JSONException {
        if (sparse) {
            return (new JSONObject()).put("id", this.id);
        } else {
            return this.toJSON();
        }
    }

    public void updateFromJSON(JSONObject object) throws JSONException {

        if (object.has("id")) {
            this.id = object.getString("id");
        } else if (object.has("_id")) {
            this.id = object.getString("_id");
        }

        if (object.has("createdAt")) {
            try {
                this.createdAt = Base.parseDate(object.getString("createdAt"));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        if (object.has("updatedAt")) {
            try {
                this.updatedAt = Base.parseDate(object.getString("updatedAt"));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
    }

    public static Base fromJSON(JSONObject object) throws JSONException {
        Base model = new Base();
        model.updateFromJSON(object);
        return model;
    }

    public static Base fromJSON(String id) {
        Base model = new Base();
        model.setId(id);
        return model;
    }

    public static Date parseDate( String input ) throws ParseException
    {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.UK);

        // This is zero time so we need to add that TZ indicator for
        if ( input.endsWith( "Z" ) ) {
            input = input.substring( 0, input.length() - 1) + "GMT-00:00";
        } else {
            throw new ParseException("Zero Time indicator invalid", input.length() - 1);
        }

        return sdf.parse( input );
    }

    public static String printDate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.UK);
        return sdf.format(date);
    }

}
