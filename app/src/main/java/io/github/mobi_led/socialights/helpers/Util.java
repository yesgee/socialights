package io.github.mobi_led.socialights.helpers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Util {

  public static Date getDateTime(String date){

      SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");

      try {

        return format.parse(date);

      } catch (ParseException e) {
          e.printStackTrace();
      }

      return null;
  }
}
